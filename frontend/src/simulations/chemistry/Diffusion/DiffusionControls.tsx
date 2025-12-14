import { Play, Pause, RotateCcw } from "lucide-react";
import { DiffusionParams } from "../../../types/simulation";
import { useTranslation } from "react-i18next";

interface DiffusionControlsProps {
  params: DiffusionParams;
  isRunning: boolean;
  speed: "normal" | "slow";
  hasDivider: boolean;

  showScale: boolean;

  onParamsChange: (params: Partial<DiffusionParams>) => void;
  onToggleRunning: () => void;
  onToggleSpeed: () => void;
  onToggleDivider: () => void;

  onToggleScale: () => void;

  onReset: () => void;
}

const DiffusionControls = ({
  params,
  isRunning,
  speed,
  hasDivider,

  showScale,

  onParamsChange,
  onToggleRunning,
  onToggleSpeed,
  onToggleDivider,

  onToggleScale,

  onReset,
}: DiffusionControlsProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Number of Particles */}
      <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
        <h3 className="font-bold text-sm text-gray-300 mb-4 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
          {t("diffusion.controls.particle_count")}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg"></div>
              <span className="text-xs text-gray-400">
                {t("diffusion.controls.blue")}
              </span>
            </div>
            <input
              type="number"
              value={params.leftCount}
              onChange={(e) =>
                onParamsChange({ leftCount: parseInt(e.target.value) || 0 })
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-center text-white font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              min="0"
              max="100"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-lg"></div>
              <span className="text-xs text-gray-400">
                {t("diffusion.controls.red")}
              </span>
            </div>
            <input
              type="number"
              value={params.rightCount}
              onChange={(e) =>
                onParamsChange({ rightCount: parseInt(e.target.value) || 0 })
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-center text-white font-mono focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              min="0"
              max="100"
            />
          </div>
        </div>
      </div>

      {/* Mass */}
      <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
        <h3 className="font-bold text-sm text-gray-300 mb-4 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
          {t("diffusion.controls.mass")}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
              <span className="text-xs text-gray-400">
                {t("diffusion.controls.blue_mass")}
              </span>
            </div>
            <input
              type="number"
              value={params.leftMass}
              onChange={(e) =>
                onParamsChange({ leftMass: parseFloat(e.target.value) || 1 })
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-center text-white font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              min="1"
              max="50"
              step="1"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-400 to-red-600"></div>
              <span className="text-xs text-gray-400">
                {t("diffusion.controls.red_mass")}
              </span>
            </div>
            <input
              type="number"
              value={params.rightMass}
              onChange={(e) =>
                onParamsChange({ rightMass: parseFloat(e.target.value) || 1 })
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-center text-white font-mono focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              min="1"
              max="50"
              step="1"
            />
          </div>
        </div>
      </div>

      {/* Radius */}
      <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
        <h3 className="font-bold text-sm text-gray-300 mb-4 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
          {t("diffusion.controls.radius")}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
              <span className="text-xs text-gray-400">
                {t("diffusion.controls.blue_radius")}
              </span>
            </div>
            <input
              type="number"
              value={params.leftRadius}
              onChange={(e) =>
                onParamsChange({
                  leftRadius: parseFloat(e.target.value) || 5,
                })
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-center text-white font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              min="5"
              max="30"
              step="1"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-400 to-red-600"></div>
              <span className="text-xs text-gray-400">
                {t("diffusion.controls.red_radius")}
              </span>
            </div>
            <input
              type="number"
              value={params.rightRadius}
              onChange={(e) =>
                onParamsChange({
                  rightRadius: parseFloat(e.target.value) || 5,
                })
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-center text-white font-mono focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              min="5"
              max="30"
              step="1"
            />
          </div>
        </div>
      </div>

      {/* Initial Temperature */}
      <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
        <h3 className="font-bold text-sm text-gray-300 mb-4 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
          {t("diffusion.controls.temperature")}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
              <span className="text-xs text-gray-400">
                {t("diffusion.controls.left_temp")}
              </span>
            </div>
            <input
              type="number"
              value={params.leftTemp}
              onChange={(e) =>
                onParamsChange({
                  leftTemp: parseFloat(e.target.value) || 100,
                })
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-center text-white font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              min="100"
              max="1000"
              step="50"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-400 to-red-600"></div>
              <span className="text-xs text-gray-400">
                {t("diffusion.controls.right_temp")}
              </span>
            </div>
            <input
              type="number"
              value={params.rightTemp}
              onChange={(e) =>
                onParamsChange({
                  rightTemp: parseFloat(e.target.value) || 100,
                })
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-center text-white font-mono focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              min="100"
              max="1000"
              step="50"
            />
          </div>
        </div>
      </div>

      {/* Remove Divider Button */}
      {hasDivider && (
        <button
          onClick={onToggleDivider}
          className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-green-500/25 transition-all"
        >
          {t("diffusion.controls.remove_divider")}
        </button>
      )}

      {/* Options Checkboxes */}
      <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div
            className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
              showScale
                ? "bg-cyan-500 border-cyan-500"
                : "border-gray-600 group-hover:border-gray-500"
            }`}
          >
            {showScale && <div className="w-2 h-2 bg-white rounded-sm"></div>}
          </div>
          <input
            type="checkbox"
            checked={showScale}
            onChange={onToggleScale}
            className="sr-only"
          />
          <span className="text-gray-300 text-sm">
            {t("diffusion.controls.scale")}
          </span>
        </label>
      </div>

      {/* Playback Controls */}
      <div className="flex gap-3">
        <button
          onClick={onToggleRunning}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all shadow-lg ${
            isRunning
              ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-black hover:from-yellow-400 hover:to-amber-400 shadow-yellow-500/25"
              : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-400 hover:to-emerald-400 shadow-green-500/25"
          }`}
        >
          {isRunning ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
          <span>
            {isRunning
              ? t("diffusion.controls.actions.pause")
              : t("diffusion.controls.actions.start")}
          </span>
        </button>
        <button
          onClick={onReset}
          className="px-4 py-3 rounded-xl font-semibold text-sm bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white transition-all border border-gray-600/50"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Speed Control */}
      <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
        <h3 className="font-bold text-sm text-gray-300 mb-3 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
          {t("diffusion.controls.speed.label")}
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => speed !== "normal" && onToggleSpeed()}
            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              speed === "normal"
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                : "bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {t("diffusion.controls.speed.normal")}
          </button>
          <button
            onClick={() => speed !== "slow" && onToggleSpeed()}
            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              speed === "slow"
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                : "bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {t("diffusion.controls.speed.slow")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiffusionControls;
