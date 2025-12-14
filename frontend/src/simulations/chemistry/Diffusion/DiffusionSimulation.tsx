import { useState } from "react";
import DiffusionCanvas from "./DiffusionCanvas";
import DiffusionControls from "./DiffusionControls";
import AITutorPanel from "../../../components/AITutorPanel";
import { DiffusionParams } from "../../types/simulationTypes";
import { defaultDiffusionParams, diffusionConfig } from "./config";
import { useTranslation } from "react-i18next";
import {
  Settings,
  BarChart3,
  Beaker,
  Maximize2,
  Minimize2,
} from "lucide-react";

const DiffusionSimulation = () => {
  const { t } = useTranslation();
  const [params, setParams] = useState<DiffusionParams>(defaultDiffusionParams);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState<"normal" | "slow">("normal");
  const [hasDivider, setHasDivider] = useState(true);
  const [showScale, setShowScale] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<"none" | "controls">("none");

  const handleParamsChange = (newParams: Partial<DiffusionParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };

  const handleReset = () => {
    setIsRunning(false);
    setHasDivider(true);
    setParams(defaultDiffusionParams);
  };

  // Prepare simulation data for AI Tutor
  const simulationData = {
    simulationId: diffusionConfig.id,
    category: diffusionConfig.category,
    state: {
      params,
      isRunning,
      speed,
      hasDivider,
      showScale,
    },
    metadata: {
      name: diffusionConfig.name,
      objectives: diffusionConfig.objectives,
      tags: diffusionConfig.tags,
    },
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-gray-800/95 via-gray-800/90 to-gray-900/95 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-2xl p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Title */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
              <Beaker className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {t("diffusion.title")}
              </h1>
              <p className="text-xs sm:text-sm text-gray-400">
                {t("diffusion.subtitle")}
              </p>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-700/50 border border-gray-600/50">
              <div
                className={`w-2 h-2 rounded-full ${
                  isRunning ? "bg-green-400 animate-pulse" : "bg-gray-400"
                }`}
              />
              <span className="text-xs text-gray-300">
                {isRunning
                  ? t("diffusion.status.running")
                  : t("diffusion.status.paused")}
              </span>
            </div>
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                hasDivider
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "bg-green-500/20 text-green-400 border border-green-500/30"
              }`}
            >
              {hasDivider
                ? t("diffusion.status.divided")
                : t("diffusion.status.mixing")}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Panel Toggle */}
      <div className="lg:hidden">
        <button
          onClick={() =>
            setMobilePanel(mobilePanel === "controls" ? "none" : "controls")
          }
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
            mobilePanel === "controls"
              ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
              : "bg-gray-800/80 text-gray-400 border border-gray-700/50 hover:bg-gray-700 hover:text-white"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>{t("diffusion.controls.title")}</span>
        </button>
      </div>

      {/* Mobile Panel Content */}
      {mobilePanel === "controls" && (
        <div className="lg:hidden">
          <DiffusionControls
            params={params}
            isRunning={isRunning}
            speed={speed}
            hasDivider={hasDivider}
            showScale={showScale}
            onParamsChange={handleParamsChange}
            onToggleRunning={() => setIsRunning(!isRunning)}
            onToggleSpeed={() =>
              setSpeed(speed === "normal" ? "slow" : "normal")
            }
            onToggleDivider={() => setHasDivider(!hasDivider)}
            onToggleScale={() => setShowScale(!showScale)}
            onReset={handleReset}
          />
        </div>
      )}

      {/* Main Content Area */}
      <div
        className={`grid gap-4 transition-all duration-500 ${
          isFullscreen ? "grid-cols-1" : "lg:grid-cols-[1fr_350px]"
        }`}
      >
        {/* Canvas Area */}
        <div className={`${isFullscreen ? "col-span-1" : ""}`}>
          <div className="bg-gradient-to-br from-gray-800/70 via-gray-800/60 to-gray-900/70 backdrop-blur-md rounded-2xl border border-gray-700/60 shadow-2xl overflow-hidden">
            {/* Canvas Header */}
            <div className="px-4 py-3 border-b border-gray-700/50 bg-gradient-to-r from-blue-500/15 via-blue-500/10 to-cyan-500/15">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-300" />
                  <h2 className="font-bold text-white tracking-wide">
                    {t("diffusion.chamber.title")}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 hidden sm:inline">
                    {t("diffusion.controls.speed.label")}:{" "}
                    <span className="text-white font-medium">
                      {speed === "normal"
                        ? t("diffusion.controls.speed.normal")
                        : t("diffusion.controls.speed.slow")}
                    </span>
                  </span>
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className={`p-2 rounded-lg transition-all border ${
                      isFullscreen
                        ? "bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30"
                        : "bg-gray-700/50 text-gray-300 border-gray-600/50 hover:bg-gray-700 hover:text-white"
                    }`}
                    title={isFullscreen ? "Exit Fullscreen" : "Expand"}
                  >
                    {isFullscreen ? (
                      <Minimize2 className="w-4 h-4" />
                    ) : (
                      <Maximize2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Canvas Content */}
            <div
              className={`${
                isFullscreen ? "h-[calc(100vh-200px)]" : "min-h-[500px]"
              } p-4 flex items-center justify-center overflow-auto`}
            >
              <DiffusionCanvas
                params={params}
                isRunning={isRunning}
                speed={speed}
                hasDivider={hasDivider}
                showScale={showScale}
                onReset={handleReset}
              />
            </div>
          </div>
        </div>

        {/* Controls Panel - Desktop */}
        {!isFullscreen && (
          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-md rounded-2xl border border-gray-700/60 shadow-2xl overflow-hidden sticky top-4">
              <div className="bg-gradient-to-r from-yellow-500/15 to-orange-500/15 px-4 py-3 border-b border-gray-700/60">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-yellow-300" />
                  <h2 className="font-bold text-white">
                    {t("diffusion.controls.title")}
                  </h2>
                </div>
              </div>
              <div className="p-4 max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar">
                <DiffusionControls
                  params={params}
                  isRunning={isRunning}
                  speed={speed}
                  hasDivider={hasDivider}
                  showScale={showScale}
                  onParamsChange={handleParamsChange}
                  onToggleRunning={() => setIsRunning(!isRunning)}
                  onToggleSpeed={() =>
                    setSpeed(speed === "normal" ? "slow" : "normal")
                  }
                  onToggleDivider={() => setHasDivider(!hasDivider)}
                  onToggleScale={() => setShowScale(!showScale)}
                  onReset={handleReset}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Tutor */}
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

export default DiffusionSimulation;
