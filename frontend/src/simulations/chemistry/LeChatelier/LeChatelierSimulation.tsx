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
import LeChatelierCanvas from "./LeChatelierCanvas";
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
      <div className="bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
              <Scale className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                {t("le_chatelier.title")}
              </h2>
              <p className="text-xs text-gray-400">
                {t("le_chatelier.subtitle")}
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
                ? t("le_chatelier.status.running")
                : t("le_chatelier.status.ready")}
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
                  <span>{t("le_chatelier.status.shifting_products")}</span>
                </>
              ) : analytics.shiftDirection === "reverse" ? (
                <>
                  <span className="text-lg">←</span>
                  <span>{t("le_chatelier.status.shifting_reactants")}</span>
                </>
              ) : (
                <>
                  <span>⚖️</span>
                  <span>{t("le_chatelier.status.equilibrium")}</span>
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
              : "bg-gray-800/80 text-gray-400 border border-gray-700/50 hover:bg-gray-800"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>{t("le_chatelier.controls.title")}</span>
        </button>
        <button
          onClick={() =>
            setMobilePanel(mobilePanel === "analytics" ? "none" : "analytics")
          }
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
            mobilePanel === "analytics"
              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
              : "bg-gray-800/80 text-gray-400 border border-gray-700/50 hover:bg-gray-800"
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>{t("le_chatelier.analytics.title")}</span>
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
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden sticky top-4">
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 px-4 py-3 border-b border-gray-700/50">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-yellow-400" />
                  <h2 className="font-semibold text-white">
                    {t("le_chatelier.controls.title")}
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
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden">
            {/* Canvas Header */}
            <div className="px-4 py-3 border-b border-gray-700/50 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-purple-400" />
                  <h2 className="font-semibold text-white">
                    {t("le_chatelier.visualization.title")}
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  {/* Equilibrium Status */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-400 hidden sm:inline">
                      {t("le_chatelier.status.label")}
                    </span>
                    <span
                      className={`font-medium ${
                        analytics.shiftDirection === "forward"
                          ? "text-orange-400"
                          : analytics.shiftDirection === "reverse"
                          ? "text-blue-400"
                          : "text-green-400"
                      }`}
                    >
                      {analytics.shiftDirection === "forward"
                        ? t("le_chatelier.status.products_arrow")
                        : analytics.shiftDirection === "reverse"
                        ? t("le_chatelier.status.reactants_arrow")
                        : t("le_chatelier.status.balanced_icon")}
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
                  ? "h-[calc(100vh-300px)]"
                  : "h-[450px] lg:h-[520px]"
              } p-2`}
            >
              <LeChatelierCanvas
                params={params}
                isRunning={isRunning}
                onAnalyticsUpdate={handleAnalyticsUpdate}
              />
            </div>
          </div>
        </div>

        {/* Right Panel - Analytics (Desktop) */}
        {!isFullscreen && (
          <div className="hidden lg:block">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden sticky top-4">
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-4 py-3 border-b border-gray-700/50">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  <h2 className="font-semibold text-white">
                    {t("le_chatelier.analytics.title")}
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
      `}</style>
    </div>
  );
};

export default LeChatelierSimulation;
