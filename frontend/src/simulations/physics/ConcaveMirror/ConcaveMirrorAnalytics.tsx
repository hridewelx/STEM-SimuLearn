import React from "react";
import { ConcaveMirrorParams } from "./types";
import {
  Activity,
  Ruler,
  Maximize2,
  ImageIcon,
  FlipVertical,
} from "lucide-react";

interface ConcaveMirrorAnalyticsProps {
  params: ConcaveMirrorParams;
}

import { useTranslation } from "react-i18next";

const ConcaveMirrorAnalytics: React.FC<ConcaveMirrorAnalyticsProps> = ({
  params,
}) => {
  const { t } = useTranslation();
  // Mirror formula: 1/f = 1/v + 1/u
  // Using sign convention: u is negative, f is negative for concave mirror
  const u = -params.objectDistance;
  const f = -params.focalLength;
  const v = (f * u) / (u - f);

  const magnification = -v / u;
  const imageHeight = magnification * params.objectHeight;

  // Determine image type
  const isReal = v < 0;
  const isAtInfinity = Math.abs(v) > 500 || !isFinite(v);

  // Determine orientation
  const isInverted = magnification < 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-green-400" />
        <h3 className="text-xl font-bold text-white">
          {t("concaveMirror.analytics.title")}
        </h3>
      </div>

      {/* Image Properties */}
      <div className="grid grid-cols-2 gap-4">
        {/* Image Distance */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Ruler className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-gray-400">
              {t("concaveMirror.analytics.imageDistance")}
            </span>
          </div>
          <p className="text-2xl font-bold text-white">
            {isAtInfinity
              ? t("concaveMirror.analytics.values.infinity")
              : `${Math.abs(v).toFixed(1)} cm`}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {isAtInfinity
              ? t("concaveMirror.analytics.values.atInfinity")
              : isReal
              ? t("concaveMirror.analytics.values.inFront")
              : t("concaveMirror.analytics.values.behind")}
          </p>
        </div>

        {/* Magnification */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Maximize2 className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-gray-400">
              {t("concaveMirror.analytics.magnification")}
            </span>
          </div>
          <p className="text-2xl font-bold text-white">
            {isAtInfinity
              ? t("concaveMirror.analytics.values.infinity")
              : `${magnification.toFixed(2)}×`}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {Math.abs(magnification) > 1
              ? t("concaveMirror.analytics.values.enlarged")
              : Math.abs(magnification) === 1
              ? t("concaveMirror.analytics.values.sameSize")
              : t("concaveMirror.analytics.values.diminished")}
          </p>
        </div>

        {/* Image Type */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <ImageIcon className="w-4 h-4 text-green-400" />
            <span className="text-xs text-gray-400">
              {t("concaveMirror.analytics.imageType")}
            </span>
          </div>
          <p className="text-2xl font-bold text-white">
            {isAtInfinity
              ? t("concaveMirror.analytics.values.noImage")
              : isReal
              ? t("concaveMirror.analytics.values.real")
              : t("concaveMirror.analytics.values.virtual")}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {isAtInfinity
              ? t("concaveMirror.analytics.values.formedAtInfinity")
              : isReal
              ? t("concaveMirror.analytics.values.canBeProjected")
              : t("concaveMirror.analytics.values.cannotBeProjected")}
          </p>
        </div>

        {/* Orientation */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <FlipVertical className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-gray-400">
              {t("concaveMirror.analytics.orientation")}
            </span>
          </div>
          <p className="text-2xl font-bold text-white">
            {isAtInfinity
              ? "-"
              : isInverted
              ? t("concaveMirror.analytics.values.inverted")
              : t("concaveMirror.analytics.values.erect")}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {isAtInfinity
              ? t("concaveMirror.analytics.values.notApplicable")
              : isInverted
              ? t("concaveMirror.analytics.values.upsideDown")
              : t("concaveMirror.analytics.values.upright")}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700"></div>

      {/* Formulas */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-400">
          {t("concaveMirror.analytics.mirrorFormula")}
        </h4>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-center space-y-2">
            <p className="text-lg font-mono text-blue-400">1/f = 1/v + 1/u</p>
            <p className="text-sm text-gray-400">
              f = {f.toFixed(1)} cm, u = {u.toFixed(1)} cm
            </p>
            <p className="text-sm text-green-400">
              v ={" "}
              {isAtInfinity
                ? t("concaveMirror.analytics.values.infinity")
                : `${v.toFixed(1)} cm`}
            </p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-center space-y-2">
            <p className="text-lg font-mono text-purple-400">m = -v/u = h'/h</p>
            <p className="text-sm text-gray-400">
              h&apos; ={" "}
              {isAtInfinity
                ? t("concaveMirror.analytics.values.infinity")
                : `${imageHeight.toFixed(1)} cm`}
            </p>
            <p className="text-sm text-green-400">
              m ={" "}
              {isAtInfinity
                ? t("concaveMirror.analytics.values.infinity")
                : magnification.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700"></div>

      {/* Position Summary */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-400">
          {t("concaveMirror.analytics.positionSummary")}
        </h4>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 space-y-2">
          <p className="text-sm text-white font-medium">
            {t("concaveMirror.analytics.descriptions.objectPosition")}{" "}
            {params.objectDistance > 2 * params.focalLength
              ? t("concaveMirror.controls.quickPositions.beyondC")
              : params.objectDistance === 2 * params.focalLength
              ? t("concaveMirror.controls.quickPositions.atC")
              : params.objectDistance > params.focalLength
              ? t("concaveMirror.controls.quickPositions.betweenCandF")
              : params.objectDistance === params.focalLength
              ? t("concaveMirror.controls.quickPositions.atF")
              : t("concaveMirror.controls.quickPositions.betweenFandMirror")}
          </p>

          <div className="text-xs text-gray-400 space-y-1">
            {params.objectDistance > 2 * params.focalLength && (
              <>
                <p>
                  {t("concaveMirror.analytics.descriptions.imageFormsBetween")}
                </p>
                <p>
                  {t(
                    "concaveMirror.analytics.descriptions.realInvertedDiminished"
                  )}
                </p>
                <p>{t("concaveMirror.analytics.descriptions.examplePhoto")}</p>
              </>
            )}

            {params.objectDistance === 2 * params.focalLength && (
              <>
                <p>{t("concaveMirror.analytics.descriptions.imageFormsAtC")}</p>
                <p>
                  {t("concaveMirror.analytics.descriptions.realInvertedSame")}
                </p>
                <p>
                  {t(
                    "concaveMirror.analytics.descriptions.objectImageSameDist"
                  )}
                </p>
              </>
            )}

            {params.objectDistance > params.focalLength &&
              params.objectDistance < 2 * params.focalLength && (
                <>
                  <p>
                    {t(
                      "concaveMirror.analytics.descriptions.imageFormsBeyondC"
                    )}
                  </p>
                  <p>
                    {t(
                      "concaveMirror.analytics.descriptions.realInvertedEnlarged"
                    )}
                  </p>
                  <p>{t("concaveMirror.analytics.descriptions.usedSolar")}</p>
                </>
              )}

            {params.objectDistance === params.focalLength && (
              <>
                <p>
                  {t("concaveMirror.analytics.descriptions.imageAtInfinity")}
                </p>
                <p>
                  {t("concaveMirror.analytics.descriptions.realHighlyEnlarged")}
                </p>
                <p>
                  {t("concaveMirror.analytics.descriptions.usedSearchlights")}
                </p>
              </>
            )}

            {params.objectDistance < params.focalLength && (
              <>
                <p>
                  {t("concaveMirror.analytics.descriptions.imageBehindMirror")}
                </p>
                <p>
                  {t(
                    "concaveMirror.analytics.descriptions.virtualErectEnlarged"
                  )}
                </p>
                <p>{t("concaveMirror.analytics.descriptions.usedShaving")}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sign Convention Reminder */}
      <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
        <p className="text-xs text-blue-300 font-medium mb-2">
          📌 {t("concaveMirror.analytics.signConvention")}
        </p>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>{t("concaveMirror.analytics.signRules.pole")}</li>
          <li>{t("concaveMirror.analytics.signRules.uNegative")}</li>
          <li>{t("concaveMirror.analytics.signRules.fNegative")}</li>
          <li>{t("concaveMirror.analytics.signRules.vReal")}</li>
          <li>{t("concaveMirror.analytics.signRules.vVirtual")}</li>
        </ul>
      </div>
    </div>
  );
};

export default ConcaveMirrorAnalytics;
