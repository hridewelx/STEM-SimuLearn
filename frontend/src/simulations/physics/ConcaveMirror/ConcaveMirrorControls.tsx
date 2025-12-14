import React from "react";
import { ConcaveMirrorParams } from "./types";
import { Sliders, Eye, Sparkles } from "lucide-react";

interface ConcaveMirrorControlsProps {
  params: ConcaveMirrorParams;
  onParamsChange: (newParams: Partial<ConcaveMirrorParams>) => void;
}

import { useTranslation } from "react-i18next";

const ConcaveMirrorControls: React.FC<ConcaveMirrorControlsProps> = ({
  params,
  onParamsChange,
}) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Sliders className="w-5 h-5 text-blue-400" />
        <h3 className="text-xl font-bold text-white">
          {t("concaveMirror.controls.title")}
        </h3>
      </div>

      {/* Object Distance */}
      <div className="space-y-2">
        <label className="flex items-center justify-between text-sm font-medium text-gray-300">
          <span>{t("concaveMirror.controls.objectDistance")}</span>
          <span className="text-blue-400">{params.objectDistance} cm</span>
        </label>
        <input
          type="range"
          min="2"
          max="200"
          step="1"
          value={params.objectDistance}
          onChange={(e) =>
            onParamsChange({ objectDistance: parseFloat(e.target.value) })
          }
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>2 cm (min)</span>
          <span>200 cm</span>
        </div>
      </div>

      {/* Focal Length */}
      <div className="space-y-2">
        <label className="flex items-center justify-between text-sm font-medium text-gray-300">
          <span>{t("concaveMirror.controls.focalLength")}</span>
          <span className="text-amber-400">{params.focalLength} cm</span>
        </label>
        <input
          type="range"
          min="5"
          max="50"
          step="1"
          value={params.focalLength}
          onChange={(e) =>
            onParamsChange({ focalLength: parseFloat(e.target.value) })
          }
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>5 cm</span>
          <span>50 cm</span>
        </div>
      </div>

      {/* Object Height */}
      <div className="space-y-2">
        <label className="flex items-center justify-between text-sm font-medium text-gray-300">
          <span>{t("concaveMirror.controls.objectHeight")}</span>
          <span className="text-green-400">{params.objectHeight} cm</span>
        </label>
        <input
          type="range"
          min="5"
          max="50"
          step="1"
          value={params.objectHeight}
          onChange={(e) =>
            onParamsChange({ objectHeight: parseFloat(e.target.value) })
          }
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>5 cm</span>
          <span>50 cm</span>
        </div>
      </div>

      {/* Mirror Aperture */}
      <div className="space-y-2">
        <label className="flex items-center justify-between text-sm font-medium text-gray-300">
          <span>{t("concaveMirror.controls.mirrorLength")}</span>
          <span className="text-teal-400">{params.mirrorAperture} cm</span>
        </label>
        <input
          type="range"
          min="10"
          max={Math.min(params.focalLength * 4, 200)}
          step="1"
          value={params.mirrorAperture}
          onChange={(e) =>
            onParamsChange({ mirrorAperture: parseFloat(e.target.value) })
          }
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>10 cm</span>
          <span>{Math.min(params.focalLength * 4, 200)} cm (max 4f)</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Visibility Toggles */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
          <Eye className="w-4 h-4" />
          {t("concaveMirror.controls.displayOptions")}
        </h4>

        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
            {t("concaveMirror.controls.showRays")}
          </span>
          <div
            className={`relative w-12 h-6 rounded-full transition-colors ${
              params.showRays ? "bg-red-500" : "bg-gray-700"
            }`}
            onClick={() => onParamsChange({ showRays: !params.showRays })}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                params.showRays ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </div>
        </label>

        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
            {t("concaveMirror.controls.showFocalPoint")}
          </span>
          <div
            className={`relative w-12 h-6 rounded-full transition-colors ${
              params.showFocalPoint ? "bg-amber-500" : "bg-gray-700"
            }`}
            onClick={() =>
              onParamsChange({ showFocalPoint: !params.showFocalPoint })
            }
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                params.showFocalPoint ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </div>
        </label>

        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
            {t("concaveMirror.controls.showMeasurements")}
          </span>
          <div
            className={`relative w-12 h-6 rounded-full transition-colors ${
              params.showMeasurements ? "bg-purple-500" : "bg-gray-700"
            }`}
            onClick={() =>
              onParamsChange({ showMeasurements: !params.showMeasurements })
            }
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                params.showMeasurements ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </div>
        </label>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Quick Presets */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          {t("concaveMirror.controls.quickPositions.title")}
        </h4>

        <button
          onClick={() =>
            onParamsChange({
              objectDistance: params.focalLength * 2.5,
              objectHeight: 10,
            })
          }
          className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all"
        >
          {t("concaveMirror.controls.quickPositions.beyondC")}
        </button>

        <button
          onClick={() =>
            onParamsChange({
              objectDistance: params.focalLength * 2,
              objectHeight: 10,
            })
          }
          className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all"
        >
          {t("concaveMirror.controls.quickPositions.atC")}
        </button>

        <button
          onClick={() =>
            onParamsChange({
              objectDistance: params.focalLength * 1.5,
              objectHeight: 10,
            })
          }
          className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white text-sm font-medium rounded-lg hover:from-green-700 hover:to-green-600 transition-all"
        >
          {t("concaveMirror.controls.quickPositions.betweenCandF")}
        </button>

        <button
          onClick={() =>
            onParamsChange({
              objectDistance: params.focalLength,
              objectHeight: 10,
            })
          }
          className="w-full px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-sm font-medium rounded-lg hover:from-amber-700 hover:to-amber-600 transition-all"
        >
          {t("concaveMirror.controls.quickPositions.atF")}
        </button>

        <button
          onClick={() =>
            onParamsChange({
              objectDistance: params.focalLength * 0.7,
              objectHeight: 10,
            })
          }
          className="w-full px-4 py-2 bg-gradient-to-r from-pink-600 to-pink-500 text-white text-sm font-medium rounded-lg hover:from-pink-700 hover:to-pink-600 transition-all"
        >
          {t("concaveMirror.controls.quickPositions.betweenFandMirror")}
        </button>
      </div>

      {/* Reset Button */}
      <button
        onClick={() =>
          onParamsChange({
            objectDistance: 30,
            focalLength: 15,
            objectHeight: 20,
            showRays: true,
            showFocalPoint: true,
            showMeasurements: true,
          })
        }
        className="w-full mt-4 px-4 py-2 bg-gray-700 text-white text-sm font-medium rounded-lg hover:bg-gray-600 transition-all"
      >
        {t("concaveMirror.controls.reset")}
      </button>
    </div>
  );
};

export default ConcaveMirrorControls;
