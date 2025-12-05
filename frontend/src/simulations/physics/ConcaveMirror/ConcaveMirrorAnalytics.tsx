import React from 'react';
import { ConcaveMirrorParams } from './types';
import { Activity, Ruler, Maximize2, ImageIcon, FlipVertical } from 'lucide-react';

interface ConcaveMirrorAnalyticsProps {
  params: ConcaveMirrorParams;
}

const ConcaveMirrorAnalytics: React.FC<ConcaveMirrorAnalyticsProps> = ({ params }) => {
  // Mirror formula: 1/f = 1/v + 1/u
  // Using sign convention: u is negative, f is negative for concave mirror
  const u = -params.objectDistance;
  const f = -params.focalLength;
  const v = (f * u) / (u - f);
  
  const magnification = -v / u;
  const imageHeight = magnification * params.objectHeight;
  
  // Determine image type
  const isReal = v < 0;
  const isAtInfinity = Math.abs(v) > 500 || !isFinite(v);
  
  // Determine orientation
  const isInverted = magnification < 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-green-400" />
        <h3 className="text-xl font-bold text-white">Image Analytics</h3>
      </div>

      {/* Image Properties */}
      <div className="grid grid-cols-2 gap-4">
        {/* Image Distance */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Ruler className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-gray-400">Image Distance (v)</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {isAtInfinity ? '∞' : `${Math.abs(v).toFixed(1)} cm`}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {isAtInfinity ? 'At infinity' : isReal ? 'In front of mirror' : 'Behind mirror'}
          </p>
        </div>

        {/* Magnification */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Maximize2 className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-gray-400">Magnification (m)</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {isAtInfinity ? '∞' : `${magnification.toFixed(2)}×`}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {Math.abs(magnification) > 1 ? 'Enlarged' : Math.abs(magnification) === 1 ? 'Same size' : 'Diminished'}
          </p>
        </div>

        {/* Image Type */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <ImageIcon className="w-4 h-4 text-green-400" />
            <span className="text-xs text-gray-400">Image Type</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {isAtInfinity ? 'No Image' : isReal ? 'Real' : 'Virtual'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {isAtInfinity ? 'Formed at infinity' : isReal ? 'Can be projected' : 'Cannot be projected'}
          </p>
        </div>

        {/* Orientation */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <FlipVertical className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-gray-400">Orientation</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {isAtInfinity ? '-' : isInverted ? 'Inverted' : 'Erect'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {isAtInfinity ? 'Not applicable' : isInverted ? 'Upside down' : 'Upright'}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700"></div>

      {/* Formulas */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-400">Mirror Formula</h4>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-center space-y-2">
            <p className="text-lg font-mono text-blue-400">1/f = 1/v + 1/u</p>
            <p className="text-sm text-gray-400">
              f = {f.toFixed(1)} cm, u = {u.toFixed(1)} cm
            </p>
            <p className="text-sm text-green-400">
              v = {isAtInfinity ? '∞' : `${v.toFixed(1)} cm`}
            </p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-center space-y-2">
            <p className="text-lg font-mono text-purple-400">m = -v/u = h'/h</p>
            <p className="text-sm text-gray-400">
              Image height (h') = {isAtInfinity ? '∞' : `${imageHeight.toFixed(1)} cm`}
            </p>
            <p className="text-sm text-green-400">
              m = {isAtInfinity ? '∞' : magnification.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700"></div>

      {/* Position Summary */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-400">Position Summary</h4>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 space-y-2">
          <p className="text-sm text-white font-medium">
            Object Position: {' '}
            {params.objectDistance > 2 * params.focalLength
              ? 'Beyond C (u > 2f)'
              : params.objectDistance === 2 * params.focalLength
              ? 'At C (u = 2f)'
              : params.objectDistance > params.focalLength
              ? 'Between C and F'
              : params.objectDistance === params.focalLength
              ? 'At F (u = f)'
              : 'Between F and Mirror'}
          </p>
          
          <div className="text-xs text-gray-400 space-y-1">
            {params.objectDistance > 2 * params.focalLength && (
              <>
                <p>• Image forms between F and C</p>
                <p>• Real, inverted, and diminished</p>
                <p>• Example: Photography, telescopes</p>
              </>
            )}
            
            {params.objectDistance === 2 * params.focalLength && (
              <>
                <p>• Image forms at C</p>
                <p>• Real, inverted, same size</p>
                <p>• Object and image at same distance</p>
              </>
            )}
            
            {params.objectDistance > params.focalLength &&
              params.objectDistance < 2 * params.focalLength && (
                <>
                  <p>• Image forms beyond C</p>
                  <p>• Real, inverted, and enlarged</p>
                  <p>• Used in solar furnaces</p>
                </>
              )}
            
            {params.objectDistance === params.focalLength && (
              <>
                <p>• Image at infinity</p>
                <p>• Real, highly enlarged</p>
                <p>• Used in searchlights, headlights</p>
              </>
            )}
            
            {params.objectDistance < params.focalLength && (
              <>
                <p>• Image behind mirror</p>
                <p>• Virtual, erect, and enlarged</p>
                <p>• Used in shaving mirrors, dental mirrors</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sign Convention Reminder */}
      <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
        <p className="text-xs text-blue-300 font-medium mb-2">📌 Sign Convention</p>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>• Distances measured from mirror pole</li>
          <li>• Object distance (u) is negative</li>
          <li>• Focal length (f) is negative for concave</li>
          <li>• Real images: v is negative (in front)</li>
          <li>• Virtual images: v is positive (behind)</li>
        </ul>
      </div>
    </div>
  );
};

export default ConcaveMirrorAnalytics;
