import React, { useRef, useEffect, useCallback } from 'react';
import { REACTIONS, EquilibriumReaction, Particle } from './types';

interface LeChatelierCanvasProps {
  params: {
    reaction: string;
    temperature: number;
    pressure: number;
    volume: number;
    reactant1Conc: number;
    reactant2Conc: number;
    product1Conc: number;
    product2Conc: number;
  };
  isRunning: boolean;
  equilibriumState: {
    Q: number;
    Kc: number;
    position: 'left' | 'right' | 'equilibrium';
    shiftDirection: 'forward' | 'reverse' | 'none';
    shiftReason: string;
  };
  concentrations: {
    reactants: number[];
    products: number[];
  };
}

const LeChatelierCanvas: React.FC<LeChatelierCanvasProps> = ({
  params,
  isRunning,
  equilibriumState,
  concentrations,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const currentReaction: EquilibriumReaction | undefined = REACTIONS.find(r => r.id === params.reaction);

  // Initialize particles based on concentrations
  const initializeParticles = useCallback(() => {
    if (!currentReaction) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const particles: Particle[] = [];
    let id = 0;

    // Create reactant particles
    concentrations.reactants.forEach((conc, speciesIdx) => {
      const count = Math.floor(conc * 30); // Scale concentration to particle count
      for (let i = 0; i < count; i++) {
        particles.push({
          id: id++,
          x: 50 + Math.random() * (canvas.width / 2 - 100),
          y: 100 + Math.random() * (canvas.height - 200),
          vx: (Math.random() - 0.5) * 2 * Math.sqrt(params.temperature / 298),
          vy: (Math.random() - 0.5) * 2 * Math.sqrt(params.temperature / 298),
          type: 'reactant',
          speciesIndex: speciesIdx,
          radius: 8,
          color: currentReaction.colors.reactants[speciesIdx] || '#888',
        });
      }
    });

    // Create product particles
    concentrations.products.forEach((conc, speciesIdx) => {
      const count = Math.floor(conc * 30);
      for (let i = 0; i < count; i++) {
        particles.push({
          id: id++,
          x: canvas.width / 2 + 50 + Math.random() * (canvas.width / 2 - 100),
          y: 100 + Math.random() * (canvas.height - 200),
          vx: (Math.random() - 0.5) * 2 * Math.sqrt(params.temperature / 298),
          vy: (Math.random() - 0.5) * 2 * Math.sqrt(params.temperature / 298),
          type: 'product',
          speciesIndex: speciesIdx,
          radius: 8,
          color: currentReaction.colors.products[speciesIdx] || '#888',
        });
      }
    });

    particlesRef.current = particles;
  }, [currentReaction, concentrations, params.temperature]);

  // Update particles based on equilibrium shift
  useEffect(() => {
    initializeParticles();
  }, [initializeParticles, params.reaction]);

  // Lerp color helper
  const lerpColor = (color1: string, color2: string, ratio: number): string => {
    const hex = (c: string) => parseInt(c, 16);
    const r1 = hex(color1.slice(1, 3)), g1 = hex(color1.slice(3, 5)), b1 = hex(color1.slice(5, 7));
    const r2 = hex(color2.slice(1, 3)), g2 = hex(color2.slice(3, 5)), b2 = hex(color2.slice(5, 7));
    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = (timestamp: number) => {
      // Update timestamp for potential future use
      lastTimeRef.current = timestamp;

      // Clear canvas
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw container background with gradient based on equilibrium
      const totalReactants = concentrations.reactants.reduce((a, b) => a + b, 0);
      const totalProducts = concentrations.products.reduce((a, b) => a + b, 0);
      const productRatio = totalProducts / Math.max(0.1, totalReactants + totalProducts);

      // Background color based on dominant species
      if (currentReaction) {
        const reactantColor = currentReaction.colors.reactants[0] || '#444444';
        const productColor = currentReaction.colors.products[0] || '#444444';
        const bgColor = lerpColor(reactantColor, productColor, productRatio);
        
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, `${bgColor}20`);
        gradient.addColorStop(0.5, `${bgColor}40`);
        gradient.addColorStop(1, `${bgColor}20`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw container (beaker/flask shape)
      ctx.strokeStyle = 'rgba(135, 206, 235, 0.6)';
      ctx.lineWidth = 3;
      
      // Flask outline
      const centerX = canvas.width / 2;
      const flaskTop = 60;
      const flaskBottom = canvas.height - 40;
      const neckWidth = 80;
      const neckHeight = 50;

      ctx.beginPath();
      // Left side
      ctx.moveTo(centerX - neckWidth / 2, flaskTop);
      ctx.lineTo(centerX - neckWidth / 2, flaskTop + neckHeight);
      ctx.quadraticCurveTo(40, flaskTop + neckHeight + 50, 40, flaskBottom - 30);
      ctx.lineTo(40, flaskBottom);
      // Bottom
      ctx.lineTo(canvas.width - 40, flaskBottom);
      // Right side
      ctx.lineTo(canvas.width - 40, flaskBottom - 30);
      ctx.quadraticCurveTo(canvas.width - 40, flaskTop + neckHeight + 50, centerX + neckWidth / 2, flaskTop + neckHeight);
      ctx.lineTo(centerX + neckWidth / 2, flaskTop);
      ctx.stroke();

      // Flask neck rim
      ctx.beginPath();
      ctx.ellipse(centerX, flaskTop, neckWidth / 2, 8, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(135, 206, 235, 0.8)';
      ctx.stroke();

      // Draw liquid level based on volume
      const liquidLevel = flaskBottom - 50 - (params.volume / 5) * (flaskBottom - flaskTop - neckHeight - 100);
      if (currentReaction) {
        const liquidColor = lerpColor(
          currentReaction.colors.reactants[0] || '#888',
          currentReaction.colors.products[0] || '#888',
          productRatio
        );
        
        // Liquid gradient
        const liquidGradient = ctx.createLinearGradient(0, liquidLevel, 0, flaskBottom);
        liquidGradient.addColorStop(0, `${liquidColor}80`);
        liquidGradient.addColorStop(1, `${liquidColor}cc`);
        ctx.fillStyle = liquidGradient;
        
        ctx.beginPath();
        ctx.moveTo(50, liquidLevel);
        ctx.lineTo(50, flaskBottom - 5);
        ctx.lineTo(canvas.width - 50, flaskBottom - 5);
        ctx.lineTo(canvas.width - 50, liquidLevel);
        ctx.closePath();
        ctx.fill();

        // Liquid surface highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.ellipse(centerX, liquidLevel, (canvas.width - 100) / 2, 10, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update and draw particles
      const speedFactor = Math.sqrt(params.temperature / 298) * (isRunning ? 1 : 0);
      
      particlesRef.current.forEach(particle => {
        if (isRunning) {
          // Update position
          particle.x += particle.vx * speedFactor;
          particle.y += particle.vy * speedFactor;

          // Bounce off walls
          const margin = 55;
          if (particle.x < margin) {
            particle.x = margin;
            particle.vx *= -1;
          }
          if (particle.x > canvas.width - margin) {
            particle.x = canvas.width - margin;
            particle.vx *= -1;
          }
          if (particle.y < liquidLevel + 20) {
            particle.y = liquidLevel + 20;
            particle.vy *= -1;
          }
          if (particle.y > flaskBottom - 20) {
            particle.y = flaskBottom - 20;
            particle.vy *= -1;
          }

          // Random motion
          particle.vx += (Math.random() - 0.5) * 0.2;
          particle.vy += (Math.random() - 0.5) * 0.2;

          // Damping
          particle.vx *= 0.99;
          particle.vy *= 0.99;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Particle glow
        const glow = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 2
        );
        glow.addColorStop(0, `${particle.color}60`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Particle highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(particle.x - 2, particle.y - 2, particle.radius / 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw equilibrium indicator
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('⇌', centerX, 35);

      // Draw shift arrow if not at equilibrium
      if (equilibriumState.shiftDirection !== 'none' && isRunning) {
        ctx.fillStyle = equilibriumState.shiftDirection === 'forward' ? '#4ade80' : '#f87171';
        ctx.font = 'bold 24px Arial';
        const arrow = equilibriumState.shiftDirection === 'forward' ? '→' : '←';
        ctx.fillText(arrow, centerX + (equilibriumState.shiftDirection === 'forward' ? 30 : -30), 35);
      }

      // Draw reaction equation
      if (currentReaction) {
        ctx.fillStyle = '#aaa';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(currentReaction.equation, centerX, canvas.height - 15);
      }

      // Draw Q vs K indicator
      const indicatorX = canvas.width - 120;
      const indicatorY = 30;
      
      ctx.fillStyle = '#333';
      ctx.fillRect(indicatorX - 60, indicatorY - 15, 120, 50);
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1;
      ctx.strokeRect(indicatorX - 60, indicatorY - 15, 120, 50);

      ctx.fillStyle = '#fff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Q = ${equilibriumState.Q.toExponential(2)}`, indicatorX - 50, indicatorY + 5);
      ctx.fillText(`K = ${equilibriumState.Kc.toExponential(2)}`, indicatorX - 50, indicatorY + 22);

      // Q vs K status
      ctx.textAlign = 'right';
      if (equilibriumState.Q < equilibriumState.Kc * 0.9) {
        ctx.fillStyle = '#4ade80';
        ctx.fillText('Q < K →', indicatorX + 55, indicatorY + 14);
      } else if (equilibriumState.Q > equilibriumState.Kc * 1.1) {
        ctx.fillStyle = '#f87171';
        ctx.fillText('Q > K ←', indicatorX + 55, indicatorY + 14);
      } else {
        ctx.fillStyle = '#facc15';
        ctx.fillText('Q ≈ K', indicatorX + 55, indicatorY + 14);
      }

      // Draw concentration bars
      const barWidth = 60;
      const barMaxHeight = 80;
      const barY = 80;

      // Reactants bar
      ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.fillRect(30, barY, barWidth, barMaxHeight);
      const reactantHeight = Math.min(barMaxHeight, (totalReactants / 3) * barMaxHeight);
      ctx.fillStyle = currentReaction?.colors.reactants[0] || '#3b82f6';
      ctx.fillRect(30, barY + barMaxHeight - reactantHeight, barWidth, reactantHeight);
      ctx.strokeStyle = '#3b82f6';
      ctx.strokeRect(30, barY, barWidth, barMaxHeight);
      ctx.fillStyle = '#fff';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Reactants', 60, barY + barMaxHeight + 15);
      ctx.fillText(`${totalReactants.toFixed(2)} M`, 60, barY + barMaxHeight + 28);

      // Products bar
      ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
      ctx.fillRect(canvas.width - 90, barY, barWidth, barMaxHeight);
      const productHeight = Math.min(barMaxHeight, (totalProducts / 3) * barMaxHeight);
      ctx.fillStyle = currentReaction?.colors.products[0] || '#ef4444';
      ctx.fillRect(canvas.width - 90, barY + barMaxHeight - productHeight, barWidth, productHeight);
      ctx.strokeStyle = '#ef4444';
      ctx.strokeRect(canvas.width - 90, barY, barWidth, barMaxHeight);
      ctx.fillStyle = '#fff';
      ctx.fillText('Products', canvas.width - 60, barY + barMaxHeight + 15);
      ctx.fillText(`${totalProducts.toFixed(2)} M`, canvas.width - 60, barY + barMaxHeight + 28);

      // Stress indicator
      if (equilibriumState.shiftReason && isRunning) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(centerX - 150, canvas.height - 80, 300, 30);
        ctx.fillStyle = '#facc15';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(equilibriumState.shiftReason, centerX, canvas.height - 60);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, params, currentReaction, equilibriumState, concentrations]);

  return (
    <canvas
      ref={canvasRef}
      width={700}
      height={500}
      className="w-full h-full rounded-lg"
      style={{ background: '#1a1a2e' }}
    />
  );
};

export default LeChatelierCanvas;
