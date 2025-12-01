import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Maximize2, Minimize2, Settings, BarChart3, Play, Pause, RotateCcw, Scale } from 'lucide-react';
import LeChatelierControls from './LeChatelierControls';
import LeChatelierCanvas from './LeChatelierCanvas';
import LeChatelierAnalytics from './LeChatelierAnalytics';
import AITutorPanel from '../../../components/AITutorPanel';
import { REACTIONS, EquilibriumReaction } from './types';
import { defaultLeChatelierParams, LeChatelierConfig } from './config';

const LeChatelierSimulation: React.FC = () => {
  const [params, setParams] = useState(defaultLeChatelierParams);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<'none' | 'controls' | 'analytics'>('none');
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  
  const [concentrations, setConcentrations] = useState({
    reactants: [0.5, 0.5],
    products: [0.1, 0.1],
  });

  const [equilibriumState, setEquilibriumState] = useState({
    Q: 0,
    Kc: 0.0059,
    position: 'equilibrium' as 'left' | 'right' | 'equilibrium',
    shiftDirection: 'none' as 'forward' | 'reverse' | 'none',
    shiftReason: '',
  });

  const [stressHistory, setStressHistory] = useState<Array<{
    type: string;
    action: string;
    timestamp: number;
  }>>([]);

  const prevParamsRef = useRef(params);

  // Get current reaction
  const currentReaction: EquilibriumReaction | undefined = REACTIONS.find(r => r.id === params.reaction);

  // Calculate K at current temperature using Van't Hoff equation
  const calculateKAtTemp = useCallback((baseK: number, deltaH: number, baseTemp: number, currentTemp: number): number => {
    const R = 8.314; // J/(mol·K)
    const deltaHJ = deltaH * 1000; // Convert kJ to J
    const exponent = (-deltaHJ / R) * ((1 / currentTemp) - (1 / baseTemp));
    return baseK * Math.exp(exponent);
  }, []);

  // Calculate reaction quotient Q
  const calculateQ = useCallback((reaction: EquilibriumReaction, concs: typeof concentrations): number => {
    let numerator = 1;
    let denominator = 1;

    // Products in numerator
    concs.products.forEach((c, idx) => {
      const coeff = reaction.productCoeffs[idx] || 1;
      numerator *= Math.pow(Math.max(0.001, c), coeff);
    });

    // Reactants in denominator
    concs.reactants.forEach((c, idx) => {
      const coeff = reaction.reactantCoeffs[idx] || 1;
      denominator *= Math.pow(Math.max(0.001, c), coeff);
    });

    return numerator / denominator;
  }, []);

  // Update equilibrium state
  useEffect(() => {
    if (!currentReaction) return;

    const Kc = calculateKAtTemp(currentReaction.Kc, currentReaction.deltaH, 298, params.temperature);
    const Q = calculateQ(currentReaction, concentrations);

    let shiftDirection: 'forward' | 'reverse' | 'none' = 'none';
    let position: 'left' | 'right' | 'equilibrium' = 'equilibrium';
    let shiftReason = '';

    // Determine shift based on Q vs K
    if (Q < Kc * 0.9) {
      shiftDirection = 'forward';
      position = 'left';
    } else if (Q > Kc * 1.1) {
      shiftDirection = 'reverse';
      position = 'right';
    }

    // Determine reason for shift
    const prevParams = prevParamsRef.current;
    if (prevParams.temperature !== params.temperature) {
      if (params.temperature > prevParams.temperature) {
        shiftReason = currentReaction.deltaH > 0 
          ? 'Temperature ↑: Endothermic reaction shifts FORWARD'
          : 'Temperature ↑: Exothermic reaction shifts REVERSE';
      } else {
        shiftReason = currentReaction.deltaH > 0
          ? 'Temperature ↓: Endothermic reaction shifts REVERSE'
          : 'Temperature ↓: Exothermic reaction shifts FORWARD';
      }
    } else if (prevParams.pressure !== params.pressure && currentReaction.hasGas) {
      const reactantMoles = currentReaction.reactantCoeffs.reduce((a, b) => a + b, 0);
      const productMoles = currentReaction.productCoeffs.reduce((a, b) => a + b, 0);
      if (params.pressure > prevParams.pressure) {
        if (reactantMoles > productMoles) {
          shiftReason = 'Pressure ↑: Shifts toward PRODUCTS (fewer moles)';
        } else if (productMoles > reactantMoles) {
          shiftReason = 'Pressure ↑: Shifts toward REACTANTS (fewer moles)';
        } else {
          shiftReason = 'Pressure ↑: No shift (equal moles on both sides)';
        }
      } else {
        if (reactantMoles > productMoles) {
          shiftReason = 'Pressure ↓: Shifts toward REACTANTS (more moles)';
        } else if (productMoles > reactantMoles) {
          shiftReason = 'Pressure ↓: Shifts toward PRODUCTS (more moles)';
        } else {
          shiftReason = 'Pressure ↓: No shift (equal moles on both sides)';
        }
      }
    }

    prevParamsRef.current = params;

    setEquilibriumState({
      Q,
      Kc,
      position,
      shiftDirection,
      shiftReason,
    });
  }, [params, concentrations, currentReaction, calculateKAtTemp, calculateQ]);

  // Simulate equilibrium shift over time
  useEffect(() => {
    if (!isRunning || !currentReaction) return;

    const interval = setInterval(() => {
      setConcentrations(prev => {
        const newConcs = { ...prev, reactants: [...prev.reactants], products: [...prev.products] };
        const Q = calculateQ(currentReaction, prev);
        const Kc = calculateKAtTemp(currentReaction.Kc, currentReaction.deltaH, 298, params.temperature);

        // Rate of shift
        const shiftRate = 0.002;

        if (Q < Kc * 0.95) {
          // Shift forward: reactants → products
          currentReaction.reactants.forEach((_, idx) => {
            const coeff = currentReaction.reactantCoeffs[idx] || 1;
            newConcs.reactants[idx] = Math.max(0.01, newConcs.reactants[idx] - shiftRate * coeff);
          });
          currentReaction.products.forEach((_, idx) => {
            const coeff = currentReaction.productCoeffs[idx] || 1;
            newConcs.products[idx] = Math.min(3, newConcs.products[idx] + shiftRate * coeff);
          });
        } else if (Q > Kc * 1.05) {
          // Shift reverse: products → reactants
          currentReaction.reactants.forEach((_, idx) => {
            const coeff = currentReaction.reactantCoeffs[idx] || 1;
            newConcs.reactants[idx] = Math.min(3, newConcs.reactants[idx] + shiftRate * coeff);
          });
          currentReaction.products.forEach((_, idx) => {
            const coeff = currentReaction.productCoeffs[idx] || 1;
            newConcs.products[idx] = Math.max(0.01, newConcs.products[idx] - shiftRate * coeff);
          });
        }

        // Apply pressure effect for gas reactions
        if (currentReaction.hasGas && params.pressure !== 1) {
          const reactantMoles = currentReaction.reactantCoeffs.reduce((a, b) => a + b, 0);
          const productMoles = currentReaction.productCoeffs.reduce((a, b) => a + b, 0);
          const pressureEffect = (params.pressure - 1) * 0.0005;

          if (reactantMoles > productMoles) {
            // High pressure favors products
            newConcs.reactants.forEach((_, idx) => {
              newConcs.reactants[idx] = Math.max(0.01, newConcs.reactants[idx] - pressureEffect);
            });
            newConcs.products.forEach((_, idx) => {
              newConcs.products[idx] = Math.min(3, newConcs.products[idx] + pressureEffect);
            });
          } else if (productMoles > reactantMoles) {
            // High pressure favors reactants
            newConcs.reactants.forEach((_, idx) => {
              newConcs.reactants[idx] = Math.min(3, newConcs.reactants[idx] + pressureEffect);
            });
            newConcs.products.forEach((_, idx) => {
              newConcs.products[idx] = Math.max(0.01, newConcs.products[idx] - pressureEffect);
            });
          }
        }

        return newConcs;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isRunning, currentReaction, params, calculateQ, calculateKAtTemp]);

  // Handle adding stress
  const handleAddStress = (type: 'reactant' | 'product', action: 'add' | 'remove', index: number) => {
    const delta = action === 'add' ? 0.2 : -0.15;
    
    setConcentrations(prev => {
      const newConcs = { ...prev, reactants: [...prev.reactants], products: [...prev.products] };
      
      if (type === 'reactant') {
        newConcs.reactants[index] = Math.max(0.01, Math.min(3, (newConcs.reactants[index] || 0) + delta));
      } else {
        newConcs.products[index] = Math.max(0.01, Math.min(3, (newConcs.products[index] || 0) + delta));
      }
      
      return newConcs;
    });

    // Update stress reason
    const speciesName = type === 'reactant' 
      ? currentReaction?.reactants[index] 
      : currentReaction?.products[index];
    
    const reason = action === 'add'
      ? `Added ${speciesName}: System shifts ${type === 'reactant' ? 'FORWARD' : 'REVERSE'}`
      : `Removed ${speciesName}: System shifts ${type === 'reactant' ? 'REVERSE' : 'FORWARD'}`;

    setEquilibriumState(prev => ({ ...prev, shiftReason: reason }));

    setStressHistory(prev => [...prev, {
      type: `${type} (${speciesName})`,
      action: action === 'add' ? 'Added' : 'Removed',
      timestamp: Date.now(),
    }]);
  };

  // Reset simulation
  const handleReset = () => {
    if (!currentReaction) return;
    
    setIsRunning(false);
    setConcentrations({
      reactants: currentReaction.reactants.map(() => 0.5),
      products: currentReaction.products.map(() => 0.1),
    });
    setParams(prev => ({ ...prev, temperature: 298, pressure: 1, volume: 1 }));
    setStressHistory([]);
    setEquilibriumState(prev => ({ ...prev, shiftReason: '' }));
  };

  // Handle reaction change
  useEffect(() => {
    if (!currentReaction) return;
    setConcentrations({
      reactants: currentReaction.reactants.map(() => 0.5),
      products: currentReaction.products.map(() => 0.1),
    });
    setStressHistory([]);
  }, [params.reaction]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const simulationData = {
    simulationId: LeChatelierConfig.id,
    category: LeChatelierConfig.category,
    state: {
      params,
      isRunning,
      equilibriumState,
      concentrations,
    },
    metadata: {
      name: LeChatelierConfig.name,
      objectives: LeChatelierConfig.objectives,
      tags: LeChatelierConfig.tags,
    },
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
              <Scale className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Le Chatelier's Principle</h1>
              <p className="text-xs text-gray-400">Equilibrium & Stress Response</p>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
              isRunning 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-gray-700/50 text-gray-400 border border-gray-600/30'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
              {isRunning ? 'Running' : 'Ready'}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Panel Toggles */}
      <div className="lg:hidden flex gap-2">
        <button
          onClick={() => setMobilePanel(mobilePanel === 'controls' ? 'none' : 'controls')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
            mobilePanel === 'controls'
              ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
              : 'bg-gray-800/80 text-gray-400 border border-gray-700/50 hover:bg-gray-800'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Controls</span>
        </button>
        <button
          onClick={() => setMobilePanel(mobilePanel === 'analytics' ? 'none' : 'analytics')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
            mobilePanel === 'analytics'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'bg-gray-800/80 text-gray-400 border border-gray-700/50 hover:bg-gray-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Analytics</span>
        </button>
      </div>

      {/* Mobile Panel Content */}
      {mobilePanel !== 'none' && (
        <div className="lg:hidden bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-4">
          {mobilePanel === 'controls' && (
            <LeChatelierControls
              params={params}
              onParamsChange={setParams}
              isRunning={isRunning}
              onToggleRun={() => setIsRunning(!isRunning)}
              onReset={handleReset}
              onAddStress={handleAddStress}
            />
          )}
          {mobilePanel === 'analytics' && (
            <LeChatelierAnalytics
              params={params}
              equilibriumState={equilibriumState}
              concentrations={concentrations}
              stressHistory={stressHistory}
            />
          )}
        </div>
      )}

      {/* Main Content Area */}
      <div className={`grid gap-4 transition-all duration-500 ${
        isFullscreen 
          ? 'grid-cols-1' 
          : 'lg:grid-cols-[320px_1fr_320px]'
      }`}>
        
        {/* Left Panel - Controls (Desktop) */}
        {!isFullscreen && (
          <div className="hidden lg:block">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden sticky top-4">
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 px-4 py-3 border-b border-gray-700/50">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-yellow-400" />
                  <h2 className="font-semibold text-white">System Controls</h2>
                </div>
              </div>
              <div className="p-4 max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar">
                <LeChatelierControls
                  params={params}
                  onParamsChange={setParams}
                  isRunning={isRunning}
                  onToggleRun={() => setIsRunning(!isRunning)}
                  onReset={handleReset}
                  onAddStress={handleAddStress}
                />
              </div>
            </div>
          </div>
        )}

        {/* Center - Simulation Canvas */}
        <div className={`${isFullscreen ? 'col-span-1' : ''}`}>
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden">
            {/* Canvas Header */}
            <div className="px-4 py-3 border-b border-gray-700/50 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-blue-400" />
                  <h2 className="font-semibold text-white">Equilibrium Chamber</h2>
                </div>
                <div className="flex items-center gap-3">
                  {/* Q vs K Status (Mini) */}
                  <div className="hidden sm:flex items-center gap-2 text-xs bg-gray-900/50 px-2 py-1 rounded border border-gray-700/50">
                    <span className="text-gray-400">Status:</span>
                    <span className={`${
                      equilibriumState.position === 'left' ? 'text-blue-400' :
                      equilibriumState.position === 'right' ? 'text-red-400' :
                      'text-green-400'
                    }`}>
                      {equilibriumState.position === 'equilibrium' ? 'Equilibrium' : 
                       equilibriumState.position === 'left' ? 'Shifting Left' : 'Shifting Right'}
                    </span>
                  </div>
                  
                  {/* Fullscreen Controls */}
                  {isFullscreen && (
                    <div className="flex items-center gap-1 bg-gray-900/80 rounded-lg p-1 border border-gray-700/50">
                      <button
                        onClick={() => setIsRunning(!isRunning)}
                        className={`p-2 rounded-md transition-all ${
                          isRunning
                            ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                            : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        }`}
                        title={isRunning ? 'Pause' : 'Play'}
                      >
                        {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={handleReset}
                        className="p-2 rounded-md bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white transition-all"
                        title="Reset"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  
                  {/* Expand/Minimize Button */}
                  <button
                    onClick={toggleFullscreen}
                    className={`p-2 rounded-lg transition-all border ${
                      isFullscreen
                        ? 'bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30'
                        : 'bg-gray-700/50 text-gray-300 border-gray-600/50 hover:bg-gray-700 hover:text-white'
                    }`}
                    title={isFullscreen ? 'Exit Fullscreen' : 'Expand'}
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Canvas Content */}
            <div 
              ref={canvasContainerRef}
              className={`${isFullscreen ? 'h-[calc(100vh-140px)]' : 'h-[450px] lg:h-[520px]'} p-2`}
            >
              <LeChatelierCanvas
                params={params}
                isRunning={isRunning}
                equilibriumState={equilibriumState}
                concentrations={concentrations}
              />
            </div>
          </div>
        </div>

        {/* Right Panel - Analytics (Desktop) */}
        {!isFullscreen && (
          <div className="hidden lg:block">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden sticky top-4">
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-4 py-3 border-b border-gray-700/50">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  <h2 className="font-semibold text-white">Real-time Analytics</h2>
                </div>
              </div>
              <div className="p-4 max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar">
                <LeChatelierAnalytics
                  params={params}
                  equilibriumState={equilibriumState}
                  concentrations={concentrations}
                  stressHistory={stressHistory}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Tutor Panel */}
      {!isFullscreen && (
        <div className="mt-4">
          <AITutorPanel simulationData={simulationData} />
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.8);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.8);
        }
      `}</style>
    </div>
  );
};

export default LeChatelierSimulation;
