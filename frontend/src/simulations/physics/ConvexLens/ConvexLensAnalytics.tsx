import { Activity, Ruler, Maximize2, Image as ImageIcon, FlipVertical } from 'lucide-react';
import { ConvexLensParams, ConvexLensAnalyticsData } from './types';

interface ConvexLensAnalyticsProps {
  params: ConvexLensParams;
}

const ConvexLensAnalytics = ({ params }: ConvexLensAnalyticsProps) => {
  // Calculate using lens formula: 1/f = 1/v + 1/u
  const u = -params.objectDistance; // negative for real object
  const f = params.focalLength;
  const v = (f * u) / (u + f); // image distance
  const m = v / u; // magnification
  const imageHeight = m * params.objectHeight;
  
  const analytics: ConvexLensAnalyticsData = {
    imageDistance: v,
    imageHeight: imageHeight,
    magnification: m,
    imageType: v > 0 ? 'real' : 'virtual',
    imageOrientation: m < 0 ? 'inverted' : 'upright',
    lensFormula: `1/${f} = 1/${v.toFixed(1)} + 1/${u}`,
    magnificationFormula: `m = ${v.toFixed(1)}/${u} = ${m.toFixed(2)}`
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-6 h-6 text-green-400" />
        <h2 className="text-xl font-bold text-white">Image Properties</h2>
      </div>

      {/* Image Distance */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <Ruler className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-gray-300">Image Distance (v)</h3>
        </div>
        <p className="text-2xl font-bold text-cyan-400">
          {Math.abs(v).toFixed(2)} cm
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {v > 0 ? 'On opposite side of lens' : 'On same side as object'}
        </p>
      </div>

      {/* Magnification */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <Maximize2 className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-semibold text-gray-300">Magnification (m)</h3>
        </div>
        <p className="text-2xl font-bold text-purple-400">
          {Math.abs(m).toFixed(2)}×
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {Math.abs(m) > 1 ? 'Magnified' : Math.abs(m) < 1 ? 'Diminished' : 'Same size'}
        </p>
      </div>

      {/* Image Type */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <ImageIcon className="w-4 h-4 text-yellow-400" />
          <h3 className="text-sm font-semibold text-gray-300">Image Type</h3>
        </div>
        <p className={`text-xl font-bold ${analytics.imageType === 'real' ? 'text-yellow-400' : 'text-orange-400'}`}>
          {analytics.imageType.toUpperCase()}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {analytics.imageType === 'real' ? 'Can be projected on screen' : 'Cannot be projected'}
        </p>
      </div>

      {/* Orientation */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <FlipVertical className="w-4 h-4 text-pink-400" />
          <h3 className="text-sm font-semibold text-gray-300">Orientation</h3>
        </div>
        <p className={`text-xl font-bold ${analytics.imageOrientation === 'inverted' ? 'text-pink-400' : 'text-green-400'}`}>
          {analytics.imageOrientation.toUpperCase()}
        </p>
      </div>

      {/* Formulas */}
      <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-4 border border-blue-700/50">
        <h3 className="text-sm font-semibold text-blue-300 mb-3">Calculations</h3>
        <div className="space-y-2 text-xs">
          <div>
            <p className="text-gray-400 mb-1">Lens Formula:</p>
            <p className="font-mono text-blue-300">1/f = 1/v + 1/u</p>
            <p className="font-mono text-gray-300 mt-1">{analytics.lensFormula}</p>
          </div>
          <div className="pt-2 border-t border-gray-700">
            <p className="text-gray-400 mb-1">Magnification:</p>
            <p className="font-mono text-purple-300">m = v/u = h'/h</p>
            <p className="font-mono text-gray-300 mt-1">{analytics.magnificationFormula}</p>
          </div>
          <div className="pt-2 border-t border-gray-700">
            <p className="text-gray-400 mb-1">Image Height:</p>
            <p className="font-mono text-green-300">h' = m × h = {imageHeight.toFixed(2)} cm</p>
          </div>
        </div>
      </div>

      {/* Position Summary */}
      <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 rounded-xl p-4 border border-amber-700/50">
        <h3 className="text-sm font-semibold text-amber-300 mb-2">📍 Position Summary</h3>
        <p className="text-xs text-gray-300">
          {params.objectDistance > 2 * f && 
            `Object beyond 2f: Real, inverted, diminished image between f and 2f`}
          {params.objectDistance === 2 * f && 
            `Object at 2f: Real, inverted, same size image at 2f`}
          {params.objectDistance > f && params.objectDistance < 2 * f && 
            `Object between f and 2f: Real, inverted, magnified image beyond 2f`}
          {params.objectDistance === f && 
            `Object at f: Image at infinity (no clear image formed)`}
          {params.objectDistance < f && 
            `Object within f: Virtual, upright, magnified image on same side`}
        </p>
      </div>
    </div>
  );
};

export default ConvexLensAnalytics;
