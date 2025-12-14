import { useState, useCallback } from "react";
import {
  Settings,
  BarChart3,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RotateCcw,
  Scale,
} from "lucide-react";
import LeChatelierCanvas from "./LeChatelierCanvas.tsx";
import LeChatelierControls from "./LeChatelierControls";
import LeChatelierAnalytics from "./LeChatelierAnalytics";
import AITutorPanel from "../../../components/AITutorPanel";
import { LeChatelierParams, LeChatelierAnalyticsData } from "./types";
import { defaultLeChatelierParams, LeChatelierConfig } from "./config";
import { useTranslation } from "react-i18next";

const LeChatelierSimulation = () => {
  const { t } = useTranslation();
  const [params, setParams] = useState<LeChatelierParams>(
    defaultLeChatelierParams
  );
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<
    "none" | "controls" | "analytics"
  >("none");
  const [analytics, setAnalytics] = useState<LeChatelierAnalyticsData>({
    reactantCount: 50,
    productCount: 50,
    totalParticles: 100,
    equilibriumConstant: 1,
    reactionQuotient: 1,
    shiftDirection: "none",
    forwardReactionRate: 0.02,
    reverseReactionRate: 0.02,
    temperature: 300,
    pressure: 1,
    percentReactants: 50,
    percentProducts: 50,
    isAtEquilibrium: true,
  });

  const handleParamsChange = (newParams: Partial<LeChatelierParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };

  const handleReset = () => {
    setIsRunning(false);
    setParams(defaultLeChatelierParams);
    setAnalytics({
      reactantCount: 50,
      productCount: 50,
      totalParticles: 100,
      equilibriumConstant: 1,
      reactionQuotient: 1,
      shiftDirection: "none",
      forwardReactionRate: 0.02,
      reverseReactionRate: 0.02,
      temperature: 300,
      pressure: 1,
      percentReactants: 50,
      percentProducts: 50,
      isAtEquilibrium: true,
    });
  };

  const handleAnalyticsUpdate = useCallback(
    (data: LeChatelierAnalyticsData) => {
      setAnalytics(data);
    },
    []
  );

  const simulationData = {
    simulationId: LeChatelierConfig.id,
    category: LeChatelierConfig.category,
    state: {
      params,
      isRunning,
      analytics,
    },
    metadata: {
      name: t(`simulations.${LeChatelierConfig.id}.name`), // Use translated name
      objectives: t(`simulations.${LeChatelierConfig.id}.objectives`, {
        returnObjects: true,
      }) as string[], // Use translated objectives
      tags: LeChatelierConfig.tags,
    },
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-gray-800/95 via-gray-800/90 to-gray-900/95 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-2xl p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Title */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-purple-400/40 shadow-lg">
              <Scale className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                {t("leChatelier.title")}
              </h2>
              <p className="text-xs text-gray-300 font-medium">
                {t("leChatelier.subtitle")}
              </p>
            </div>
          </div>

          {/* Status Indicator - MORE PROMINENT */}
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                isRunning
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-gray-700/50 text-gray-400 border border-gray-600/30"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isRunning ? "bg-green-400 animate-pulse" : "bg-gray-500"
                }`}
              />
              {isRunning
                ? t("leChatelier.status.running")
                : t("leChatelier.status.ready")}
            </div>

            {/* LARGE PROMINENT STATUS */}
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                analytics.shiftDirection === "forward"
                  ? "bg-gradient-to-r from-orange-500/30 to-amber-500/30 text-orange-300 border-2 border-orange-500/50 shadow-lg shadow-orange-500/20 animate-pulse"
                  : analytics.shiftDirection === "reverse"
                  ? "bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-blue-300 border-2 border-blue-500/50 shadow-lg shadow-blue-500/20 animate-pulse"
                  : "bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/50"
              }`}
            >
              {analytics.shiftDirection === "forward" ? (
                <>
                  <span className="text-lg">→</span>
                  <span>{t("leChatelier.analytics.shiftingProducts")}</span>
                </>
              ) : analytics.shiftDirection === "reverse" ? (
                <>
                  <span className="text-lg">←</span>
                  <span>{t("leChatelier.analytics.shiftingReactants")}</span>
                </>
              ) : (
                <>
                  <span className="text-lg">⇌</span>
                  <span>{t("leChatelier.analytics.atEquilibrium")}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Panel Toggles */}
      <div className="lg:hidden flex gap-2">
        <button
          onClick={() =>
            setMobilePanel(mobilePanel === "controls" ? "none" : "controls")
          }
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
            mobilePanel === "controls"
              ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
              : "bg-gray-800/80 text-gray-400 border border-gray-700/50 hover:bg-gray-700 hover:text-white"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>{t("leChatelier.panels.controls")}</span>
        </button>
        <button
          onClick={() =>
            setMobilePanel(mobilePanel === "analytics" ? "none" : "analytics")
          }
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
            mobilePanel === "analytics"
              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
              : "bg-gray-800/80 text-gray-400 border border-gray-700/50 hover:bg-gray-700 hover:text-white"
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>{t("leChatelier.panels.analytics")}</span>
        </button>
      </div>

      {/* Mobile Panel Content */}
      {mobilePanel !== "none" && (
        <div className="lg:hidden bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-4">
          {mobilePanel === "controls" && (
            <LeChatelierControls
              params={params}
              isRunning={isRunning}
              onParamsChange={handleParamsChange}
              onToggleRunning={() => setIsRunning(!isRunning)}
              onReset={handleReset}
            />
          )}
          {mobilePanel === "analytics" && (
            <LeChatelierAnalytics analytics={analytics} />
          )}
        </div>
      )}

      {/* Main Content Area */}
      <div
        className={`grid gap-4 transition-all duration-500 ${
          isFullscreen ? "grid-cols-1" : "lg:grid-cols-[320px_1fr_320px]"
        }`}
      >
        {/* Left Panel - Controls (Desktop) */}
        {!isFullscreen && (
          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-md rounded-2xl border border-gray-700/60 shadow-2xl overflow-hidden sticky top-4">
              <div className="bg-gradient-to-r from-yellow-500/15 to-orange-500/15 px-4 py-3 border-b border-gray-700/60">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-yellow-300" />
                  <h2 className="font-bold text-white">
                    {t("leChatelier.panels.controls")}
                  </h2>
                </div>
              </div>
              <div className="p-4 max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar">
                <LeChatelierControls
                  params={params}
                  isRunning={isRunning}
                  onParamsChange={handleParamsChange}
                  onToggleRunning={() => setIsRunning(!isRunning)}
                  onReset={handleReset}
                />
              </div>
            </div>
          </div>
        )}

        {/* Center - Simulation Canvas */}
        <div className={`${isFullscreen ? "col-span-1" : ""}`}>
          <div className="bg-gradient-to-br from-gray-800/70 via-gray-800/60 to-gray-900/70 backdrop-blur-md rounded-2xl border border-gray-700/60 shadow-2xl overflow-y-auto custom-scrollbar">
            {/* Canvas Header */}
            <div className="px-4 py-3 border-b border-gray-700/50 bg-gradient-to-r from-purple-500/15 via-purple-500/10 to-pink-500/15">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-purple-300" />
                  <h2 className="font-bold text-white tracking-wide">
                    {t("leChatelier.canvas.title")}
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  {/* Equilibrium Status */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-400 hidden sm:inline">
                      {t("leChatelier.canvas.statusLabel")}
                    </span>
                    <span
                      className={`font-medium px-2 py-1 rounded-md ${
                        analytics.shiftDirection === "forward"
                          ? "text-orange-300 bg-orange-500/20"
                          : analytics.shiftDirection === "reverse"
                          ? "text-blue-300 bg-blue-500/20"
                          : "text-green-300 bg-green-500/20"
                      }`}
                    >
                      {analytics.shiftDirection === "forward"
                        ? `→ ${t("leChatelier.status.right")}`
                        : analytics.shiftDirection === "reverse"
                        ? `← ${t("leChatelier.status.left")}`
                        : `⇌ ${t("leChatelier.status.balanced")}`}
                    </span>
                  </div>

                  {/* Fullscreen Controls */}
                  {isFullscreen && (
                    <div className="flex items-center gap-1 bg-gray-900/80 rounded-lg p-1 border border-gray-700/50">
                      <button
                        onClick={() => setIsRunning(!isRunning)}
                        className={`p-2 rounded-md transition-all ${
                          isRunning
                            ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                            : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                        }`}
                        title={
                          isRunning
                            ? t("le_chatelier.controls.pause")
                            : t("le_chatelier.controls.start")
                        }
                      >
                        {isRunning ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
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
                isFullscreen
                  ? "min-h-[calc(100vh-160px)] h-auto w-full flex items-start justify-center p-4 overflow-y-auto"
                  : "h-auto min-h-[450px] lg:min-h-[520px] p-2"
              }`}
            >
              <LeChatelierCanvas
                params={params}
                isRunning={isRunning}
                onAnalyticsUpdate={handleAnalyticsUpdate}
                isFullscreen={isFullscreen}
              />
            </div>
          </div>
        </div>

        {/* Right Panel - Analytics (Desktop) */}
        {!isFullscreen && (
          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-md rounded-2xl border border-gray-700/60 shadow-2xl overflow-hidden sticky top-4">
              <div className="bg-gradient-to-r from-cyan-500/15 to-blue-500/15 px-4 py-3 border-b border-gray-700/60">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-cyan-300" />
                  <h2 className="font-bold text-white">
                    {t("leChatelier.panels.analytics")}
                  </h2>
                </div>
              </div>
              <div className="p-4 max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar">
                <LeChatelierAnalytics analytics={analytics} />
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

        /* Custom Range Slider Styles */
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
        }
        
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 2px solid #1f2937;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease;
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 2px solid #1f2937;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease;
        }
        
        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }
        
        input[type="range"]:disabled::-webkit-slider-thumb {
          cursor: not-allowed;
          opacity: 0.5;
        }
        
        input[type="range"]:disabled::-moz-range-thumb {
          cursor: not-allowed;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
};

export default LeChatelierSimulation;
