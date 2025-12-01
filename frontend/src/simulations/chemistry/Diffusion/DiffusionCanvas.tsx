import { useRef, useEffect, useState } from "react";
import { Particle, DiffusionParams } from "../../../types/simulation";
import {
  createParticles,
  updateParticles,
  handleCollisions,
  calculateCenterOfMass,
  calculateTemperature,
} from "../../../utils/particlePhysics";

interface DiffusionCanvasProps {
  params: DiffusionParams;
  isRunning: boolean;
  speed: "normal" | "slow";
  hasDivider: boolean;
  showCenterOfMass: boolean;
  showScale: boolean;
  onReset: () => void;
}

const DiffusionCanvas = ({
  params,
  isRunning,
  speed,
  hasDivider,
  showCenterOfMass,
  showScale,
}: DiffusionCanvasProps) => {
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

    // Draw center of mass
    if (showCenterOfMass && particles.length > 0) {
      const leftParticles = particles.filter((p) => p.side === "left");
      const rightParticles = particles.filter((p) => p.side === "right");

      if (leftParticles.length > 0) {
        const leftCOM = calculateCenterOfMass(leftParticles);
        ctx.strokeStyle = "#3b82f6";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(leftCOM.x, leftCOM.y, 8, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(leftCOM.x - 10, leftCOM.y);
        ctx.lineTo(leftCOM.x + 10, leftCOM.y);
        ctx.moveTo(leftCOM.x, leftCOM.y - 10);
        ctx.lineTo(leftCOM.x, leftCOM.y + 10);
        ctx.stroke();
      }

      if (rightParticles.length > 0) {
        const rightCOM = calculateCenterOfMass(rightParticles);
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(rightCOM.x, rightCOM.y, 8, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(rightCOM.x - 10, rightCOM.y);
        ctx.lineTo(rightCOM.x + 10, rightCOM.y);
        ctx.moveTo(rightCOM.x, rightCOM.y - 10);
        ctx.lineTo(rightCOM.x, rightCOM.y + 10);
        ctx.stroke();
      }
    }

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
  }, [particles, hasDivider, showCenterOfMass, showScale]);

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
    <div className="flex flex-col items-center">
      {/* Data Display - Minimized with Divider */}
      <div className="bg-gray-800/90 text-white rounded-lg p-3 mb-4 backdrop-blur-sm border border-gray-600/50 shadow-xl w-full max-w-[1000px]">
        <div className="flex">
          {/* Left Side Data */}
          <div className="flex-1 pr-4 border-r border-gray-500/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-xs font-medium">Left Chamber</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Total Particles:</span>
                <span className="font-mono">{leftCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300">Blue Particles:</span>
                <span className="font-mono text-blue-300">
                  {leftBlueParticles}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-300">Red Particles:</span>
                <span className="font-mono text-red-300">
                  {leftRedParticles}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300">Left Chamber Temperature:</span>
                <span className="font-mono text-blue-300">
                  {leftTemp}k
                </span>
              </div>
            </div>
          </div>

          {/* Right Side Data */}
          <div className="flex-1 pl-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span className="text-xs font-medium">Right Chamber</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Total Particles:</span>
                <span className="font-mono">{rightCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300">Blue Particles:</span>
                <span className="font-mono text-blue-300">
                  {rightBlueParticles}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-300">Red Particles:</span>
                <span className="font-mono text-red-300">
                  {rightRedParticles}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300">Right Chamber Temperature:</span>
                <span className="font-mono text-blue-300">
                  {rightTemp}k
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas - Below Data Table */}
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border-4 border-white rounded-lg shadow-2xl bg-black"
      />
    </div>
  );
};

export default DiffusionCanvas;
