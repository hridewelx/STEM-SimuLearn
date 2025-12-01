import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Thermometer,
  Gauge,
  FlaskConical,
  Activity,
  Info
} from 'lucide-react';
import { REACTIONS, EquilibriumReaction } from './types';

interface LeChatelierAnalyticsProps {
  params: {
    reaction: string;
    temperature: number;
    pressure: number;
    volume: number;
  };
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
  stressHistory: Array<{
    type: string;
    action: string;
    timestamp: number;
  }>;
}

const LeChatelierAnalytics: React.FC<LeChatelierAnalyticsProps> = ({
  params,
  equilibriumState,
  concentrations,
  stressHistory,
}) => {
  const currentReaction: EquilibriumReaction | undefined = REACTIONS.find(r => r.id === params.reaction);

  const totalReactants = concentrations.reactants.reduce((a, b) => a + b, 0);
  const totalProducts = concentrations.products.reduce((a, b) => a + b, 0);

  const getShiftIcon = () => {
    switch (equilibriumState.shiftDirection) {
      case 'forward':
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      case 'reverse':
        return <TrendingDown className="w-5 h-5 text-red-400" />;
      default:
        return <Minus className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getPositionColor = () => {
    switch (equilibriumState.position) {
      case 'left':
        return 'text-blue-400';
      case 'right':
        return 'text-red-400';
      default:
        return 'text-yellow-400';
    }
  };

  return (
    <div className="space-y-4">
      {/* Equilibrium Status */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Equilibrium Status
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-900/50 rounded p-3">
            <p className="text-xs text-gray-400 mb-1">Reaction Quotient (Q)</p>
            <p className="text-lg font-mono text-cyan-400">
              {equilibriumState.Q.toExponential(3)}
            </p>
          </div>
          <div className="bg-gray-900/50 rounded p-3">
            <p className="text-xs text-gray-400 mb-1">Equilibrium Constant (K)</p>
            <p className="text-lg font-mono text-purple-400">
              {equilibriumState.Kc.toExponential(3)}
            </p>
          </div>
        </div>

        <div className="mt-3 p-3 bg-gray-900/50 rounded flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 mb-1">System Status</p>
            <p className={`font-medium ${getPositionColor()}`}>
              {equilibriumState.Q < equilibriumState.Kc * 0.9 
                ? 'Q < K: Shifting Forward →'
                : equilibriumState.Q > equilibriumState.Kc * 1.1
                ? 'Q > K: Shifting Reverse ←'
                : 'At Equilibrium ⇌'}
            </p>
          </div>
          {getShiftIcon()}
        </div>

        {equilibriumState.shiftReason && (
          <div className="mt-2 p-2 bg-yellow-900/30 rounded border border-yellow-700/50">
            <p className="text-xs text-yellow-300 flex items-center gap-1">
              <Info className="w-3 h-3" />
              {equilibriumState.shiftReason}
            </p>
          </div>
        )}
      </div>

      {/* Concentrations */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <FlaskConical className="w-4 h-4" />
          Concentrations (M)
        </h3>

        <div className="space-y-2">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Reactants</p>
          {currentReaction?.reactants.map((name, idx) => (
            <div key={`r-${idx}`} className="flex items-center justify-between bg-gray-900/50 rounded px-3 py-2">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: currentReaction.colors.reactants[idx] }}
                />
                <span className="text-sm text-gray-300">{name}</span>
              </div>
              <span className="font-mono text-blue-400">
                {(concentrations.reactants[idx] || 0).toFixed(3)}
              </span>
            </div>
          ))}

          <p className="text-xs text-gray-500 uppercase tracking-wide mt-3">Products</p>
          {currentReaction?.products.map((name, idx) => (
            <div key={`p-${idx}`} className="flex items-center justify-between bg-gray-900/50 rounded px-3 py-2">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: currentReaction.colors.products[idx] }}
                />
                <span className="text-sm text-gray-300">{name}</span>
              </div>
              <span className="font-mono text-red-400">
                {(concentrations.products[idx] || 0).toFixed(3)}
              </span>
            </div>
          ))}
        </div>

        {/* Ratio bar */}
        <div className="mt-3">
          <p className="text-xs text-gray-400 mb-1">Reactants ⇌ Products Ratio</p>
          <div className="h-3 bg-gray-700 rounded-full overflow-hidden flex">
            <div 
              className="bg-blue-500 transition-all duration-500"
              style={{ width: `${(totalReactants / Math.max(0.1, totalReactants + totalProducts)) * 100}%` }}
            />
            <div 
              className="bg-red-500 transition-all duration-500"
              style={{ width: `${(totalProducts / Math.max(0.1, totalReactants + totalProducts)) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{((totalReactants / Math.max(0.1, totalReactants + totalProducts)) * 100).toFixed(0)}%</span>
            <span>{((totalProducts / Math.max(0.1, totalReactants + totalProducts)) * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>

      {/* Conditions */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Current Conditions</h3>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400 flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-orange-400" />
              Temperature
            </span>
            <span className="font-mono text-orange-400">{params.temperature} K</span>
          </div>
          
          {currentReaction?.hasGas && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-purple-400" />
                Pressure
              </span>
              <span className="font-mono text-purple-400">{params.pressure} atm</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400 flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-cyan-400" />
              Volume
            </span>
            <span className="font-mono text-cyan-400">{params.volume} L</span>
          </div>
        </div>
      </div>

      {/* Reaction Info */}
      {currentReaction && (
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">Reaction Properties</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Type:</span>
              <span className={currentReaction.deltaH < 0 ? 'text-red-400' : 'text-blue-400'}>
                {currentReaction.deltaH < 0 ? 'Exothermic' : 'Endothermic'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">ΔH:</span>
              <span className="text-gray-300">{currentReaction.deltaH} kJ/mol</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Gas moles (L→R):</span>
              <span className="text-gray-300">
                {currentReaction.reactantCoeffs.reduce((a, b) => a + b, 0)} → {currentReaction.productCoeffs.reduce((a, b) => a + b, 0)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Stress History */}
      {stressHistory.length > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">Recent Stresses</h3>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {stressHistory.slice(-5).reverse().map((stress, idx) => (
              <div key={idx} className="text-xs text-gray-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                {stress.type}: {stress.action}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeChatelierAnalytics;
