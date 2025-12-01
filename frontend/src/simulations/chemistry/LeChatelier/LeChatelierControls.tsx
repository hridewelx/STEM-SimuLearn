import React from 'react';
import { 
  Thermometer, 
  Gauge, 
  FlaskConical, 
  Plus, 
  Minus,
  RotateCcw,
  Zap,
  Info
} from 'lucide-react';
import { REACTIONS, EquilibriumReaction } from './types';

interface LeChatelierControlsProps {
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
  onParamsChange: (params: any) => void;
  isRunning: boolean;
  onToggleRun: () => void;
  onReset: () => void;
  onAddStress: (type: 'reactant' | 'product', action: 'add' | 'remove', index: number) => void;
}

const LeChatelierControls: React.FC<LeChatelierControlsProps> = ({
  params,
  onParamsChange,
  isRunning,
  onToggleRun,
  onReset,
  onAddStress,
}) => {
  const currentReaction: EquilibriumReaction | undefined = REACTIONS.find(r => r.id === params.reaction);

  const handleReactionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newReaction = REACTIONS.find(r => r.id === e.target.value);
    if (newReaction) {
      onParamsChange({
        ...params,
        reaction: e.target.value,
        reactant1Conc: 0.5,
        reactant2Conc: newReaction.reactants.length > 1 ? 0.5 : 0,
        product1Conc: 0.1,
        product2Conc: newReaction.products.length > 1 ? 0.1 : 0,
        temperature: 298,
        pressure: 1,
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Reaction Selection */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
          <FlaskConical className="w-4 h-4" />
          Equilibrium Reaction
        </label>
        <select
          value={params.reaction}
          onChange={handleReactionChange}
          className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm border border-gray-600 focus:border-blue-500 focus:outline-none"
        >
          {REACTIONS.map(reaction => (
            <option key={reaction.id} value={reaction.id}>
              {reaction.name}
            </option>
          ))}
        </select>
        
        {currentReaction && (
          <div className="mt-3 p-3 bg-gray-900/50 rounded-lg">
            <p className="text-cyan-400 font-mono text-sm mb-2">{currentReaction.equation}</p>
            <p className="text-xs text-gray-400">{currentReaction.description}</p>
            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className={`px-2 py-0.5 rounded ${currentReaction.deltaH < 0 ? 'bg-red-900/50 text-red-300' : 'bg-blue-900/50 text-blue-300'}`}>
                {currentReaction.deltaH < 0 ? 'Exothermic' : 'Endothermic'}
              </span>
              <span className="text-gray-500">ΔH = {currentReaction.deltaH} kJ/mol</span>
            </div>
          </div>
        )}
      </div>

      {/* Temperature Control */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
          <Thermometer className="w-4 h-4 text-orange-400" />
          Temperature
        </label>
        <input
          type="range"
          min="200"
          max="600"
          step="10"
          value={params.temperature}
          onChange={(e) => onParamsChange({ ...params, temperature: Number(e.target.value) })}
          className="w-full h-2 bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>200 K</span>
          <span className="text-white font-medium">{params.temperature} K ({(params.temperature - 273).toFixed(0)}°C)</span>
          <span>600 K</span>
        </div>
        {currentReaction && (
          <p className="text-xs text-gray-500 mt-2">
            <Info className="w-3 h-3 inline mr-1" />
            {currentReaction.deltaH > 0 
              ? 'Heating shifts equilibrium RIGHT (→)' 
              : 'Heating shifts equilibrium LEFT (←)'}
          </p>
        )}
      </div>

      {/* Pressure Control (only for gas reactions) */}
      {currentReaction?.hasGas && (
        <div className="bg-gray-800/50 rounded-lg p-4">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Gauge className="w-4 h-4 text-purple-400" />
            Pressure
          </label>
          <input
            type="range"
            min="0.5"
            max="10"
            step="0.5"
            value={params.pressure}
            onChange={(e) => onParamsChange({ ...params, pressure: Number(e.target.value) })}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0.5 atm</span>
            <span className="text-white font-medium">{params.pressure} atm</span>
            <span>10 atm</span>
          </div>
          {currentReaction && (
            <p className="text-xs text-gray-500 mt-2">
              <Info className="w-3 h-3 inline mr-1" />
              {(() => {
                const reactantMoles = currentReaction.reactantCoeffs.reduce((a, b) => a + b, 0);
                const productMoles = currentReaction.productCoeffs.reduce((a, b) => a + b, 0);
                if (reactantMoles > productMoles) {
                  return 'Higher pressure shifts RIGHT (→) (fewer moles)';
                } else if (reactantMoles < productMoles) {
                  return 'Higher pressure shifts LEFT (←) (fewer moles)';
                } else {
                  return 'Pressure has no effect (equal moles)';
                }
              })()}
            </p>
          )}
        </div>
      )}

      {/* Concentration Controls */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
          <Zap className="w-4 h-4 text-yellow-400" />
          Apply Stress (Concentration)
        </label>
        
        {/* Reactants */}
        <div className="space-y-2 mb-3">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Reactants</p>
          {currentReaction?.reactants.map((reactant, idx) => (
            <div key={`reactant-${idx}`} className="flex items-center justify-between bg-gray-900/50 rounded px-3 py-2">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: currentReaction.colors.reactants[idx] || '#888' }}
                />
                <span className="text-sm text-gray-300">{reactant}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onAddStress('reactant', 'remove', idx)}
                  className="p-1.5 bg-red-900/50 hover:bg-red-800 rounded text-red-300 transition-colors"
                  title="Remove"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onAddStress('reactant', 'add', idx)}
                  className="p-1.5 bg-green-900/50 hover:bg-green-800 rounded text-green-300 transition-colors"
                  title="Add"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Products */}
        <div className="space-y-2">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Products</p>
          {currentReaction?.products.map((product, idx) => (
            <div key={`product-${idx}`} className="flex items-center justify-between bg-gray-900/50 rounded px-3 py-2">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: currentReaction.colors.products[idx] || '#888' }}
                />
                <span className="text-sm text-gray-300">{product}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onAddStress('product', 'remove', idx)}
                  className="p-1.5 bg-red-900/50 hover:bg-red-800 rounded text-red-300 transition-colors"
                  title="Remove"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onAddStress('product', 'add', idx)}
                  className="p-1.5 bg-green-900/50 hover:bg-green-800 rounded text-green-300 transition-colors"
                  title="Add"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onToggleRun}
          className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
            isRunning
              ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={onReset}
          className="py-2.5 px-4 rounded-lg font-medium bg-gray-700 hover:bg-gray-600 text-white transition-all flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
};

export default LeChatelierControls;
