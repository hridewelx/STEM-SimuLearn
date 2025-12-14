import {
  Play,
  Pause,
  RotateCcw,
  Thermometer,
  Gauge,
  FlaskConical,
  Beaker,
  ChevronDown,
} from "lucide-react";
import { LeChatelierParams, PREDEFINED_REACTIONS } from "./types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface LeChatelierControlsProps {
  params: LeChatelierParams;
  isRunning: boolean;
  onParamsChange: (params: Partial<LeChatelierParams>) => void;
  onToggleRunning: () => void;
  onReset: () => void;
}

const LeChatelierControls = ({
  params,
  isRunning,
  onParamsChange,
  onToggleRunning,
  onReset,
}: LeChatelierControlsProps) => {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === "bn";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectedReaction =
    PREDEFINED_REACTIONS.find((r) => r.id === params.selectedReactionId) ||
    PREDEFINED_REACTIONS[0];

  return (
    <div className="space-y-6">
      {/* Reaction Selector */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
          <FlaskConical className="w-4 h-4 text-purple-600" />
          {t("leChatelier.controls.selectReaction")}
        </label>

        <div className="relative">
          <button
            onClick={() => !isRunning && setIsDropdownOpen(!isDropdownOpen)}
            disabled={isRunning}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-gray-800/80 border border-gray-700/50 text-left transition-all ${
              isRunning
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-gray-700/80 hover:border-gray-600"
            }`}
          >
            <div>
              <div className="font-semibold text-white">
                {isBn && selectedReaction.name_bn
                  ? selectedReaction.name_bn
                  : selectedReaction.name}
              </div>
              <div className="text-xs text-gray-400 font-mono mt-0.5">
                {selectedReaction.equation}
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 p-1 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
              {PREDEFINED_REACTIONS.map((reaction) => (
                <button
                  key={reaction.id}
                  onClick={() => {
                    onParamsChange({ selectedReactionId: reaction.id });
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    params.selectedReactionId === reaction.id
                      ? "bg-purple-500/20 text-purple-300"
                      : "text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <div className="font-medium">
                    {isBn && reaction.name_bn
                      ? reaction.name_bn
                      : reaction.name}
                  </div>
                  <div className="text-xs opacity-70 font-mono">
                    {reaction.equation}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Reaction Info Card */}
        <div
          className={`p-3 rounded-xl border text-xs leading-relaxed ${
            selectedReaction.enthalpy < 0
              ? "bg-orange-500/10 border-orange-500/20 text-orange-200"
              : "bg-cyan-500/10 border-cyan-500/20 text-cyan-200"
          }`}
        >
          <div className="flex justify-between font-bold mb-1">
            <span>
              {selectedReaction.enthalpy < 0
                ? `🔥 ${t("leChatelier.controls.exothermic")}`
                : `❄️ ${t("leChatelier.controls.endothermic")}`}
            </span>
            <span>ΔH = {selectedReaction.enthalpy} kJ/mol</span>
          </div>
          <p className="opacity-90">
            {isBn && selectedReaction.description_bn
              ? selectedReaction.description_bn
              : selectedReaction.description}
          </p>
        </div>
      </div>

      {/* Temperature Control */}
      <div className="space-y-3">
        <label className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-medium text-gray-400">
            <Thermometer className="w-4 h-4 text-rose-600" />
            {t("leChatelier.controls.temperature")}
          </span>
          <span className="text-sm font-bold text-white bg-gray-800 px-2 py-1 rounded">
            {params.temperature} K
          </span>
        </label>
        <input
          type="range"
          min="200"
          max="600"
          step="10"
          value={params.temperature}
          onChange={(e) =>
            onParamsChange({ temperature: Number(e.target.value) })
          }
          className="w-full h-2 rounded-full appearance-none cursor-pointer slider-temperature"
          style={{
            background: `linear-gradient(to right, 
              #3B82F6 0%, 
              #EAB308 ${((params.temperature - 200) / 400) * 100}%, 
              #4B5563 ${((params.temperature - 200) / 400) * 100}%, 
              #4B5563 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>200 K ({t("leChatelier.controls.cold")})</span>
          <span>600 K ({t("leChatelier.controls.hot")})</span>
        </div>
        <p className="text-xs text-gray-400">
          {selectedReaction.enthalpy < 0
            ? t("leChatelier.controls.shiftLeft")
            : t("leChatelier.controls.shiftRight")}
        </p>
      </div>

      {/* Pressure Control */}
      <div className="space-y-3">
        <label className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-medium text-gray-400">
            <Gauge className="w-4 h-4 text-amber-600" />
            {t("leChatelier.controls.pressure")}
          </span>
          <span className="text-sm font-bold text-white bg-gray-800 px-2 py-1 rounded">
            {params.pressure.toFixed(1)} atm
          </span>
        </label>
        <input
          type="range"
          min="0.5"
          max="3"
          step="0.1"
          value={params.pressure}
          onChange={(e) => onParamsChange({ pressure: Number(e.target.value) })}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, 
              #3B82F6 0%, 
              #3B82F6 ${((params.pressure - 0.5) / 2.5) * 100}%, 
              #4B5563 ${((params.pressure - 0.5) / 2.5) * 100}%, 
              #4B5563 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>{t("leChatelier.controls.low")} (0.5 atm)</span>
          <span>{t("leChatelier.controls.high")} (3.0 atm)</span>
        </div>
        <p className="text-xs text-gray-400">
          {(() => {
            const rGas = selectedReaction.reactants.reduce(
              (acc, r) => acc + (r.state === "g" ? r.coefficient : 0),
              0
            );
            const pGas = selectedReaction.products.reduce(
              (acc, p) => acc + (p.state === "g" ? p.coefficient : 0),
              0
            );
            if (rGas === pGas) return t("leChatelier.controls.noEffect");
            return rGas > pGas
              ? t("leChatelier.controls.shiftRight")
              : t("leChatelier.controls.shiftLeft");
          })()}
        </p>
      </div>

      {/* Concentration Controls */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-sm font-medium text-gray-400">
          <Beaker className="w-4 h-4 text-emerald-600" />
          {t("leChatelier.controls.initialConcentrations")}
        </h3>

        {/* Reactant Concentration */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span
              className="text-sm"
              style={{ color: selectedReaction.colorScheme.reactant }}
            >
              {t("leChatelier.controls.reactants")}
            </span>
            <span
              className="text-sm font-bold"
              style={{ color: selectedReaction.colorScheme.reactant }}
            >
              {params.reactantConcentration}%
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="90"
            step="5"
            value={params.reactantConcentration}
            onChange={(e) => {
              const reactant = Number(e.target.value);
              onParamsChange({
                reactantConcentration: reactant,
                productConcentration: 100 - reactant,
              });
            }}
            disabled={isRunning}
            className={`w-full h-2 rounded-full appearance-none ${
              isRunning ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            style={{
              background: `linear-gradient(to right, 
                ${selectedReaction.colorScheme.reactant} 0%, 
                ${selectedReaction.colorScheme.reactant} ${
                ((params.reactantConcentration - 10) / 80) * 100
              }%, 
                #4B5563 ${((params.reactantConcentration - 10) / 80) * 100}%, 
                #4B5563 100%)`,
            }}
          />
        </div>

        {/* Product Concentration */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span
              className="text-sm"
              style={{ color: selectedReaction.colorScheme.product }}
            >
              {t("leChatelier.controls.products")}
            </span>
            <span
              className="text-sm font-bold"
              style={{ color: selectedReaction.colorScheme.product }}
            >
              {params.productConcentration}%
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="90"
            step="5"
            value={params.productConcentration}
            onChange={(e) => {
              const product = Number(e.target.value);
              onParamsChange({
                productConcentration: product,
                reactantConcentration: 100 - product,
              });
            }}
            disabled={isRunning}
            className={`w-full h-2 rounded-full appearance-none ${
              isRunning ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            style={{
              background: `linear-gradient(to right, 
                ${selectedReaction.colorScheme.product} 0%, 
                ${selectedReaction.colorScheme.product} ${
                ((params.productConcentration - 10) / 80) * 100
              }%, 
                #4B5563 ${((params.productConcentration - 10) / 80) * 100}%, 
                #4B5563 100%)`,
            }}
          />
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-3 pt-4 border-t border-gray-700/50">
        <button
          onClick={onToggleRunning}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all shadow-lg ${
            isRunning
              ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-black hover:from-yellow-400 hover:to-amber-400 shadow-yellow-500/25"
              : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-400 hover:to-emerald-400 shadow-green-500/25"
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4" />
              {t("leChatelier.controls.pause")}
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              {t("leChatelier.controls.start")}
            </>
          )}
        </button>
        <button
          onClick={onReset}
          className="px-4 py-3 rounded-xl font-semibold text-sm bg-gray-700/50 text-gray-400 hover:bg-gray-600/50 hover:text-white transition-all border border-gray-700/50"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default LeChatelierControls;
