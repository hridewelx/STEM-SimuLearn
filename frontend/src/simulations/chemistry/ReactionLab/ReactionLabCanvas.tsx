import { useEffect, useRef, useState, useCallback } from 'react';
import { ReactionParticle, ReactionLabParams, ReactionLabAnalyticsData } from './types';
import { ReactionLabEngine } from './reactionLabDatabase';

interface ReactionLabCanvasProps {
  params: ReactionLabParams;
  isRunning: boolean;
  onAnalyticsUpdate: (data: ReactionLabAnalyticsData) => void;
}

const ReactionLabCanvas = ({ params, isRunning, onAnalyticsUpdate }: ReactionLabCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<ReactionParticle[]>([]);
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const reactionCountRef = useRef<number>(0);
  const startTimeRef = useRef<number>(Date.now());

  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 500 });

  // Responsive canvas sizing
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.clientWidth - 32;
        const aspectRatio = 16 / 10;
        const maxHeight = Math.min(window.innerHeight * 0.6, 550);
        const width = Math.max(300, Math.min(containerWidth, 1200));
        const height = Math.max(200, Math.min(width / aspectRatio, maxHeight));
        
        setCanvasSize({ 
          width: Math.floor(width), 
          height: Math.floor(height) 
        });
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    const resizeObserver = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      resizeObserver.disconnect();
    };
  }, []);

  // Create particle with 360° Brownian motion
  const createParticle = useCallback((
    id: number,
    chemical: string,
    isProduct: boolean,
    mass: number
  ): ReactionParticle => {
    const margin = 30;
    const x = margin + Math.random() * (canvasSize.width - margin * 2);
    const y = margin + Math.random() * (canvasSize.height - margin * 2);

    const angle = Math.random() * Math.PI * 2;
    const baseSpeed = (params.temperature / 50) * 2;
    const speedVariation = 0.5 + Math.random() * 1.0;
    const speed = baseSpeed * speedVariation;

    return {
      id,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: ReactionLabEngine.getRadiusForChemical(chemical),
      chemical,
      color: ReactionLabEngine.getColorForChemical(chemical),
      category: 'reactant',
      reacted: false,
      label: chemical,
      isProduct,
      mass,
    };
  }, [params.temperature, canvasSize]);

  const getReactants = useCallback((): [string, string] => {
    switch (params.reactionType) {
      case 'composition':
        return [params.elementA || '', params.elementB || ''];
      case 'decomposition':
        return [params.compound || '', ''];
      case 'acidBase':
        return [params.acid || '', params.base || ''];
      case 'singleReplacement':
        return [params.element || '', params.compoundForReplacement || ''];
      default:
        return ['', ''];
    }
  }, [params]);

  const getReactionData = useCallback(() => {
    const [reactant1, reactant2] = getReactants();
    if (params.reactionType === 'decomposition') {
      return ReactionLabEngine.getReaction(params.reactionType, reactant1);
    }
    return ReactionLabEngine.getReaction(params.reactionType, reactant1, reactant2);
  }, [params.reactionType, getReactants]);

  // Initialize particles
  useEffect(() => {
    const initializeParticles = () => {
      const particles: ReactionParticle[] = [];
      let id = 0;

      const reaction = getReactionData();
      if (!reaction.valid) {
        particlesRef.current = [];
        return;
      }

      const [reactant1, reactant2] = getReactants();

      if (params.reactionType === 'decomposition') {
        // Mass-based particle count for decomposition
        const molarMass = ReactionLabEngine.getMolarMass(reactant1);
        const moles = params.reactant1Amount / molarMass;
        const count = Math.min(50, Math.max(5, Math.floor(moles * 10)));
        
        for (let i = 0; i < count; i++) {
          particles.push(createParticle(id++, reactant1, false, params.reactant1Amount / count));
        }
      } else {
        // Calculate particle counts based on mass
        const molarMass1 = ReactionLabEngine.getMolarMass(reactant1);
        const molarMass2 = ReactionLabEngine.getMolarMass(reactant2);
        
        const moles1 = params.reactant1Amount / molarMass1;
        const moles2 = params.reactant2Amount / molarMass2;
        
        const count1 = Math.min(30, Math.max(3, Math.floor(moles1 * 8)));
        const count2 = Math.min(30, Math.max(3, Math.floor(moles2 * 8)));

        for (let i = 0; i < count1; i++) {
          particles.push(createParticle(id++, reactant1, false, params.reactant1Amount / count1));
        }
        for (let i = 0; i < count2; i++) {
          particles.push(createParticle(id++, reactant2, false, params.reactant2Amount / count2));
        }
      }

      particlesRef.current = particles;
    };

    initializeParticles();
    reactionCountRef.current = 0;
    startTimeRef.current = Date.now();
  }, [params, canvasSize, createParticle, getReactants, getReactionData]);

  // Handle particle-particle elastic collisions (friction/bounce when touching)
  const handleParticleCollisions = useCallback((particles: ReactionParticle[]) => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];

        // Skip if either particle is reacted (but not a product)
        if ((p1.reacted && !p1.isProduct) || (p2.reacted && !p2.isProduct)) continue;

        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Check collision - particles touching
        if (distance < p1.radius + p2.radius && distance > 0) {
          // Elastic collision response (conservation of momentum)
          const angle = Math.atan2(dy, dx);
          const sin = Math.sin(angle);
          const cos = Math.cos(angle);

          // Rotate velocities to collision axis
          const v1x = p1.vx * cos + p1.vy * sin;
          const v1y = p1.vy * cos - p1.vx * sin;
          const v2x = p2.vx * cos + p2.vy * sin;
          const v2y = p2.vy * cos - p2.vx * sin;

          // Conservation of momentum (1D collision along contact normal)
          const m1 = p1.mass || 1;
          const m2 = p2.mass || 1;
          const totalMass = m1 + m2;
          const newV1x = ((m1 - m2) * v1x + 2 * m2 * v2x) / totalMass;
          const newV2x = ((m2 - m1) * v2x + 2 * m1 * v1x) / totalMass;

          // Rotate back to original coordinate system
          p1.vx = newV1x * cos - v1y * sin;
          p1.vy = v1y * cos + newV1x * sin;
          p2.vx = newV2x * cos - v2y * sin;
          p2.vy = v2y * cos + newV2x * sin;

          // Separate particles to prevent overlap (push apart)
          const overlap = p1.radius + p2.radius - distance;
          const separationX = (overlap / 2 + 0.5) * cos;
          const separationY = (overlap / 2 + 0.5) * sin;

          p1.x -= separationX;
          p1.y -= separationY;
          p2.x += separationX;
          p2.y += separationY;
        }
      }
    }
  }, []);

  // Update particles with Brownian motion
  const updateParticles = useCallback((dt: number) => {
    const particles = particlesRef.current;
    const reaction = getReactionData();

    if (!reaction.valid) return;

    particles.forEach((p) => {
      if (!p.reacted || p.isProduct) {
        // Brownian motion
        const brownianForce = 0.3;
        p.vx += (Math.random() - 0.5) * brownianForce;
        p.vy += (Math.random() - 0.5) * brownianForce;

        // Speed limit based on temperature
        const maxSpeed = (params.temperature / 25) * 3;
        const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (currentSpeed > maxSpeed) {
          p.vx = (p.vx / currentSpeed) * maxSpeed;
          p.vy = (p.vy / currentSpeed) * maxSpeed;
        }

        // Update position
        p.x += p.vx * dt * 60;
        p.y += p.vy * dt * 60;

        // Boundary collision
        if (p.x - p.radius < 0) {
          p.vx = Math.abs(p.vx) * (0.8 + Math.random() * 0.2);
          p.x = p.radius;
        } else if (p.x + p.radius > canvasSize.width) {
          p.vx = -Math.abs(p.vx) * (0.8 + Math.random() * 0.2);
          p.x = canvasSize.width - p.radius;
        }

        if (p.y - p.radius < 0) {
          p.vy = Math.abs(p.vy) * (0.8 + Math.random() * 0.2);
          p.y = p.radius;
        } else if (p.y + p.radius > canvasSize.height) {
          p.vy = -Math.abs(p.vy) * (0.8 + Math.random() * 0.2);
          p.y = canvasSize.height - p.radius;
        }
      }
    });

    // Handle particle-particle collisions (friction/elastic bounce)
    handleParticleCollisions(particles);

    // Handle chemical reactions
    handleReactions(particles, reaction);
  }, [canvasSize, params.temperature, getReactionData, handleParticleCollisions]);

  const handleReactions = (
    particles: ReactionParticle[],
    reaction: { valid: boolean; products: string[]; coefficients: { reactants: number[]; products: number[] } }
  ) => {
    if (!reaction.valid || !reaction.products.length) return;

    const [reactant1, reactant2] = getReactants();

    if (params.reactionType === 'decomposition') {
      // Decomposition: single particle breaks into products
      particles.forEach((p) => {
        if (!p.reacted && !p.isProduct && Math.random() < 0.003 * (params.temperature / 100)) {
          p.reacted = true;
          reactionCountRef.current++;

          // Create product particles
          reaction.products.forEach((product, idx) => {
            const newParticle: ReactionParticle = {
              id: Date.now() + Math.random() * 1000 + idx,
              x: p.x + (Math.random() - 0.5) * 20,
              y: p.y + (Math.random() - 0.5) * 20,
              vx: (Math.random() - 0.5) * 4,
              vy: (Math.random() - 0.5) * 4,
              radius: ReactionLabEngine.getRadiusForChemical(product),
              chemical: product,
              color: ReactionLabEngine.getColorForChemical(product),
              category: 'product',
              reacted: false,
              label: product,
              isProduct: true,
              mass: p.mass / reaction.products.length,
            };
            particles.push(newParticle);
          });
        }
      });
    } else {
      // Binary reactions: two particles collide to form products
      const unreacted1 = particles.filter(p => p.chemical === reactant1 && !p.reacted && !p.isProduct);
      const unreacted2 = particles.filter(p => p.chemical === reactant2 && !p.reacted && !p.isProduct);

      for (const p1 of unreacted1) {
        for (const p2 of unreacted2) {
          if (p1.reacted || p2.reacted) continue;

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < p1.radius + p2.radius + 5) {
            // Collision detected - chance of reaction based on temperature
            if (Math.random() < 0.1 * (params.temperature / 100)) {
              p1.reacted = true;
              p2.reacted = true;
              reactionCountRef.current++;

              // Create product particles
              const midX = (p1.x + p2.x) / 2;
              const midY = (p1.y + p2.y) / 2;

              reaction.products.forEach((product, idx) => {
                const angle = (Math.PI * 2 * idx) / reaction.products.length;
                const newParticle: ReactionParticle = {
                  id: Date.now() + Math.random() * 1000 + idx,
                  x: midX + Math.cos(angle) * 15,
                  y: midY + Math.sin(angle) * 15,
                  vx: Math.cos(angle) * 2,
                  vy: Math.sin(angle) * 2,
                  radius: ReactionLabEngine.getRadiusForChemical(product),
                  chemical: product,
                  color: ReactionLabEngine.getColorForChemical(product),
                  category: 'product',
                  reacted: false,
                  label: product,
                  isProduct: true,
                  mass: (p1.mass + p2.mass) / reaction.products.length,
                };
                particles.push(newParticle);
              });
            }
          }
        }
      }
    }

    // Remove reacted particles
    particlesRef.current = particles.filter(p => !p.reacted || p.isProduct);
  };

  // Draw particles
  const drawParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    const particles = particlesRef.current;

    particles.forEach((p) => {
      ctx.save();

      // Glow effect for products
      if (p.isProduct) {
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 15;
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      
      // Gradient fill
      const gradient = ctx.createRadialGradient(
        p.x - p.radius * 0.3, p.y - p.radius * 0.3, 0,
        p.x, p.y, p.radius
      );
      gradient.addColorStop(0, lightenColor(p.color, 30));
      gradient.addColorStop(0.7, p.color);
      gradient.addColorStop(1, darkenColor(p.color, 20));
      
      ctx.fillStyle = gradient;
      ctx.fill();

      // Border
      ctx.strokeStyle = darkenColor(p.color, 30);
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label
      ctx.fillStyle = getContrastColor(p.color);
      ctx.font = `bold ${Math.max(8, p.radius * 0.6)}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.label, p.x, p.y);

      ctx.restore();
    });
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = (timestamp: number) => {
      const dt = lastTimeRef.current ? (timestamp - lastTimeRef.current) / 1000 : 0.016;
      lastTimeRef.current = timestamp;

      // Clear canvas with gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, canvasSize.width, canvasSize.height);
      bgGradient.addColorStop(0, '#1a1a2e');
      bgGradient.addColorStop(0.5, '#16213e');
      bgGradient.addColorStop(1, '#0f3460');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

      // Draw subtle container visualization (reaction vessel)
      ctx.save();
      const margin = 8;
      const cornerRadius = 12;
      
      // Subtle glow effect for container
      ctx.shadowColor = 'rgba(100, 149, 237, 0.2)';
      ctx.shadowBlur = 15;
      ctx.strokeStyle = 'rgba(100, 149, 237, 0.15)';
      ctx.lineWidth = 2;
      
      // Draw rounded rectangle
      ctx.beginPath();
      ctx.roundRect(margin, margin, canvasSize.width - margin * 2, canvasSize.height - margin * 2, cornerRadius);
      ctx.stroke();
      ctx.restore();

      // Update particles if running
      if (isRunning) {
        updateParticles(dt);
      }

      // Draw particles
      drawParticles(ctx);

      // Update analytics
      const reaction = getReactionData();
      const particles = particlesRef.current;
      const totalParticles = particles.length;
      const productsCount = particles.filter(p => p.isProduct).length;
      const reactantsCount = totalParticles - productsCount;
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const reactionRate = elapsed > 0 ? reactionCountRef.current / elapsed : 0;

      // Calculate progress based on reactants consumed
      const initialReactants = params.reactionType === 'decomposition' 
        ? Math.min(50, Math.max(5, Math.floor((params.reactant1Amount / ReactionLabEngine.getMolarMass(params.compound || '')) * 10)))
        : Math.min(30, Math.max(3, Math.floor((params.reactant1Amount / ReactionLabEngine.getMolarMass(getReactants()[0])) * 8))) +
          Math.min(30, Math.max(3, Math.floor((params.reactant2Amount / ReactionLabEngine.getMolarMass(getReactants()[1])) * 8)));
      
      const progress = initialReactants > 0 ? ((initialReactants - reactantsCount) / initialReactants) * 100 : 0;

      // Calculate limiting reagent for binary reactions
      let limitingReagent = '';
      let excessReagent = '';
      let theoreticalYield = 0;

      if (params.reactionType !== 'decomposition' && reaction.valid) {
        const [r1, r2] = getReactants();
        const result = ReactionLabEngine.calculateLimitingReagent(
          r1, params.reactant1Amount,
          r2, params.reactant2Amount,
          reaction.coefficients
        );
        limitingReagent = result.limiting;
        excessReagent = result.excess;
        
        // Calculate theoretical yield
        const limitingMolarMass = ReactionLabEngine.getMolarMass(limitingReagent);
        const limitingMoles = (limitingReagent === r1 ? params.reactant1Amount : params.reactant2Amount) / limitingMolarMass;
        if (reaction.products.length > 0) {
          const productMolarMass = ReactionLabEngine.getMolarMass(reaction.products[0]);
          theoreticalYield = limitingMoles * productMolarMass * (reaction.coefficients.products[0] / reaction.coefficients.reactants[limitingReagent === r1 ? 0 : 1]);
        }
      }

      onAnalyticsUpdate({
        progressPercentage: Math.min(100, progress),
        reactionRate,
        productsFormed: productsCount,
        totalParticles,
        balancedEquation: reaction.valid ? reaction.equation : 'Select reactants to begin',
        energyChange: reaction.energyChange || 'neutral',
        stoichiometricRatio: reaction.stoichiometricRatio || '0:0',
        limitingReagent,
        excessReagent,
        theoreticalYield,
        actualYield: productsCount * (theoreticalYield / Math.max(1, initialReactants)),
        percentYield: theoreticalYield > 0 ? (productsCount * (theoreticalYield / Math.max(1, initialReactants)) / theoreticalYield) * 100 : 0,
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning, canvasSize, updateParticles, drawParticles, getReactionData, getReactants, params, onAnalyticsUpdate]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="w-full h-full rounded-xl"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
      />
      
      {/* Legend - positioned at bottom of canvas */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-wrap gap-3 justify-center bg-gray-800/70 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-gray-700">
        {(() => {
          const [r1, r2] = getReactants();
          const reaction = getReactionData();
          const items: { label: string; color: string }[] = [];
          
          if (r1) items.push({ label: r1, color: ReactionLabEngine.getColorForChemical(r1) });
          if (r2) items.push({ label: r2, color: ReactionLabEngine.getColorForChemical(r2) });
          if (reaction.valid) {
            reaction.products.forEach(p => {
              items.push({ label: `${p} (product)`, color: ReactionLabEngine.getColorForChemical(p) });
            });
          }
          
          return items.map((item, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div 
                className="w-3 h-3 rounded-full shadow-sm"
                style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}40` }}
              />
              <span className="text-xs text-gray-400">{item.label}</span>
            </div>
          ));
        })()}
      </div>
    </div>
  );
};

// Color utility functions
function lightenColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
  const B = Math.min(255, (num & 0x0000FF) + amt);
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}

function darkenColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, (num >> 16) - amt);
  const G = Math.max(0, ((num >> 8) & 0x00FF) - amt);
  const B = Math.max(0, (num & 0x0000FF) - amt);
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}

function getContrastColor(color: string): string {
  const num = parseInt(color.replace('#', ''), 16);
  const R = num >> 16;
  const G = (num >> 8) & 0x00FF;
  const B = num & 0x0000FF;
  const luminance = (0.299 * R + 0.587 * G + 0.114 * B) / 255;
  return luminance > 0.5 ? '#1a1a2e' : '#ffffff';
}

export default ReactionLabCanvas;
