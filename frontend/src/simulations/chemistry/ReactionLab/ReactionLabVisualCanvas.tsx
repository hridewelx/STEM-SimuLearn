import { useRef, useEffect, useState, useCallback } from 'react';
import { ReactionLabParams, ReactionLabAnalyticsData } from './types';
import { ReactionLabEngine, ALL_CHEMICALS } from './reactionLabDatabase';

interface ReactionLabVisualCanvasProps {
  params: ReactionLabParams;
  isRunning: boolean;
  onAnalyticsUpdate: (data: ReactionLabAnalyticsData) => void;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
}

interface SteamParticle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
}

const ReactionLabVisualCanvas = ({ params, isRunning, onAnalyticsUpdate }: ReactionLabVisualCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  
  // Animation state refs (using refs to avoid re-renders during animation)
  const stateRef = useRef({
    phase: 'idle' as 'idle' | 'pouring1' | 'pouring2' | 'mixing' | 'reacting' | 'complete',
    tube1Level: 0,
    tube2Level: 0,
    beakerLevel: 0,
    beakerColor: '#FFFFFF',
    targetColor: '#FFFFFF',
    mixProgress: 0,
    reactionProgress: 0,
    bubbles: [] as Bubble[],
    steam: [] as SteamParticle[],
    pourStream: { active: false, from: 'tube1' as 'tube1' | 'tube2', progress: 0 },
    frameCount: 0,
    colorTransition: 0,
  });

  // Get reactant info
  const getReactants = useCallback(() => {
    const { reactionType } = params;
    let reactant1 = '';
    let reactant2 = '';

    switch (reactionType) {
      case 'composition':
        reactant1 = params.elementA || '';
        reactant2 = params.elementB || '';
        break;
      case 'decomposition':
        reactant1 = params.compound || '';
        reactant2 = '';
        break;
      case 'acidBase':
        reactant1 = params.acid || '';
        reactant2 = params.base || '';
        break;
      case 'singleReplacement':
        reactant1 = params.element || '';
        reactant2 = params.compoundForReplacement || '';
        break;
    }

    return { reactant1, reactant2 };
  }, [params]);

  // Initialize when params change
  useEffect(() => {
    const { reactant1, reactant2 } = getReactants();

    // Scale for 100g capacity per tube - level goes from 0 to 90 (max fill)
    // Total beaker capacity = 200g (100g from each tube)
    const level1 = Math.min(90, (params.reactant1Amount / 100) * 90);
    const level2 = params.reactionType === 'decomposition' ? 0 : Math.min(90, (params.reactant2Amount / 100) * 90);

    stateRef.current = {
      phase: 'idle',
      tube1Level: level1,
      tube2Level: level2,
      beakerLevel: 0,
      beakerColor: '#333333',
      targetColor: '#FFFFFF',
      mixProgress: 0,
      reactionProgress: 0,
      bubbles: [],
      steam: [],
      pourStream: { active: false, from: 'tube1', progress: 0 },
      frameCount: 0,
      colorTransition: 0,
    };

    // Get reaction result for target color
    const result = ReactionLabEngine.getReaction(params.reactionType, reactant1, reactant2);
    if (result?.valid && result.products.length > 0) {
      const productChem = ALL_CHEMICALS[result.products[0]];
      if (productChem) {
        stateRef.current.targetColor = productChem.color;
      }
    }

    // Update analytics
    onAnalyticsUpdate({
      progressPercentage: 0,
      reactionRate: 0,
      productsFormed: 0,
      totalParticles: params.reactant1Amount + (params.reactionType === 'decomposition' ? 0 : params.reactant2Amount),
      balancedEquation: result?.valid ? result.equation : 'Select valid reactants',
      energyChange: result?.energyChange || 'neutral',
      stoichiometricRatio: result?.stoichiometricRatio || '0:0',
      limitingReagent: '',
      excessReagent: '',
      theoreticalYield: 0,
      actualYield: 0,
      percentYield: 0,
    });
  }, [params, getReactants, onAnalyticsUpdate]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: Math.max(600, rect.width),
          height: Math.max(400, rect.height),
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Use ResizeObserver for better container size detection
    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  // Color interpolation helper
  const lerpColor = (color1: string, color2: string, t: number): string => {
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');
    
    const r1 = parseInt(hex1.substr(0, 2), 16);
    const g1 = parseInt(hex1.substr(2, 2), 16);
    const b1 = parseInt(hex1.substr(4, 2), 16);
    
    const r2 = parseInt(hex2.substr(0, 2), 16);
    const g2 = parseInt(hex2.substr(2, 2), 16);
    const b2 = parseInt(hex2.substr(4, 2), 16);
    
    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  // Main animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { reactant1, reactant2 } = getReactants();
    const chem1 = ALL_CHEMICALS[reactant1];
    const chem2 = ALL_CHEMICALS[reactant2];
    const result = ReactionLabEngine.getReaction(params.reactionType, reactant1, reactant2);

    const animate = () => {
      const state = stateRef.current;
      const { width, height } = dimensions;
      state.frameCount++;

      // Clear canvas
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, width, height);

      // Scale for responsive
      const scale = Math.min(width / 700, height / 500);
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.save();
      ctx.translate(centerX - 350 * scale, centerY - 250 * scale);
      ctx.scale(scale, scale);

      // ===== ANIMATION LOGIC =====
      // Store initial levels for analytics calculation
      const initialLevel1 = Math.min(90, (params.reactant1Amount / 100) * 90);
      const initialLevel2 = params.reactionType === 'decomposition' ? 0 : Math.min(90, (params.reactant2Amount / 100) * 90);
      
      if (isRunning && state.phase === 'idle') {
        state.phase = 'pouring1';
        state.pourStream.active = true;
        state.pourStream.from = 'tube1';
        state.pourStream.progress = 0;
      }

      if (isRunning) {
        switch (state.phase) {
          case 'pouring1':
            if (state.tube1Level > 3) {
              // Slower pour for larger amounts
              const pourRate = 0.8 + (params.reactant1Amount / 100) * 0.4;
              state.tube1Level -= pourRate;
              // Beaker can hold 200g, so max level for first pour is proportional to amount
              const firstPourTarget = Math.min(45, (params.reactant1Amount / 200) * 90);
              state.beakerLevel = Math.min(firstPourTarget, state.beakerLevel + pourRate * 0.5);
              state.pourStream.progress = Math.min(1, state.pourStream.progress + 0.04);
              state.beakerColor = chem1?.color || '#888888';
            } else {
              state.tube1Level = 0;
              state.pourStream.active = false;
              if (params.reactionType === 'decomposition') {
                state.phase = 'mixing';
              } else {
                state.phase = 'pouring2';
                state.pourStream.active = true;
                state.pourStream.from = 'tube2';
                state.pourStream.progress = 0;
              }
            }
            break;

          case 'pouring2':
            if (state.tube2Level > 3) {
              const pourRate = 0.8 + (params.reactant2Amount / 100) * 0.4;
              state.tube2Level -= pourRate;
              // Beaker can hold 200g total, scale level to 90 max
              const totalMass = params.reactant1Amount + params.reactant2Amount;
              const targetLevel = Math.min(90, (totalMass / 200) * 90);
              state.beakerLevel = Math.min(targetLevel, state.beakerLevel + pourRate * 0.5);
              state.pourStream.progress = Math.min(1, state.pourStream.progress + 0.04);
              
              // Mix colors weighted by mass ratio - dominant element determines color intensity
              const ratio1 = params.reactant1Amount / Math.max(1, totalMass);
              const ratio2 = params.reactant2Amount / Math.max(1, totalMass);
              const mixRatio = 1 - (state.tube2Level / Math.max(1, initialLevel2));
              // Color is weighted: more mass = more color influence
              const dominantColor = ratio1 > ratio2 
                ? lerpColor(chem2?.color || '#888888', chem1?.color || '#888888', ratio1)
                : lerpColor(chem1?.color || '#888888', chem2?.color || '#888888', ratio2);
              state.beakerColor = lerpColor(state.beakerColor, dominantColor, mixRatio * 0.3);
            } else {
              state.tube2Level = 0;
              state.pourStream.active = false;
              state.phase = 'mixing';
              state.mixProgress = 0;
            }
            break;

          case 'mixing':
            state.mixProgress += 0.8;
            // Add bubbles during mixing
            if (state.frameCount % 4 === 0 && state.bubbles.length < 20) {
              state.bubbles.push({
                id: Math.random(),
                x: 350 + (Math.random() - 0.5) * 80,
                y: 350 + Math.random() * 30,
                radius: 2 + Math.random() * 4,
                speed: 1 + Math.random() * 2,
                opacity: 0.8,
              });
            }
            
            if (state.mixProgress >= 100) {
              state.phase = 'reacting';
              state.reactionProgress = 0;
              state.colorTransition = 0;
            }
            break;

          case 'reacting':
            state.reactionProgress += 0.4;
            state.colorTransition = Math.min(1, state.colorTransition + 0.008);
            
            // Smoothly transition to product color
            // Start color is weighted by the dominant (more amount) reactant
            let startColor: string;
            if (params.reactionType === 'decomposition') {
              startColor = chem1?.color || '#888888';
            } else {
              // Weight by amount - more grams = more color influence
              const totalMass = params.reactant1Amount + params.reactant2Amount;
              const ratio2 = params.reactant2Amount / Math.max(1, totalMass);
              // If reactant2 has more mass, its color dominates (ratio2 > 0.5)
              startColor = lerpColor(chem1?.color || '#888888', chem2?.color || '#888888', ratio2);
            }
            state.beakerColor = lerpColor(startColor, state.targetColor, state.colorTransition);
            
            // Add reaction bubbles (more vigorous) - UPDATED for new beaker position
            if (state.frameCount % 3 === 0 && state.bubbles.length < 30) {
              state.bubbles.push({
                id: Math.random(),
                x: 350 + (Math.random() - 0.5) * 110,  // Wider spread for bigger beaker
                y: 290 + Math.random() * 60,  // Lower starting point for deeper beaker
                radius: 3 + Math.random() * 5,
                speed: 2 + Math.random() * 3,
                opacity: 0.9,
              });
            }

            // Add steam for exothermic reactions - UPDATED for new beaker position
            if (result?.energyChange === 'exothermic' && state.frameCount % 5 === 0 && state.steam.length < 15) {
              state.steam.push({
                id: Math.random(),
                x: 350 + (Math.random() - 0.5) * 60,  // Wider steam spread
                y: 250,  // Higher starting point (top of beaker)
                opacity: 0.5,
                size: 8 + Math.random() * 12,
              });
            }

            if (state.reactionProgress >= 100) {
              state.phase = 'complete';
              state.beakerColor = state.targetColor;
            }
            break;

          case 'complete':
            // Slowly fade out remaining bubbles
            break;
        }

        // Update bubbles - filter out when they reach beaker top
        state.bubbles = state.bubbles
          .map(b => ({
            ...b,
            y: b.y - b.speed,
            x: b.x + (Math.random() - 0.5) * 1.5,
            opacity: b.opacity - 0.015,
          }))
          .filter(b => b.opacity > 0 && b.y > 220);  // Updated for new beaker Y position

        // Update steam
        state.steam = state.steam
          .map(s => ({
            ...s,
            y: s.y - 1.2,
            x: s.x + (Math.random() - 0.5) * 2,
            opacity: s.opacity - 0.012,
            size: s.size + 0.4,
          }))
          .filter(s => s.opacity > 0);

        // Update analytics with accurate calculations
        const progress = state.phase === 'complete' ? 100 : 
          state.phase === 'reacting' ? 50 + state.reactionProgress * 0.5 :
          state.phase === 'mixing' ? 30 + state.mixProgress * 0.2 :
          state.phase === 'pouring2' ? 15 + (1 - state.tube2Level / Math.max(1, initialLevel2)) * 15 :
          state.phase === 'pouring1' ? (1 - state.tube1Level / Math.max(1, initialLevel1)) * 15 : 0;

        // Total input mass in grams
        const totalInputMass = params.reactant1Amount + (params.reactionType === 'decomposition' ? 0 : params.reactant2Amount);
        
        // Calculate molar masses for stoichiometry
        // HCl = 36.46 g/mol, KOH = 56.11 g/mol, NaOH = 40 g/mol
        const molarMass1 = ReactionLabEngine.getMolarMass(reactant1) || 36.46;
        const molarMass2 = ReactionLabEngine.getMolarMass(reactant2) || 56.11;
        const moles1 = params.reactant1Amount / molarMass1;
        const moles2 = params.reactionType === 'decomposition' ? 0 : params.reactant2Amount / molarMass2;
        
        // Determine limiting reagent based on stoichiometry
        // For 1:1 reaction like HCl + KOH → KCl + H2O
        // The one with FEWER MOLES is limiting
        let limitingReagent = reactant1;
        let excessReagent = reactant2;
        let limitingMoles = moles1;
        let limitingMass = params.reactant1Amount;
        
        const coeff1 = result?.coefficients?.reactants[0] || 1;
        const coeff2 = result?.coefficients?.reactants[1] || 1;
        
        if (params.reactionType !== 'decomposition') {
          // Compare mole ratios to stoichiometric ratios
          const ratio1 = moles1 / coeff1;  // Available "reaction units" from reactant 1
          const ratio2 = moles2 / coeff2;  // Available "reaction units" from reactant 2
          
          if (ratio2 < ratio1) {
            // Reactant 2 runs out first
            limitingReagent = reactant2;
            excessReagent = reactant1;
            limitingMoles = moles2;
            limitingMass = params.reactant2Amount;
          }
        }
        
        // Calculate theoretical yield in GRAMS using STOICHIOMETRY
        // Example: 2g HCl (MW=36.46) = 0.0549 mol
        // HCl + KOH → KCl + H2O (1:1:1:1 ratio)
        // Products: 0.0549 mol KCl (MW=74.55) = 4.09g + 0.0549 mol H2O (MW=18) = 0.99g = ~5g total
        // So 2g acid produces ~5g of products (NOT 4g, because base also contributes mass!)
        
        // The CORRECT calculation:
        // Mass of limiting reagent that reacts = limitingMass
        // Mass of excess reagent that reacts = (limitingMoles * coeff_excess / coeff_limiting) * molarMass_excess
        const limitingReactantCoeff = limitingReagent === reactant1 ? coeff1 : coeff2;
        const excessReactantCoeff = limitingReagent === reactant1 ? coeff2 : coeff1;
        const excessMolarMass = limitingReagent === reactant1 ? molarMass2 : molarMass1;
        
        // Mass of excess reagent consumed
        const excessMolesConsumed = (limitingMoles * excessReactantCoeff) / limitingReactantCoeff;
        const excessMassConsumed = excessMolesConsumed * excessMolarMass;
        
        // Total reacting mass (conservation of mass: products mass = reactants mass consumed)
        const totalReactingMass = limitingMass + Math.min(excessMassConsumed, 
          limitingReagent === reactant1 ? params.reactant2Amount : params.reactant1Amount);
        
        // Theoretical yield = mass of reactants consumed (conservation of mass)
        let theoreticalYield = totalReactingMass;
        
        // Actual yield based on progress (with realistic efficiency 90-98%)
        const yieldEfficiency = 0.90 + (params.temperature / 200) * 0.08;
        const actualYield = (progress / 100) * theoreticalYield * yieldEfficiency;
        const percentYield = theoreticalYield > 0 ? (actualYield / theoreticalYield) * 100 : 0;
        
        // Reaction rate based on temperature and phase (g/s)
        const baseRate = (params.temperature / 100) * 2;
        const reactionRate = state.phase === 'reacting' ? baseRate + Math.random() * 0.3 : 
          (state.phase === 'mixing' ? baseRate * 0.3 : 0);
        
        // Products formed in GRAMS (what user expects to see)
        const productsFormedGrams = (progress / 100) * theoreticalYield * yieldEfficiency;
        
        // Total particles = total input mass (what went into beaker)
        const totalParticlesGrams = totalInputMass;

        onAnalyticsUpdate({
          progressPercentage: Math.round(progress),
          reactionRate: Number(reactionRate.toFixed(2)),
          productsFormed: Math.round(productsFormedGrams), // Now in grams!
          totalParticles: Math.round(totalParticlesGrams), // Now in grams!
          balancedEquation: result?.equation || 'No reaction',
          energyChange: result?.energyChange || 'neutral',
          stoichiometricRatio: result?.stoichiometricRatio || '0:0',
          limitingReagent: params.reactionType === 'decomposition' ? reactant1 : limitingReagent,
          excessReagent: params.reactionType === 'decomposition' ? '' : excessReagent,
          theoreticalYield: Number(theoreticalYield.toFixed(2)),
          actualYield: Number(actualYield.toFixed(2)),
          percentYield: Number(percentYield.toFixed(1)),
        });
      }

      // ===== DRAWING =====
      
      // Lab bench
      ctx.fillStyle = '#2d2d44';
      ctx.fillRect(0, 420, 700, 80);
      ctx.fillStyle = '#3d3d5c';
      ctx.fillRect(0, 415, 700, 8);

      // ===== TEST TUBE 1 (LEFT) - LARGER SIZE =====
      const tube1X = 110;
      const tube1Y = 80;
      const tubeW = 55;  // Bigger for better visibility
      const tubeH = 240; // Taller to fit 100g with better view
      
      // Calculate tilt angle when pouring
      const tube1Tilt = state.phase === 'pouring1' && state.pourStream.active 
        ? Math.min(50, state.pourStream.progress * 55) * (Math.PI / 180) 
        : 0;
      
      ctx.save();
      // Rotate around bottom of tube when tilting
      if (tube1Tilt > 0) {
        ctx.translate(tube1X, tube1Y + tubeH);
        ctx.rotate(tube1Tilt);
        ctx.translate(-tube1X, -(tube1Y + tubeH));
      }

      // Tube glass
      ctx.strokeStyle = 'rgba(135, 206, 235, 0.8)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(tube1X - tubeW/2, tube1Y);
      ctx.lineTo(tube1X - tubeW/2, tube1Y + tubeH - 20);
      ctx.quadraticCurveTo(tube1X - tubeW/2, tube1Y + tubeH, tube1X, tube1Y + tubeH);
      ctx.quadraticCurveTo(tube1X + tubeW/2, tube1Y + tubeH, tube1X + tubeW/2, tube1Y + tubeH - 20);
      ctx.lineTo(tube1X + tubeW/2, tube1Y);
      ctx.stroke();
      
      // Glass shine effect
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(tube1X - tubeW/2 + 5, tube1Y + 10);
      ctx.lineTo(tube1X - tubeW/2 + 5, tube1Y + tubeH - 30);
      ctx.stroke();

      // Tube 1 liquid
      if (state.tube1Level > 0) {
        const liqH = (state.tube1Level / 100) * tubeH * 0.85;
        const liqY = tube1Y + tubeH - liqH - 5;
        
        ctx.fillStyle = chem1?.color || '#FF6B6B';
        ctx.beginPath();
        ctx.moveTo(tube1X - tubeW/2 + 4, liqY);
        ctx.lineTo(tube1X - tubeW/2 + 4, tube1Y + tubeH - 22);
        ctx.quadraticCurveTo(tube1X - tubeW/2 + 4, tube1Y + tubeH - 5, tube1X, tube1Y + tubeH - 5);
        ctx.quadraticCurveTo(tube1X + tubeW/2 - 4, tube1Y + tubeH - 5, tube1X + tubeW/2 - 4, tube1Y + tubeH - 22);
        ctx.lineTo(tube1X + tubeW/2 - 4, liqY);
        ctx.closePath();
        ctx.fill();

        // Liquid surface shine
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.beginPath();
        ctx.ellipse(tube1X, liqY, tubeW/2 - 6, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Side highlight
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.fillRect(tube1X - tubeW/2 + 6, liqY + 5, 6, Math.max(0, liqH - 15));
      }

      // Tube rim
      ctx.fillStyle = '#4a90a4';
      ctx.beginPath();
      ctx.ellipse(tube1X, tube1Y, tubeW/2 + 2, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#5ab0c4';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.restore();

      // Label (outside rotation)
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 13px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(reactant1 || 'Empty', tube1X, tube1Y + tubeH + 30);
      ctx.font = '11px Arial';
      ctx.fillStyle = '#aaa';
      // Tube level 90 = 100g, so current grams = (level / 90) * 100
      ctx.fillText(`${Math.round((state.tube1Level / 90) * 100)}g`, tube1X, tube1Y + tubeH + 45);

      // ===== TEST TUBE 2 (RIGHT) - LARGER SIZE =====
      if (params.reactionType !== 'decomposition') {
        const tube2X = 590;
        const tube2Y = 80;
        
        // Calculate tilt angle when pouring (tilt left for tube 2)
        const tube2Tilt = state.phase === 'pouring2' && state.pourStream.active 
          ? -Math.min(50, state.pourStream.progress * 55) * (Math.PI / 180) 
          : 0;
        
        ctx.save();
        if (tube2Tilt !== 0) {
          ctx.translate(tube2X, tube2Y + tubeH);
          ctx.rotate(tube2Tilt);
          ctx.translate(-tube2X, -(tube2Y + tubeH));
        }

        ctx.strokeStyle = 'rgba(135, 206, 235, 0.8)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(tube2X - tubeW/2, tube2Y);
        ctx.lineTo(tube2X - tubeW/2, tube2Y + tubeH - 20);
        ctx.quadraticCurveTo(tube2X - tubeW/2, tube2Y + tubeH, tube2X, tube2Y + tubeH);
        ctx.quadraticCurveTo(tube2X + tubeW/2, tube2Y + tubeH, tube2X + tubeW/2, tube2Y + tubeH - 20);
        ctx.lineTo(tube2X + tubeW/2, tube2Y);
        ctx.stroke();
        
        // Glass shine
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tube2X - tubeW/2 + 5, tube2Y + 10);
        ctx.lineTo(tube2X - tubeW/2 + 5, tube2Y + tubeH - 30);
        ctx.stroke();

        if (state.tube2Level > 0) {
          const liqH = (state.tube2Level / 100) * tubeH * 0.85;
          const liqY = tube2Y + tubeH - liqH - 5;
          
          ctx.fillStyle = chem2?.color || '#6B8CFF';
          ctx.beginPath();
          ctx.moveTo(tube2X - tubeW/2 + 4, liqY);
          ctx.lineTo(tube2X - tubeW/2 + 4, tube2Y + tubeH - 22);
          ctx.quadraticCurveTo(tube2X - tubeW/2 + 4, tube2Y + tubeH - 5, tube2X, tube2Y + tubeH - 5);
          ctx.quadraticCurveTo(tube2X + tubeW/2 - 4, tube2Y + tubeH - 5, tube2X + tubeW/2 - 4, tube2Y + tubeH - 22);
          ctx.lineTo(tube2X + tubeW/2 - 4, liqY);
          ctx.closePath();
          ctx.fill();

          // Liquid surface shine
          ctx.fillStyle = 'rgba(255,255,255,0.2)';
          ctx.beginPath();
          ctx.ellipse(tube2X, liqY, tubeW/2 - 6, 4, 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = 'rgba(255,255,255,0.25)';
          ctx.fillRect(tube2X - tubeW/2 + 6, liqY + 5, 6, Math.max(0, liqH - 15));
        }

        // Tube rim
        ctx.fillStyle = '#4a90a4';
        ctx.beginPath();
        ctx.ellipse(tube2X, tube2Y, tubeW/2 + 2, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#5ab0c4';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.restore();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 13px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(reactant2 || 'Empty', tube2X, tube2Y + tubeH + 30);
        ctx.font = '11px Arial';
        ctx.fillStyle = '#aaa';
        // Tube level 90 = 100g, so current grams = (level / 90) * 100
        ctx.fillText(`${Math.round((state.tube2Level / 90) * 100)}g`, tube2X, tube2Y + tubeH + 45);
      }

      // ===== BEAKER (CENTER) - 200g CAPACITY =====
      const beakerX = 350;
      const beakerY = 220;
      const beakerW = 170;  // Wider for 200g
      const beakerH = 190;  // Taller for 200g

      // Beaker glass
      ctx.strokeStyle = 'rgba(135, 206, 235, 0.9)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(beakerX - beakerW/2, beakerY);
      ctx.lineTo(beakerX - beakerW/2 + 8, beakerY + beakerH);
      ctx.lineTo(beakerX + beakerW/2 - 8, beakerY + beakerH);
      ctx.lineTo(beakerX + beakerW/2, beakerY);
      ctx.stroke();

      // Spout
      ctx.beginPath();
      ctx.moveTo(beakerX - beakerW/2, beakerY);
      ctx.lineTo(beakerX - beakerW/2 - 12, beakerY - 8);
      ctx.stroke();

      // Graduations - 200g scale (50, 100, 150, 200)
      ctx.strokeStyle = 'rgba(135, 206, 235, 0.4)';
      ctx.lineWidth = 1;
      ctx.font = '10px Arial';
      ctx.fillStyle = 'rgba(135, 206, 235, 0.7)';
      for (let i = 1; i <= 4; i++) {
        const y = beakerY + beakerH - (i * beakerH / 5);
        const xOffset = (beakerH - (i * beakerH / 5)) / beakerH * 8;
        ctx.beginPath();
        ctx.moveTo(beakerX - beakerW/2 + 5 + xOffset, y);
        ctx.lineTo(beakerX - beakerW/2 + 20 + xOffset, y);
        ctx.stroke();
        ctx.textAlign = 'left';
        ctx.fillText(`${i * 50}g`, beakerX - beakerW/2 + 24 + xOffset, y + 3);
      }

      // Beaker liquid with color transition
      if (state.beakerLevel > 0) {
        const liqH = (state.beakerLevel / 100) * beakerH;
        const liqY = beakerY + beakerH - liqH;
        const bottomInset = (1 - state.beakerLevel / 100) * 8;

        // Main liquid body
        ctx.fillStyle = state.beakerColor;
        ctx.beginPath();
        ctx.moveTo(beakerX - beakerW/2 + 6 + bottomInset, liqY);
        ctx.lineTo(beakerX - beakerW/2 + 12, beakerY + beakerH - 4);
        ctx.lineTo(beakerX + beakerW/2 - 12, beakerY + beakerH - 4);
        ctx.lineTo(beakerX + beakerW/2 - 6 - bottomInset, liqY);
        
        // Wavy surface during mixing/reacting
        if (state.phase === 'mixing' || state.phase === 'reacting') {
          const wave = Math.sin(state.frameCount * 0.15) * 3;
          ctx.lineTo(beakerX + beakerW/4, liqY + wave);
          ctx.lineTo(beakerX, liqY - wave);
          ctx.lineTo(beakerX - beakerW/4, liqY + wave);
        }
        
        ctx.closePath();
        ctx.fill();

        // Surface highlight
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.fillRect(beakerX - beakerW/2 + 15, liqY + 3, beakerW - 35, 4);

        // Glow effect during reaction
        if (state.phase === 'reacting') {
          const glowIntensity = 0.1 + Math.sin(state.frameCount * 0.1) * 0.05;
          ctx.fillStyle = `rgba(255, 255, 200, ${glowIntensity})`;
          ctx.beginPath();
          ctx.moveTo(beakerX - beakerW/2 + 6 + bottomInset, liqY);
          ctx.lineTo(beakerX - beakerW/2 + 12, beakerY + beakerH - 4);
          ctx.lineTo(beakerX + beakerW/2 - 12, beakerY + beakerH - 4);
          ctx.lineTo(beakerX + beakerW/2 - 6 - bottomInset, liqY);
          ctx.closePath();
          ctx.fill();
        }
      }

      // Draw bubbles
      state.bubbles.forEach(bubble => {
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(200, 220, 255, ${bubble.opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw steam
      state.steam.forEach(s => {
        const gradient = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size);
        gradient.addColorStop(0, `rgba(220, 220, 220, ${s.opacity})`);
        gradient.addColorStop(1, `rgba(220, 220, 220, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // ===== POUR STREAM =====
      if (state.pourStream.active && state.pourStream.progress > 0) {
        // Test tube dimensions (must match drawing - UPDATED for new sizes)
        const tube1X = 110;
        const tube2X = 590;
        const tubeY = 80;
        const pourTubeH = 240;
        
        // Calculate tilt angle (same as tube drawing)
        const tiltAngle = state.pourStream.progress * 55 * (Math.PI / 180);
        const baseTubeX = state.pourStream.from === 'tube1' ? tube1X : tube2X;
        const tiltDirection = state.pourStream.from === 'tube1' ? 1 : -1;
        
        // Calculate the CENTER of the tube mouth when tilted
        // The tube rotates around its bottom point (tube1X, tubeY + pourTubeH)
        // The mouth center is at (tube1X, tubeY) when upright
        // After rotation: new position = pivot + rotated offset
        const pivotX = baseTubeX;
        const pivotY = tubeY + pourTubeH;
        
        // Offset from pivot to mouth center (when upright)
        const mouthOffsetX = 0;
        const mouthOffsetY = -pourTubeH; // mouth is at top, pourTubeH pixels above pivot
        
        // Rotate the offset by tilt angle
        const rotatedMouthX = mouthOffsetX * Math.cos(tiltAngle * tiltDirection) - mouthOffsetY * Math.sin(tiltAngle * tiltDirection);
        const rotatedMouthY = mouthOffsetX * Math.sin(tiltAngle * tiltDirection) + mouthOffsetY * Math.cos(tiltAngle * tiltDirection);
        
        // Final mouth position
        const fromX = pivotX + rotatedMouthX;
        const fromY = pivotY + rotatedMouthY;
        
        // Pour goes to bottom center of beaker
        const toX = beakerX;
        const toY = beakerY + beakerH - 10; // Bottom of beaker
        
        // Control point for natural arc - between start and end, slightly above
        const controlX = (fromX + toX) / 2;
        const controlY = Math.min(fromY, beakerY) - 20;

        const pourColor = state.pourStream.from === 'tube1' ? (chem1?.color || '#FF6B6B') : (chem2?.color || '#6B8CFF');
        
        // Main pour stream - thicker at start, thinner at end
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Draw pour stream as bezier curve
        const progress = state.pourStream.progress;
        
        // Draw main stream
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        for (let t = 0; t <= Math.min(1, progress * 1.2); t += 0.02) {
          const x = (1-t)*(1-t)*fromX + 2*(1-t)*t*controlX + t*t*toX;
          const y = (1-t)*(1-t)*fromY + 2*(1-t)*t*controlY + t*t*toY;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = pourColor;
        ctx.lineWidth = 7 - progress * 2; // Thinner as it pours more
        ctx.stroke();
        
        // Add glow effect
        ctx.strokeStyle = pourColor + '60';
        ctx.lineWidth = 12 - progress * 3;
        ctx.stroke();

        // Droplets along the stream - clamp to beaker boundaries
        const beakerTop = beakerY;
        const beakerBottom = beakerY + beakerH - 10;
        const beakerLeft = beakerX - beakerW/2 + 10;
        const beakerRight = beakerX + beakerW/2 - 10;
        
        for (let i = 0; i < 4; i++) {
          const t = Math.min(1, progress * 1.2) - 0.1 * i;
          if (t > 0.1) {
            let x = (1-t)*(1-t)*fromX + 2*(1-t)*t*controlX + t*t*toX + (Math.random() - 0.5) * 8;
            let y = (1-t)*(1-t)*fromY + 2*(1-t)*t*controlY + t*t*toY + Math.random() * 10;
            
            // Clamp droplets to stay inside beaker area once they enter
            if (y > beakerTop + 20) {
              x = Math.max(beakerLeft, Math.min(beakerRight, x));
              y = Math.min(beakerBottom, y); // Don't go below beaker bottom
            }
            
            ctx.beginPath();
            ctx.arc(x, y, 2 + Math.random() * 2, 0, Math.PI * 2);
            ctx.fillStyle = pourColor;
            ctx.fill();
          }
        }
      }

      // ===== BUNSEN BURNER (for decomposition) =====
      if (params.reactionType === 'decomposition' && isRunning && state.phase !== 'idle') {
        const burnerX = beakerX;
        const burnerY = beakerY + beakerH + 10;

        // Base
        ctx.fillStyle = '#444';
        ctx.fillRect(burnerX - 25, burnerY + 35, 50, 15);
        ctx.fillStyle = '#333';
        ctx.fillRect(burnerX - 8, burnerY, 16, 35);

        // Flame
        const flicker = Math.sin(state.frameCount * 0.2) * 0.15 + 0.85;
        
        // Blue core
        ctx.beginPath();
        ctx.moveTo(burnerX, burnerY - 25 * flicker);
        ctx.quadraticCurveTo(burnerX - 12, burnerY - 5, burnerX - 6, burnerY);
        ctx.lineTo(burnerX + 6, burnerY);
        ctx.quadraticCurveTo(burnerX + 12, burnerY - 5, burnerX, burnerY - 25 * flicker);
        ctx.fillStyle = `rgba(80, 140, 255, ${flicker})`;
        ctx.fill();

        // Orange outer
        ctx.beginPath();
        ctx.moveTo(burnerX, burnerY - 40 * flicker);
        ctx.quadraticCurveTo(burnerX - 20, burnerY - 10, burnerX - 10, burnerY);
        ctx.lineTo(burnerX + 10, burnerY);
        ctx.quadraticCurveTo(burnerX + 20, burnerY - 10, burnerX, burnerY - 40 * flicker);
        ctx.fillStyle = `rgba(255, 150, 50, ${flicker * 0.5})`;
        ctx.fill();
      }

      // ===== LABELS =====
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      
      // Beaker label
      let beakerLabel = 'Reaction Beaker';
      if (state.phase === 'complete' && result?.products) {
        beakerLabel = result.products.join(' + ');
      } else if (state.beakerLevel > 0) {
        if (state.phase === 'reacting') {
          beakerLabel = 'Reacting...';
        } else if (state.phase === 'mixing') {
          beakerLabel = 'Mixing...';
        }
      }
      ctx.fillText(beakerLabel, beakerX, beakerY - 15);

      // Status message
      ctx.font = '13px Arial';
      let statusColor = '#888';
      let statusText = 'Press Start to begin reaction';
      
      if (state.phase === 'pouring1') {
        statusColor = '#fbbf24';
        statusText = `Pouring ${reactant1}...`;
      } else if (state.phase === 'pouring2') {
        statusColor = '#fbbf24';
        statusText = `Pouring ${reactant2}...`;
      } else if (state.phase === 'mixing') {
        statusColor = '#60a5fa';
        statusText = `Mixing reactants... ${Math.round(state.mixProgress)}%`;
      } else if (state.phase === 'reacting') {
        statusColor = '#f97316';
        statusText = `Reaction in progress... ${Math.round(state.reactionProgress)}%`;
      } else if (state.phase === 'complete') {
        statusColor = '#4ade80';
        statusText = 'Reaction Complete!';
      }
      
      ctx.fillStyle = statusColor;
      ctx.fillText(statusText, 350, 470);

      // Energy indicator
      if (state.phase === 'reacting' || state.phase === 'complete') {
        ctx.font = 'bold 11px Arial';
        ctx.fillStyle = result?.energyChange === 'exothermic' ? '#ef4444' : '#3b82f6';
        const energyText = result?.energyChange === 'exothermic' ? 'Heat Released (Exothermic)' : 'Heat Absorbed (Endothermic)';
        ctx.fillText(energyText, 350, 490);
      }

      ctx.restore();

      // Title - removed emoji, using clean text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Visual Chemistry Lab', width / 2, 28);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [dimensions, isRunning, params, getReactants, onAnalyticsUpdate]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full rounded-xl"
        style={{ background: '#1a1a2e' }}
      />
    </div>
  );
};

export default ReactionLabVisualCanvas;
