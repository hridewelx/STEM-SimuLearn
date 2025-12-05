import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ConvexLensCanvas from './ConvexLensCanvas';
import ConvexLensControls from './ConvexLensControls';
import ConvexLensAnalytics from './ConvexLensAnalytics';
import { ConvexLensParams } from './types';
import { defaultConvexLensParams } from './config';

const ConvexLensSimulation = () => {
  const [params, setParams] = useState<ConvexLensParams>(defaultConvexLensParams);
  const [showSidebar, setShowSidebar] = useState(true);

  const handleParamsChange = (newParams: Partial<ConvexLensParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };

  return (
    <div className="flex gap-4 h-[calc(100vh-8rem)] relative">
      {/* Collapsible Sidebar */}
      <div
        className={`bg-gray-900 rounded-xl transition-all duration-300 overflow-hidden flex-shrink-0 ${
          showSidebar ? 'w-80' : 'w-0'
        }`}
      >
        <div className="w-80 h-full overflow-y-auto p-6 space-y-6">
          <ConvexLensControls params={params} onParamsChange={handleParamsChange} />
          <div className="border-t border-gray-700 pt-6">
            <ConvexLensAnalytics params={params} />
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-r-lg transition-all shadow-lg"
        style={{ left: showSidebar ? '20rem' : '0' }}
      >
        {showSidebar ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </button>

      {/* Canvas - Full Width */}
      <div className="flex-1 bg-gray-900 rounded-xl p-6 flex items-center justify-center">
        <ConvexLensCanvas params={params} />
      </div>
    </div>
  );
};

export default ConvexLensSimulation;
