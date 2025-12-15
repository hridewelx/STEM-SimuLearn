import {
  Activity,
  Flame,
  Snowflake,
  TrendingUp,
  FlaskConical,
  Scale,
  Percent,
  Zap,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { ReactionLabAnalyticsData } from "./types";

interface ReactionLabAnalyticsProps {
  analytics: ReactionLabAnalyticsData;
}

const ReactionLabAnalytics = ({ analytics }: ReactionLabAnalyticsProps) => {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === "bn";
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-bold text-white">
          {t("reactionLab.panels.reactionAnalytics")}
        </h2>
      </div>

      {/* Balanced Equation */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <h3 className="text-xs font-semibold text-gray-400 mb-2">
          {t("reactionLab.analytics.balancedEquation")}
        </h3>
        <p className="text-lg font-mono text-yellow-300 break-all">
          {analytics.balancedEquation}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-400">
            {t("reactionLab.analytics.reactionProgress")}
          </span>
          <span className="text-sm font-bold text-cyan-600">
            {analytics.progressPercentage.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-green-500 to-yellow-500 transition-all duration-300 relative"
            style={{ width: `${Math.min(analytics.progressPercentage, 100)}%` }}
          >
            {analytics.progressPercentage > 15 && (
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                {analytics.progressPercentage.toFixed(0)}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Reaction Rate */}
        <div className="bg-gray-800 rounded-xl p-3 border border-gray-700">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span className="text-xs text-gray-400">
              {t("reactionLab.analytics.reactionRate")}
            </span>
          </div>
          <p className="text-xl font-bold text-green-300">
            {analytics.reactionRate.toFixed(2)}
            <span className="text-xs text-gray-400"> /s</span>
          </p>
        </div>

        {/* Products Formed */}
        <div className="bg-gray-800 rounded-xl p-3 border border-gray-700">
          <div className="flex items-center gap-2 mb-1">
            <FlaskConical className="w-4 h-4 text-purple-600" />
            <span className="text-xs text-gray-400">
              {t("reactionLab.analytics.productsFormed")}
            </span>
          </div>
          <p className="text-xl font-bold text-purple-300">
            {analytics.productsFormed}
            <span className="text-xs text-gray-400"> g</span>
          </p>
        </div>

        {/* Total Particles */}
        <div className="bg-gray-800 rounded-xl p-3 border border-gray-700">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-cyan-600" />
            <span className="text-xs text-gray-400">
              {t("reactionLab.analytics.totalMass")}
            </span>
          </div>
          <p className="text-xl font-bold text-cyan-300">
            {analytics.totalParticles}
            <span className="text-xs text-gray-400"> g</span>
          </p>
        </div>

        {/* Energy Change */}
        <div className="bg-gray-800 rounded-xl p-3 border border-gray-700">
          <div className="flex items-center gap-2 mb-1">
            {analytics.energyChange === "exothermic" ? (
              <Flame className="w-4 h-4 text-orange-600" />
            ) : analytics.energyChange === "endothermic" ? (
              <Snowflake className="w-4 h-4 text-blue-600" />
            ) : (
              <Zap className="w-4 h-4 text-gray-400" />
            )}
            <span className="text-xs text-gray-400">
              {t("reactionLab.analytics.energy")}
            </span>
          </div>
          <p
            className={`text-sm font-bold capitalize ${
              analytics.energyChange === "exothermic"
                ? "text-orange-300"
                : analytics.energyChange === "endothermic"
                ? "text-blue-300"
                : "text-gray-400"
            }`}
          >
            {analytics.energyChange === "exothermic"
              ? isBn
                ? "তাপ উৎপাদী"
                : "exothermic"
              : analytics.energyChange === "endothermic"
              ? isBn
                ? "তাপ হারী"
                : "endothermic"
              : isBn
              ? "নিরপেক্ষ"
              : "neutral"}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {analytics.energyChange === "exothermic"
              ? isBn
                ? "তাপ নির্গত হয়"
                : "Releases heat"
              : analytics.energyChange === "endothermic"
              ? isBn
                ? "তাপ শোষিত হয়"
                : "Absorbs heat"
              : ""}
          </p>
        </div>
      </div>

      {/* Stoichiometric Ratio */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <Scale className="w-4 h-4 text-amber-600" />
          <h3 className="text-xs font-semibold text-gray-400">
            {t("reactionLab.analytics.stoichiometricRate")}
          </h3>
        </div>
        <p className="text-2xl font-mono font-bold text-yellow-300">
          {analytics.stoichiometricRatio}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {isBn ? "বিক্রিয়ক : পণ্য" : "Reactants : Products"}
        </p>
      </div>

      {/* Limiting Reagent Info */}
      {analytics.limitingReagent && (
        <div className="bg-amber-900/20 rounded-xl p-4 border border-amber-700">
          <h3 className="text-xs font-semibold text-amber-400 mb-2">
            ⚠️ {isBn ? "সীমাবদ্ধ বিক্রিয়ক" : "Limiting Reagent"}
          </h3>
          <p className="text-lg font-bold text-amber-300">
            {analytics.limitingReagent}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {isBn
              ? "এই বিক্রিয়কটি প্রথমে শেষ হয়ে বিক্রিয়া বন্ধ করে দেবে।"
              : "This reactant will run out first, limiting the reaction."}
          </p>
          {analytics.excessReagent && (
            <div className="mt-2 pt-2 border-t border-amber-800/50">
              <p className="text-xs text-gray-400">
                {isBn ? "অতিরিক্ত:" : "Excess:"}{" "}
                <span className="text-emerald-600 font-medium">
                  {analytics.excessReagent}
                </span>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Yield Information */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center gap-2 mb-3">
          <Percent className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-semibold text-gray-400">
            {t("reactionLab.analytics.yieldAnalysis")}
          </h3>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">
              {t("reactionLab.analytics.theoreticalYield")}
            </span>
            <span className="text-sm font-mono text-gray-400">
              {analytics.theoreticalYield.toFixed(2)} g
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">
              {t("reactionLab.analytics.actualYield")}
            </span>
            <span className="text-sm font-mono text-emerald-300">
              {analytics.actualYield.toFixed(2)} g
            </span>
          </div>
          <div className="pt-2 border-t border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">
                {t("reactionLab.analytics.percentYield")}
              </span>
              <span className="text-lg font-bold text-emerald-400">
                {analytics.percentYield.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Tips */}
      <div className="bg-blue-900/20 rounded-xl p-4 border border-blue-800">
        <h3 className="text-xs font-semibold text-blue-600 mb-2">
          💡 {isBn ? "রসায়ন টিপস" : "Chemistry Tips"}
        </h3>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>
            •{" "}
            {isBn
              ? "সীমাবদ্ধ বিক্রিয়ক সর্বোচ্চ পণ্যের পরিমাণ নির্ধারণ করে"
              : "The limiting reagent determines max product yield"}
          </li>
          <li>
            •{" "}
            {isBn
              ? "উচ্চ তাপমাত্রা = দ্রুত বিক্রিয়ার হার"
              : "Higher temperature = faster reaction rate"}
          </li>
          <li>
            •{" "}
            {isBn
              ? "তাপ উৎপাদী বিক্রিয়া তাপ হিসেবে শক্তি নির্গত করে"
              : "Exothermic reactions release energy as heat"}
          </li>
          <li>
            •{" "}
            {isBn
              ? "স্টয়কিওমেট্রি বিক্রিয়ক/পণ্যের অনুপাত পূর্বাভাস দেয়"
              : "Stoichiometry predicts reactant/product ratios"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReactionLabAnalytics;
