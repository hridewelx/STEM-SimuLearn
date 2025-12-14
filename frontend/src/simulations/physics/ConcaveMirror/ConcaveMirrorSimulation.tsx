import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ConcaveMirrorCanvas from "./ConcaveMirrorCanvas";
import ConcaveMirrorControls from "./ConcaveMirrorControls";
import ConcaveMirrorAnalytics from "./ConcaveMirrorAnalytics";
import { ConcaveMirrorParams } from "./types";
import { defaultConcaveMirrorParams } from "./config";
import { useTranslation } from "react-i18next";

const ConcaveMirrorSimulation = () => {
  const { t } = useTranslation();
  const [params, setParams] = useState<ConcaveMirrorParams>(
    defaultConcaveMirrorParams
  );
  const [showControls, setShowControls] = useState(true);
  const [showAnalytics, setShowAnalytics] = useState(true);

  const handleParamsChange = (newParams: Partial<ConcaveMirrorParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };

  return (
    <div className="h-[calc(100vh-8rem)] relative bg-gray-900 rounded-xl">
      {/* Canvas - Full Screen */}
      <div className="w-full h-full p-6 flex items-center justify-center">
        <ConcaveMirrorCanvas params={params} />
      </div>

      {/* Controls Panel - Top Left */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
          <button
            onClick={() => setShowControls(!showControls)}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-between transition-colors"
          >
            <span>{t("concaveMirror.panels.controls")}</span>
            {showControls ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {showControls && (
            <div className="max-h-[70vh] overflow-y-auto p-4 w-80">
              <ConcaveMirrorControls
                params={params}
                onParamsChange={handleParamsChange}
              />
            </div>
          )}
        </div>
      </div>

      {/* Analytics Panel - Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center justify-between transition-colors"
          >
            <span>{t("concaveMirror.panels.analytics")}</span>
            {showAnalytics ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {showAnalytics && (
            <div className="max-h-[70vh] overflow-y-auto p-4 w-80">
              <ConcaveMirrorAnalytics params={params} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConcaveMirrorSimulation;
