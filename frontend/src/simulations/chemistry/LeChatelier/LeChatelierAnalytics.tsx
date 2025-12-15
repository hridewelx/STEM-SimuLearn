import {
  ArrowRight,
  ArrowLeft,
  Minus,
  Activity,
  Beaker,
  Thermometer,
  Gauge,
  Scale,
} from "lucide-react";
import { LeChatelierAnalyticsData } from "./types";
import { useTranslation } from "react-i18next";

interface LeChatelierAnalyticsProps {
  analytics: LeChatelierAnalyticsData;
}

const LeChatelierAnalytics = ({ analytics }: LeChatelierAnalyticsProps) => {
  const { t } = useTranslation();

  const getShiftIcon = () => {
    switch (analytics.shiftDirection) {
      case "forward":
        return <ArrowRight className="w-5 h-5 text-orange-600" />;
      case "reverse":
        return <ArrowLeft className="w-5 h-5 text-blue-600" />;
      default:
        return <Minus className="w-5 h-5 text-emerald-600" />;
    }
  };

  const getShiftText = () => {
    switch (analytics.shiftDirection) {
      case "forward":
        return t("leChatelier.analytics.shiftingProducts");
      case "reverse":
        return t("leChatelier.analytics.shiftingReactants");
      default:
        return t("leChatelier.analytics.atEquilibrium");
    }
  };

  const getShiftColor = () => {
    switch (analytics.shiftDirection) {
      case "forward":
        return "from-orange-500/20 to-amber-500/20 border-orange-500/50";
      case "reverse":
        return "from-blue-500/20 to-cyan-500/20 border-blue-500/50";
      default:
        return "from-green-500/20 to-emerald-500/20 border-green-500/50";
    }
  };

  return (
    <div className="space-y-4">
      {/* Equilibrium Status */}
      <div
        className={`p-4 rounded-xl bg-gradient-to-r ${getShiftColor()} border`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getShiftIcon()}
            <div>
              <p className="text-sm font-semibold text-white">
                {getShiftText()}
              </p>
              <p className="text-xs text-gray-400">
                {analytics.isAtEquilibrium
                  ? t("leChatelier.analytics.systemAtEquilibrium")
                  : t("leChatelier.analytics.systemAdjusting")}
              </p>
            </div>
          </div>
          <div
            className={`w-3 h-3 rounded-full ${
              analytics.isAtEquilibrium
                ? "bg-green-400"
                : "bg-yellow-400 animate-pulse"
            }`}
          />
        </div>
      </div>

      {/* Q vs K Comparison */}
      <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
        <h3 className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-3">
          <Scale className="w-4 h-4 text-purple-600" />
          {t("leChatelier.analytics.equilibriumAnalysis")}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 min-w-0">
            <p className="text-xs text-cyan-600 mb-1 truncate">
              {t("leChatelier.analytics.reactionQuotient")}
            </p>
            <p className="text-lg font-bold text-white">
              Q ={" "}
              {analytics.reactionQuotient === Infinity
                ? "∞"
                : analytics.reactionQuotient.toFixed(2)}
            </p>
          </div>
          <div className="text-center p-3 rounded-lg bg-purple-500/10 border border-purple-500/30 min-w-0">
            <p className="text-xs text-purple-600 mb-1 truncate">
              {t("leChatelier.analytics.equilibriumQuotient")}
            </p>
            <p className="text-lg font-bold text-white">
              K = {analytics.equilibriumConstant.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="mt-3 p-2 rounded-lg bg-gray-800/50">
          <p className="text-xs text-gray-400 text-center">
            {analytics.reactionQuotient < analytics.equilibriumConstant
              ? t("Q < K")
              : analytics.reactionQuotient > analytics.equilibriumConstant
              ? t("Q > K")
              : t("Q = K")}
          </p>
        </div>
      </div>

      {/* Particle Counts */}
      <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
        <h3 className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-3">
          <Beaker className="w-4 h-4 text-emerald-600" />
          {t("leChatelier.analytics.particleDistribution")}
        </h3>

        {/* Reactants Bar */}
        <div className="space-y-2 mb-3">
          <div className="flex justify-between text-sm">
            <span className="text-blue-600">
              {t("leChatelier.controls.reactants")}
            </span>
            <span className="text-white font-medium">
              {analytics.reactantCount} ({analytics.percentReactants.toFixed(1)}
              %)
            </span>
          </div>
          <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-300"
              style={{ width: `${analytics.percentReactants}%` }}
            />
          </div>
        </div>

        {/* Products Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-orange-600">
              {t("leChatelier.controls.products")}
            </span>
            <span className="text-white font-medium">
              {analytics.productCount} ({analytics.percentProducts.toFixed(1)}%)
            </span>
          </div>
          <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-300"
              style={{ width: `${analytics.percentProducts}%` }}
            />
          </div>
        </div>
      </div>

      {/* Reaction Rates */}
      <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
        <h3 className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-3">
          <Activity className="w-4 h-4 text-amber-600" />
          {t("leChatelier.analytics.reactionRates")}
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              {t("leChatelier.analytics.forwardRate")}
            </span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full transition-all"
                  style={{ width: `${analytics.forwardReactionRate * 1000}%` }}
                />
              </div>
              <span className="text-xs text-orange-600 w-10">
                {(analytics.forwardReactionRate * 100).toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              {t("leChatelier.analytics.reverseRate")}
            </span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${analytics.reverseReactionRate * 1000}%` }}
                />
              </div>
              <span className="text-xs text-blue-600 w-10">
                {(analytics.reverseReactionRate * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Current Conditions */}
      <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
        <h3 className="text-sm font-medium text-gray-400 mb-3">
          {t("leChatelier.controls.currentConditions")}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/30">
            <Thermometer className="w-4 h-4 text-rose-600" />
            <div>
              <p className="text-xs text-gray-400">
                {t("leChatelier.controls.temperature")}
              </p>
              <p className="text-sm font-bold text-white">
                {analytics.temperature} K
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
            <Gauge className="w-4 h-4 text-amber-600" />
            <div>
              <p className="text-xs text-gray-400">
                {t("leChatelier.controls.pressure")}
              </p>
              <p className="text-sm font-bold text-white">
                {analytics.pressure.toFixed(1)} atm
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeChatelierAnalytics;
