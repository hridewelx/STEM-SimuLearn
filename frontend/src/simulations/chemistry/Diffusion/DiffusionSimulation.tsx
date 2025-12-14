import { useState } from "react";
import DiffusionCanvas from "./DiffusionCanvas";
import DiffusionControls from "./DiffusionControls";
import AITutorPanel from "../../../components/AITutorPanel";
import { DiffusionParams } from "../../types/simulationTypes";
import { defaultDiffusionParams, diffusionConfig } from "./config";

const DiffusionSimulation = () => {
  const [params, setParams] = useState<DiffusionParams>(defaultDiffusionParams);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState<"normal" | "slow">("normal");
  const [hasDivider, setHasDivider] = useState(true);
  const [showScale, setShowScale] = useState(true);

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
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
        {/* Canvas Area */}
        <div className="flex items-center justify-center">
          <DiffusionCanvas
            params={params}
            isRunning={isRunning}
            speed={speed}
            hasDivider={hasDivider}
            showScale={showScale}
            onReset={handleReset}
          />
        </div>

        {/* Controls */}
        <div>
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

      {/* AI Tutor */}
      <AITutorPanel simulationData={simulationData} />
      {console.log("simulationData", simulationData)}
    </>
  );
};

export default DiffusionSimulation;
