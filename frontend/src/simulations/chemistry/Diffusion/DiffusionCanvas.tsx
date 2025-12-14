import { useRef, useEffect, useState } from "react";
import { Particle, DiffusionParams } from "../../../types/simulation";
import { useTranslation } from "react-i18next";
import {
  createParticles,
  updateParticles,
  handleCollisions,
  calculateTemperature,
} from "../../../utils/particlePhysics";

interface DiffusionCanvasProps {
  params: DiffusionParams;
  isRunning: boolean;
  speed: "normal" | "slow";
  hasDivider: boolean;

  showScale: boolean;
  onReset: () => void;
}

const DiffusionCanvas = ({
  params,
  isRunning,
  speed,
  hasDivider,

  showScale,
}: DiffusionCanvasProps) => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [leftTemp, setLeftTemp] = useState(params.leftTemp);
  const [rightTemp, setRightTemp] = useState(params.rightTemp);
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(Date.now());

  const CANVAS_WIDTH = 1000;
  const CANVAS_HEIGHT = 600;

  // Initialize particles when params change
  useEffect(() => {
    const { left, right } = createParticles(
      params,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );
    setParticles([...left, ...right]);
  }, [params]);

  // Animation loop
  useEffect(() => {
    if (!isRunning) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const animate = () => {
      const now = Date.now();
      const deltaTime = (now - lastTimeRef.current) / 1000; // Convert to seconds
      lastTimeRef.current = now;

      const timeScale = speed === "slow" ? 20.0 : 50.0;
      const scaledDelta = deltaTime * timeScale;

      setParticles((prevParticles) => {
        // Update positions
        let updated = updateParticles(
          prevParticles,
          CANVAS_WIDTH,
          CANVAS_HEIGHT,
          hasDivider,
          scaledDelta
        );

        // Handle collisions
        updated = handleCollisions(updated);

        return updated;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning, speed, hasDivider]);

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw border
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw divider if present
    if (hasDivider) {
      ctx.strokeStyle = "#22c55e";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(CANVAS_WIDTH / 2, 0);
      ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
      ctx.stroke();
    }

    if (!hasDivider) {
      ctx.strokeStyle = "#22c55e";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(CANVAS_WIDTH / 2, 0);
      ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
      ctx.stroke();
    }

    // Draw particles
    particles.forEach((p) => {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw scale
    if (showScale) {
      ctx.fillStyle = "#ffffff";
      ctx.font = "12px monospace";
      ctx.fillText("0", 10, CANVAS_HEIGHT - 10);
      ctx.fillText(`${CANVAS_WIDTH}`, CANVAS_WIDTH - 30, CANVAS_HEIGHT - 10);

      // Draw scale marks
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 10; i++) {
        const x = (CANVAS_WIDTH / 10) * i;
        ctx.beginPath();
        ctx.moveTo(x, CANVAS_HEIGHT - 5);
        ctx.lineTo(x, CANVAS_HEIGHT - 15);
        ctx.stroke();
      }
    }

    // Update temperatures
    const leftParticles = particles.filter((p) => p.side === "left");
    const rightParticles = particles.filter((p) => p.side === "right");
    if (leftParticles.length > 0) {
      setLeftTemp(Math.round(calculateTemperature(leftParticles)));
    }
    if (rightParticles.length > 0) {
      setRightTemp(Math.round(calculateTemperature(rightParticles)));
    }
  }, [particles, hasDivider, showScale]);

  const leftCount = particles.filter((p) => p.side === "left").length;
  const rightCount = particles.filter((p) => p.side === "right").length;
  // Add these calculations to your component
  const leftBlueParticles = particles.filter(
    (p) => p.side === "left" && p.color === "#3b82f6"
  ).length;
  const leftRedParticles = particles.filter(
    (p) => p.side === "left" && p.color === "#ef4444"
  ).length;
  const rightBlueParticles = particles.filter(
    (p) => p.side === "right" && p.color === "#3b82f6"
  ).length;
  const rightRedParticles = particles.filter(
    (p) => p.side === "right" && p.color === "#ef4444"
  ).length;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Data Display - Responsive Grid */}
      <div className="bg-gradient-to-r from-gray-800/95 to-gray-900/95 text-white rounded-xl p-4 mb-4 backdrop-blur-sm border border-gray-700/60 shadow-xl w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Left Side Data */}
          <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
              <span className="text-sm font-semibold text-blue-300">
                {t("diffusion.chamber.left")}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">
                  {t("diffusion.chamber.total_particles")}:
                </span>
                <span className="font-mono font-bold text-white bg-gray-800 px-2 py-0.5 rounded">
                  {leftCount}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-400">
                  {t("diffusion.chamber.blue_particles")}:
                </span>
                <span className="font-mono text-blue-300">
                  {leftBlueParticles}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-red-400">
                  {t("diffusion.chamber.red_particles")}:
                </span>
                <span className="font-mono text-red-300">
                  {leftRedParticles}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-700/50">
                <span className="text-cyan-400">
                  {t("diffusion.chamber.temperature")}:
                </span>
                <span className="font-mono font-bold text-cyan-300">
                  {leftTemp}K
                </span>
              </div>
            </div>
          </div>

          {/* Right Side Data */}
          <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-red-400 rounded-full shadow-lg shadow-red-400/50"></div>
              <span className="text-sm font-semibold text-red-300">
                {t("diffusion.chamber.right")}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">
                  {t("diffusion.chamber.total_particles")}:
                </span>
                <span className="font-mono font-bold text-white bg-gray-800 px-2 py-0.5 rounded">
                  {rightCount}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-400">
                  {t("diffusion.chamber.blue_particles")}:
                </span>
                <span className="font-mono text-blue-300">
                  {rightBlueParticles}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-red-400">
                  {t("diffusion.chamber.red_particles")}:
                </span>
                <span className="font-mono text-red-300">
                  {rightRedParticles}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-700/50">
                <span className="text-orange-400">
                  {t("diffusion.chamber.temperature")}:
                </span>
                <span className="font-mono font-bold text-orange-300">
                  {rightTemp}K
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas - Responsive with max dimensions */}
      <div className="w-full overflow-auto">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border-2 border-gray-600 rounded-xl shadow-2xl bg-gray-950 mx-auto block"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default DiffusionCanvas;
