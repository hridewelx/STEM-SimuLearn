import { Settings, Eye, Grid3X3, Focus } from 'lucide-react';
import { ConvexLensParams } from './types';

interface ConvexLensControlsProps {
  params: ConvexLensParams;
  onParamsChange: (newParams: Partial<ConvexLensParams>) => void;
}

const ConvexLensControls = ({ params, onParamsChange }: ConvexLensControlsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-bold text-white">Lens Controls</h2>
      </div>

      {/* Object Distance */}
      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Object Distance (u)
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="5"
            max="100"
            step="1"
            value={params.objectDistance}
            onChange={(e) => onParamsChange({ objectDistance: Number(e.target.value) })}
            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <span className="text-blue-300 font-mono text-sm w-16 text-right">
            {params.objectDistance} cm
          </span>
        </div>
      </div>

      {/* Focal Length */}
      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Focal Length (f)
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="5"
            max="50"
            step="1"
            value={params.focalLength}
            onChange={(e) => onParamsChange({ focalLength: Number(e.target.value) })}
            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <span className="text-blue-300 font-mono text-sm w-16 text-right">
            {params.focalLength} cm
          </span>
        </div>
      </div>

      {/* Object Height */}
      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Object Height (h)
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="1"
            max="15"
            step="0.5"
            value={params.objectHeight}
            onChange={(e) => onParamsChange({ objectHeight: Number(e.target.value) })}
            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
          <span className="text-green-300 font-mono text-sm w-16 text-right">
            {params.objectHeight} cm
          </span>
        </div>
      </div>

      {/* Visibility Toggles */}
      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Display Options</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={params.showRays}
              onChange={(e) => onParamsChange({ showRays: e.target.checked })}
              className="w-4 h-4 rounded accent-blue-500"
            />
            <Eye className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">Show Rays</span>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={params.showFocalPoints}
              onChange={(e) => onParamsChange({ showFocalPoints: e.target.checked })}
              className="w-4 h-4 rounded accent-red-500"
            />
            <Focus className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">Show Focal Points</span>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={params.showGrid}
              onChange={(e) => onParamsChange({ showGrid: e.target.checked })}
              className="w-4 h-4 rounded accent-gray-500"
            />
            <Grid3X3 className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">Show Grid</span>
          </label>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 p-4 rounded-xl border border-blue-700/50">
        <h3 className="text-sm font-semibold text-blue-300 mb-3">Quick Positions</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onParamsChange({ objectDistance: params.focalLength * 2, objectHeight: 10 })}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded-lg transition-colors"
          >
            At 2f
          </button>
          <button
            onClick={() => onParamsChange({ objectDistance: params.focalLength, objectHeight: 10 })}
            className="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs rounded-lg transition-colors"
          >
            At f
          </button>
          <button
            onClick={() => onParamsChange({ objectDistance: params.focalLength / 2, objectHeight: 10 })}
            className="px-3 py-2 bg-pink-600 hover:bg-pink-500 text-white text-xs rounded-lg transition-colors"
          >
            Within f
          </button>
          <button
            onClick={() => onParamsChange({ objectDistance: params.focalLength * 3, objectHeight: 10 })}
            className="px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs rounded-lg transition-colors"
          >
            Beyond 2f
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConvexLensControls;
