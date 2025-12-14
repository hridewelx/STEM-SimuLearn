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
    <div className="bg-gray-800 text-white rounded-2xl p-6 shadow-2xl border border-gray-700">
      {/* Number of Particles */}
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-4">
          {t("diffusion.controls.particle_count")}
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <input
                type="number"
                value={params.leftCount}
                onChange={(e) =>
                  onParamsChange({ leftCount: parseInt(e.target.value) || 0 })
                }
                className="w-20 px-2 py-1 bg-gray-700 rounded text-center"
                min="0"
                max="100"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <input
                type="number"
                value={params.rightCount}
                onChange={(e) =>
                  onParamsChange({ rightCount: parseInt(e.target.value) || 0 })
                }
                className="w-20 px-2 py-1 bg-gray-700 rounded text-center"
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mass */}
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-4">
          {t("diffusion.controls.mass")}
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <input
                type="number"
                value={params.leftMass}
                onChange={(e) =>
                  onParamsChange({ leftMass: parseFloat(e.target.value) || 1 })
                }
                className="w-20 px-2 py-1 bg-gray-700 rounded text-center"
                min="1"
                max="50"
                step="1"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <input
                type="number"
                value={params.rightMass}
                onChange={(e) =>
                  onParamsChange({ rightMass: parseFloat(e.target.value) || 1 })
                }
                className="w-20 px-2 py-1 bg-gray-700 rounded text-center"
                min="1"
                max="50"
                step="1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Radius */}
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-4">
          {t("diffusion.controls.radius")}
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <input
                type="number"
                value={params.leftRadius}
                onChange={(e) =>
                  onParamsChange({
                    leftRadius: parseFloat(e.target.value) || 5,
                  })
                }
                className="w-20 px-2 py-1 bg-gray-700 rounded text-center"
                min="5"
                max="30"
                step="1"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <input
                type="number"
                value={params.rightRadius}
                onChange={(e) =>
                  onParamsChange({
                    rightRadius: parseFloat(e.target.value) || 5,
                  })
                }
                className="w-20 px-2 py-1 bg-gray-700 rounded text-center"
                min="5"
                max="30"
                step="1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Initial Temperature */}
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-4">
          {t("diffusion.controls.temperature")}
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <input
                type="number"
                value={params.leftTemp}
                onChange={(e) =>
                  onParamsChange({
                    leftTemp: parseFloat(e.target.value) || 100,
                  })
                }
                className="w-20 px-2 py-1 bg-gray-700 rounded text-center"
                min="100"
                max="1000"
                step="50"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <input
                type="number"
                value={params.rightTemp}
                onChange={(e) =>
                  onParamsChange({
                    rightTemp: parseFloat(e.target.value) || 100,
                  })
                }
                className="w-20 px-2 py-1 bg-gray-700 rounded text-center"
                min="100"
                max="1000"
                step="50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Remove Divider Button */}
      {hasDivider && (
        <button
          onClick={onToggleDivider}
          className="btn btn-success w-full mb-6"
        >
          {t("diffusion.controls.remove_divider")}
        </button>
      )}

      {/* Options Checkboxes */}
      <div className="mb-6 space-y-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={showScale}
            onChange={onToggleScale}
            className="checkbox checkbox-sm"
          />
          <span>{t("diffusion.controls.scale")}</span>
        </label>
      </div>

      {/* Playback Controls */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={onToggleRunning}
          className="btn btn-primary flex-1 gap-2"
        >
          {isRunning ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>
        <button onClick={onReset} className="btn btn-outline flex-1 gap-2">
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Speed Control */}
      <div className="space-y-2">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="speed"
            checked={speed === "normal"}
            onChange={() => onToggleSpeed()}
            className="radio radio-sm"
          />
          <span>{t("diffusion.controls.speed.normal")}</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="speed"
            checked={speed === "slow"}
            onChange={() => onToggleSpeed()}
            className="radio radio-sm"
          />
          <span>{t("diffusion.controls.speed.slow")}</span>
        </label>
      </div>
    </div>
  );
};

export default DiffusionControls;
