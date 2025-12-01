import { Play, Pause, RotateCcw, Flame, AlertTriangle, Beaker } from 'lucide-react';
import { ReactionLabParams, ReactionType } from './types';
import {
  COMBINATION_ELEMENTS_A,
  COMBINATION_ELEMENTS_B,
  DECOMPOSITION_COMPOUNDS,
  ACIDS,
  BASES,
  REPLACEMENT_ELEMENTS,
  REPLACEMENT_COMPOUNDS,
  ReactionLabEngine,
} from './reactionLabDatabase';

interface ReactionLabControlsProps {
  params: ReactionLabParams;
  isRunning: boolean;
  onParamsChange: (newParams: Partial<ReactionLabParams>) => void;
  onToggleRunning: () => void;
  onReset: () => void;
}

const ReactionLabControls = ({
  params,
  isRunning,
  onParamsChange,
  onToggleRunning,
  onReset,
}: ReactionLabControlsProps) => {
  const reactionTypes: { value: ReactionType; label: string; description: string; icon: string }[] = [
    { value: 'composition', label: 'Composition', description: 'A + B → AB', icon: '🔗' },
    { value: 'decomposition', label: 'Decomposition', description: 'AB → A + B', icon: '💥' },
    { value: 'acidBase', label: 'Acid-Base', description: 'Acid + Base → Salt + Water', icon: '⚗️' },
    { value: 'singleReplacement', label: 'Single Replacement', description: 'A + BC → AC + B', icon: '🔄' },
  ];

  const getReactants = (): [string, string] => {
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
  };

  const getReaction = () => {
    const [reactant1, reactant2] = getReactants();
    if (params.reactionType === 'decomposition') {
      return ReactionLabEngine.getReaction(params.reactionType, reactant1);
    }
    return ReactionLabEngine.getReaction(params.reactionType, reactant1, reactant2);
  };

  const reaction = getReaction();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Beaker className="w-6 h-6 text-yellow-400" />
        <h2 className="text-xl font-bold text-white">Reaction Controls</h2>
      </div>

      {/* Reaction Type Selector */}
      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
        <h3 className="text-sm font-semibold text-yellow-400 mb-3">Reaction Type</h3>
        <div className="space-y-2">
          {reactionTypes.map((type) => (
            <label
              key={type.value}
              className={`
                flex items-start gap-3 cursor-pointer p-3 rounded-lg transition-all
                ${params.reactionType === type.value 
                  ? 'bg-yellow-500/20 border border-yellow-500/50' 
                  : 'hover:bg-gray-700 border border-transparent'
                }
              `}
            >
              <input
                type="radio"
                name="reactionType"
                value={type.value}
                checked={params.reactionType === type.value}
                onChange={(e) => onParamsChange({ reactionType: e.target.value as ReactionType })}
                className="mt-1 accent-yellow-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{type.icon}</span>
                  <span className="text-white font-medium">{type.label}</span>
                </div>
                <div className="text-gray-400 text-xs font-mono mt-1">{type.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Reactants Selection */}
      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
        <h3 className="text-sm font-semibold text-cyan-400 mb-3">Select Reactants</h3>

        {/* Composition */}
        {params.reactionType === 'composition' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Element A</label>
              <select
                value={params.elementA || ''}
                onChange={(e) => onParamsChange({ elementA: e.target.value })}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="">Select Element A</option>
                {COMBINATION_ELEMENTS_A.map((el) => (
                  <option key={el.symbol} value={el.symbol}>
                    {el.symbol} - {el.name} ({el.molarMass} g/mol)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Element B</label>
              <select
                value={params.elementB || ''}
                onChange={(e) => onParamsChange({ elementB: e.target.value })}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="">Select Element B</option>
                {COMBINATION_ELEMENTS_B.map((el) => (
                  <option key={el.symbol} value={el.symbol}>
                    {el.symbol} - {el.name} ({el.molarMass} g/mol)
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Decomposition */}
        {params.reactionType === 'decomposition' && (
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Compound</label>
            <select
              value={params.compound || ''}
              onChange={(e) => onParamsChange({ compound: e.target.value })}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="">Select Compound</option>
              {DECOMPOSITION_COMPOUNDS.map((compound) => (
                <option key={compound.symbol} value={compound.symbol}>
                  {compound.symbol} - {compound.name} ({compound.molarMass} g/mol)
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Acid-Base */}
        {params.reactionType === 'acidBase' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Acid 🔴</label>
              <select
                value={params.acid || ''}
                onChange={(e) => onParamsChange({ acid: e.target.value })}
                className="w-full px-3 py-2 bg-gray-900 border border-red-900/50 rounded-lg text-white text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Select Acid</option>
                {ACIDS.map((acid) => (
                  <option key={acid.symbol} value={acid.symbol}>
                    {acid.symbol} - {acid.name} ({acid.molarMass} g/mol)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Base 🔵</label>
              <select
                value={params.base || ''}
                onChange={(e) => onParamsChange({ base: e.target.value })}
                className="w-full px-3 py-2 bg-gray-900 border border-blue-900/50 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Base</option>
                {BASES.map((base) => (
                  <option key={base.symbol} value={base.symbol}>
                    {base.symbol} - {base.name} ({base.molarMass} g/mol)
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Single Replacement */}
        {params.reactionType === 'singleReplacement' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Free Element (Metal)</label>
              <select
                value={params.element || ''}
                onChange={(e) => onParamsChange({ element: e.target.value })}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="">Select Element</option>
                {REPLACEMENT_ELEMENTS.map((el) => (
                  <option key={el.symbol} value={el.symbol}>
                    {el.symbol} - {el.name} (Reactivity: {el.reactivity})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Compound</label>
              <select
                value={params.compoundForReplacement || ''}
                onChange={(e) => onParamsChange({ compoundForReplacement: e.target.value })}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="">Select Compound</option>
                {REPLACEMENT_COMPOUNDS.map((compound) => (
                  <option key={compound.symbol} value={compound.symbol}>
                    {compound.symbol} - {compound.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-2">
              <p className="text-blue-300 text-xs">
                💡 Higher reactivity number = more reactive. Element must be MORE reactive than the metal in the compound.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Quantity Controls */}
      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
        <h3 className="text-sm font-semibold text-purple-400 mb-3">Quantities (grams)</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">Reactant 1</span>
              <span className="text-purple-300 font-mono">{params.reactant1Amount} g</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={params.reactant1Amount}
              onChange={(e) => onParamsChange({ reactant1Amount: Number(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
          {params.reactionType !== 'decomposition' && (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Reactant 2</span>
                <span className="text-purple-300 font-mono">{params.reactant2Amount} g</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={params.reactant2Amount}
                onChange={(e) => onParamsChange({ reactant2Amount: Number(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>
          )}
        </div>
      </div>

      {/* Temperature Control */}
      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
        <h3 className="text-sm font-semibold text-orange-400 mb-3">Temperature</h3>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">Reaction Speed</span>
          <span className="text-orange-300 font-mono">{params.temperature}°C</span>
        </div>
        <input
          type="range"
          min="20"
          max="200"
          value={params.temperature}
          onChange={(e) => onParamsChange({ temperature: Number(e.target.value) })}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Cold</span>
          <span>Hot</span>
        </div>
      </div>

      {/* Reaction Status */}
      {reaction && (
        <div
          className={`p-4 rounded-xl border ${
            reaction.valid 
              ? 'bg-green-900/20 border-green-700' 
              : 'bg-red-900/20 border-red-700'
          }`}
        >
          <div className="flex items-start gap-2">
            {reaction.valid ? (
              <Flame className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <div className={`font-medium text-sm ${reaction.valid ? 'text-green-300' : 'text-red-300'}`}>
                {reaction.valid ? 'Reaction Possible!' : 'No Reaction'}
              </div>
              <div className="font-mono text-xs mt-1 text-gray-300 break-all">
                {reaction.equation || 'Select reactants to see equation'}
              </div>
              {reaction.errorMessage && (
                <p className="text-xs text-red-400 mt-2">{reaction.errorMessage}</p>
              )}
              {reaction.warning && (
                <p className="text-xs text-amber-400 mt-2">⚠️ {reaction.warning}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onToggleRunning}
          disabled={!reaction?.valid}
          className={`
            flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all
            ${reaction?.valid
              ? isRunning
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-green-600 hover:bg-green-500 text-white'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {isRunning ? (
            <>
              <Pause className="w-5 h-5" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              <span>Start Reaction</span>
            </>
          )}
        </button>
        <button
          onClick={onReset}
          className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ReactionLabControls;
