import { useRef, useEffect, useCallback, useState } from "react";
import {
  EquilibriumParticle,
  LeChatelierParams,
  LeChatelierAnalyticsData,
  ShiftDirection,
  PREDEFINED_REACTIONS,
} from "./types";
import { Plus, Minus } from "lucide-react";

interface LeChatelierCanvasProps {
  params: LeChatelierParams;
  isRunning: boolean;
  onAnalyticsUpdate: (data: LeChatelierAnalyticsData) => void;
  isFullscreen?: boolean;
}

const LeChatelierCanvas = ({
  params,
  isRunning,
  onAnalyticsUpdate,
  isFullscreen = false,
}: LeChatelierCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<EquilibriumParticle[]>([]);
  const animationFrameRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  const [particleKey, setParticleKey] = useState(0);
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    color: string;
    timestamp: number;
  }>({ text: "", color: "", timestamp: 0 });

  // Dynamically adjust canvas size based on fullscreen state
  const CANVAS_WIDTH = isFullscreen ? 1200 : 800;
  const CANVAS_HEIGHT = isFullscreen ? 600 : 450;

  // Get selected reaction details
  const selectedReaction =
    PREDEFINED_REACTIONS.find((r) => r.id === params.selectedReactionId) ||
    PREDEFINED_REACTIONS[0];
  const { reactant: REACTANT_COLOR, product: PRODUCT_COLOR } =
    selectedReaction.colorScheme;
  const TRANSITION_COLOR = "#A855F7"; // Purple for transitioning particles

  // Calculate Equilibrium Constant (K) using Van't Hoff equation
  // K(T) = K_ref * exp( (-dH/R) * (1/T - 1/T_ref) )
  // T_ref = 300K, K_ref = 1 (assumed for visualization)
  const calculateK = useCallback((temp: number, enthalpy: number): number => {
    const R = 8.314; // J/(mol*K)
    const T_ref = 300;
    const dH_J = enthalpy * 1000; // Convert kJ to J

    // Calculate exponent factor
    const exponent = (-dH_J / R) * (1 / temp - 1 / T_ref);

    // Limit K to reasonable range for visualization (0.05 to 20)
    const K = Math.exp(exponent);
    return Math.max(0.05, Math.min(20, K));
  }, []);

  // Calculate Reaction Quotient (Q)
  // For visualization, we use simple particle count ratio, but we could incorporate coefficients
  const calculateQ = useCallback(
    (reactants: number, products: number): number => {
      if (reactants === 0) return Infinity;
      // Simple Q = [P]/[R] for the visualizer to handle particle counts directly
      return products / reactants;
    },
    []
  );

  // Calculate Pressure Effect Bias
  // Higher Pressure favors side with fewer gas moles
  const getPressureBias = useCallback(
    (pressure: number) => {
      const rGas = selectedReaction.reactants.reduce(
        (acc, r) => acc + (r.state === "g" ? r.coefficient : 0),
        0
      );
      const pGas = selectedReaction.products.reduce(
        (acc, p) => acc + (p.state === "g" ? p.coefficient : 0),
        0
      );

      // Delta n = n_gas(products) - n_gas(reactants)
      const deltaN = pGas - rGas;

      // If P increases (P > 1):
      // if deltaN > 0 (more gas on right): shift Left (reverse favored)
      // if deltaN < 0 (more gas on left): shift Right (forward favored)

      // We formulate a multiplier for the forward/reverse probabilities
      // Higher P -> shift to fewer moles.
      // Pressure factor: P^deltaN in equilibrium expression?
      // Actually, Kp = Kc * (RT)^deltaN.
      // Let's us a simple bias for probability:
      // Rate Multiplier ~ P^(-deltaN * 0.5) roughly

      const bias = Math.pow(pressure, -deltaN);
      return bias;
    },
    [selectedReaction]
  );

  // Determine shift direction based on Q vs K
  const getShiftDirection = useCallback(
    (Q: number, K: number): ShiftDirection => {
      // We normalize Q with the pressure bias to see the "Effective Q" vs K
      // Or simpler: Compare Q vs (K * PressureEffect)
      // Actually, K changes effectively with pressure due to concentration changes in reality

      // Let's keep it simple: Compare Q and K directly, but K effectively shifts?
      // No, K is constant. Q changes efficiently.
      // Let's use the reaction probabilities to drive the visual state,
      // and determine "Shift" based on the net rate.

      // We calculate net rate in handleReactions, so we can use that to determine shift direction?
      // For analytics display, we usually compare Q vs K.
      // Let's stick to Q vs K for display, but modify K for display if we want to show pressure effect?
      // User wants "Show pressure effect". Use the pressure bias to adjust effective equilibrium.

      // Let's define "Effective Equilibrium" as K_effective
      const bias = getPressureBias(params.pressure);
      const K_effective = K * bias;

      const tolerance = 0.15 * K_effective;
      if (Math.abs(Q - K_effective) < tolerance) return "none";
      return Q < K_effective ? "forward" : "reverse";
    },
    [getPressureBias, params.pressure]
  );

  // Handle elastic collisions
  const handleCollisions = useCallback(
    (particles: EquilibriumParticle[]): EquilibriumParticle[] => {
      const updatedParticles = [...particles];
      for (let i = 0; i < updatedParticles.length; i++) {
        for (let j = i + 1; j < updatedParticles.length; j++) {
          const p1 = updatedParticles[i];
          const p2 = updatedParticles[j];

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < p1.radius + p2.radius && distance > 0) {
            const angle = Math.atan2(dy, dx);
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);

            const v1x = p1.vx * cos + p1.vy * sin;
            const v1y = p1.vy * cos - p1.vx * sin;
            const v2x = p2.vx * cos + p2.vy * sin;
            const v2y = p2.vy * cos - p2.vx * sin;

            const mass1 = 1;
            const mass2 = 1;
            const totalMass = mass1 + mass2;
            const newV1x =
              ((mass1 - mass2) * v1x + 2 * mass2 * v2x) / totalMass;
            const newV2x =
              ((mass2 - mass1) * v2x + 2 * mass1 * v1x) / totalMass;

            updatedParticles[i] = {
              ...updatedParticles[i],
              vx: newV1x * cos - v1y * sin,
              vy: v1y * cos + newV1x * sin,
            };
            updatedParticles[j] = {
              ...updatedParticles[j],
              vx: newV2x * cos - v2y * sin,
              vy: v2y * cos + newV2x * sin,
            };

            const overlap = p1.radius + p2.radius - distance;
            updatedParticles[i].x -= (overlap / 2) * cos;
            updatedParticles[i].y -= (overlap / 2) * sin;
            updatedParticles[j].x += (overlap / 2) * cos;
            updatedParticles[j].y += (overlap / 2) * sin;
          }
        }
      }
      return updatedParticles;
    },
    []
  );

  // Initialize particles
  const initializeParticles = useCallback(() => {
    const particles: EquilibriumParticle[] = [];
    const totalParticles = 100;
    const reactantCount = Math.round(
      (params.reactantConcentration / 100) * totalParticles
    );
    const productCount = totalParticles - reactantCount;

    // Reactants
    for (let i = 0; i < reactantCount; i++) {
      const speed = (params.temperature / 300) * 2;
      particles.push({
        id: i,
        x: 30 + Math.random() * (CANVAS_WIDTH - 60),
        y: 50 + Math.random() * (CANVAS_HEIGHT - 100),
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: 8,
        type: "reactant",
        color: REACTANT_COLOR,
        opacity: 1,
        isTransitioning: false,
      });
    }

    // Products
    for (let i = 0; i < productCount; i++) {
      const speed = (params.temperature / 300) * 2;
      particles.push({
        id: reactantCount + i,
        x: 30 + Math.random() * (CANVAS_WIDTH - 60),
        y: 50 + Math.random() * (CANVAS_HEIGHT - 100),
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: 8,
        type: "product",
        color: PRODUCT_COLOR,
        opacity: 1,
        isTransitioning: false,
      });
    }
    particlesRef.current = particles;
  }, [
    params.reactantConcentration,
    params.temperature,
    REACTANT_COLOR,
    PRODUCT_COLOR,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
  ]);

  // Add Particle
  const addParticle = useCallback(
    (type: "reactant" | "product") => {
      const speed = (params.temperature / 300) * 2;
      const newParticle: EquilibriumParticle = {
        id: Date.now(),
        x: 50 + Math.random() * (CANVAS_WIDTH - 100),
        y: 80 + Math.random() * (CANVAS_HEIGHT - 160),
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: 8,
        type,
        color: type === "reactant" ? REACTANT_COLOR : PRODUCT_COLOR,
        opacity: 1,
        isTransitioning: false,
      };
      particlesRef.current = [...particlesRef.current, newParticle];
      setParticleKey((prev) => prev + 1);

      // Status message based on Le Chatelier
      if (type === "reactant") {
        setStatusMessage({
          text: "+ Reactant added → Shifting toward Products",
          color: "text-orange-400",
          timestamp: Date.now(),
        });
      } else {
        setStatusMessage({
          text: "+ Product added → Shifting toward Reactants",
          color: "text-blue-400",
          timestamp: Date.now(),
        });
      }
    },
    [
      params.temperature,
      REACTANT_COLOR,
      PRODUCT_COLOR,
      CANVAS_WIDTH,
      CANVAS_HEIGHT,
    ]
  );

  // Remove Particle
  const removeParticle = useCallback((type: "reactant" | "product") => {
    const particles = particlesRef.current;
    const targetParticles = particles.filter(
      (p) => p.type === type && !p.isTransitioning
    );
    if (targetParticles.length > 5) {
      const toRemove = targetParticles[targetParticles.length - 1];
      particlesRef.current = particles.filter((p) => p.id !== toRemove.id);
      setParticleKey((prev) => prev + 1);

      if (type === "reactant") {
        setStatusMessage({
          text: "- Reactant removed → Shifting toward Reactants",
          color: "text-blue-400",
          timestamp: Date.now(),
        });
      } else {
        setStatusMessage({
          text: "- Product removed → Shifting toward Products",
          color: "text-orange-400",
          timestamp: Date.now(),
        });
      }
    }
  }, []);

  // Handle Reactions based on equilibrium logic
  const handleReactions = useCallback(() => {
    const particles = particlesRef.current;
    const reactants = particles.filter(
      (p) => p.type === "reactant" && !p.isTransitioning
    );
    const products = particles.filter(
      (p) => p.type === "product" && !p.isTransitioning
    );

    const K = calculateK(params.temperature, selectedReaction.enthalpy);
    // Effective K includes pressure bias
    const pressureBias = getPressureBias(params.pressure);
    const K_effective = K * pressureBias;

    const Q = calculateQ(reactants.length, products.length);
    const shift = getShiftDirection(Q, K); // This function internally re-calculates/uses K_effective if needed, but we pass raw K.
    // Wait, getShiftDirection calls getPressureBias too.

    // Determine probabilities
    // We want ratio of forward/reverse to equal K_effective eventually
    // k_f / k_r = K_effective

    // Base probability factor
    const baseRate = 0.02 * (params.temperature / 300);

    let forwardProb = baseRate;
    let reverseProb = baseRate;

    if (K_effective > 1) {
      forwardProb = baseRate * Math.sqrt(K_effective);
      reverseProb = baseRate / Math.sqrt(K_effective);
    } else {
      forwardProb = baseRate * K_effective; // Reduce forward
      reverseProb = baseRate;
    }

    // Apply shift acceleration
    if (shift === "forward") {
      forwardProb *= 1.5;
    } else if (shift === "reverse") {
      reverseProb *= 1.5;
    }

    // Limit probabilities
    forwardProb = Math.min(0.2, forwardProb);
    reverseProb = Math.min(0.2, reverseProb);

    // Execute reactions with gradual color transition
    // Forward: R -> P (some stay purple longer)
    reactants.forEach((particle) => {
      if (
        Math.random() < forwardProb &&
        !particle.isTransitioning &&
        reactants.length > 5
      ) {
        particle.isTransitioning = true;

        // Gradual transition: first to purple, then some stay purple
        particle.color = TRANSITION_COLOR;

        // 30% stay purple longer (500ms), 70% transition normally (300ms)
        const transitionTime = Math.random() < 0.3 ? 500 : 300;

        setTimeout(() => {
          // Check if particle still exists
          const stillExists = particlesRef.current.find(
            (p) => p.id === particle.id
          );
          if (stillExists) {
            stillExists.type = "product";
            stillExists.color = PRODUCT_COLOR;
            stillExists.isTransitioning = false;
          }
        }, transitionTime);
      }
    });

    // Reverse: P -> R (some stay purple longer)
    products.forEach((particle) => {
      if (
        Math.random() < reverseProb &&
        !particle.isTransitioning &&
        products.length > 5
      ) {
        particle.isTransitioning = true;

        // Gradual transition: first to purple, then some stay purple
        particle.color = TRANSITION_COLOR;

        // 30% stay purple longer (500ms), 70% transition normally (300ms)
        const transitionTime = Math.random() < 0.3 ? 500 : 300;

        setTimeout(() => {
          // Check if particle still exists
          const stillExists = particlesRef.current.find(
            (p) => p.id === particle.id
          );
          if (stillExists) {
            stillExists.type = "reactant";
            stillExists.color = REACTANT_COLOR;
            stillExists.isTransitioning = false;
          }
        }, transitionTime);
      }
    });
  }, [
    params.temperature,
    params.pressure,
    selectedReaction,
    calculateK,
    calculateQ,
    getPressureBias,
    getShiftDirection,
    REACTANT_COLOR,
    PRODUCT_COLOR,
    TRANSITION_COLOR,
  ]);

  // Update Analytics
  const updateAnalytics = useCallback(() => {
    const particles = particlesRef.current;
    const reactants = particles.filter((p) => p.type === "reactant");
    const products = particles.filter((p) => p.type === "product");

    const K = calculateK(params.temperature, selectedReaction.enthalpy);
    // We display the REAL K (standard state), but maybe mention pressure effect?
    // Let's display the effective K if we want Q vs K to make sense visually.
    const pressureBias = getPressureBias(params.pressure);
    const K_effective = K * pressureBias;

    const Q = calculateQ(reactants.length, products.length);
    const shift = getShiftDirection(Q, K); // Uses params.pressure internally

    // Calculate dynamic reaction rates based on Q vs K relationship
    // When Q < K: forward should dominate (system shifts right)
    // When Q > K: reverse should dominate (system shifts left)
    // When Q ≈ K: rates should be equal (equilibrium)

    const baseRate = 0.03 * (params.temperature / 300); // Temperature effect
    let forwardRate: number;
    let reverseRate: number;

    if (Q < K_effective) {
      // Q < K means too many reactants, need forward reaction
      // The ratio K/Q indicates how far from equilibrium
      const ratio = Math.min(5, K_effective / Math.max(0.01, Q));
      forwardRate = baseRate * (1 + Math.log(ratio));
      reverseRate = baseRate / (1 + Math.log(ratio) * 0.5);
    } else if (Q > K_effective) {
      // Q > K means too many products, need reverse reaction
      const ratio = Math.min(5, Q / Math.max(0.01, K_effective));
      reverseRate = baseRate * (1 + Math.log(ratio));
      forwardRate = baseRate / (1 + Math.log(ratio) * 0.5);
    } else {
      // At equilibrium
      forwardRate = baseRate;
      reverseRate = baseRate;
    }

    // Cap rates between 0.5% and 15% for display
    forwardRate = Math.max(0.005, Math.min(0.15, forwardRate));
    reverseRate = Math.max(0.005, Math.min(0.15, reverseRate));

    const analytics: LeChatelierAnalyticsData = {
      reactantCount: reactants.length,
      productCount: products.length,
      totalParticles: particles.length,
      equilibriumConstant: K_effective, // Displaying effective K so the Q comparison works
      reactionQuotient: Q,
      shiftDirection: shift,
      forwardReactionRate: forwardRate,
      reverseReactionRate: reverseRate,
      temperature: params.temperature,
      pressure: params.pressure,
      percentReactants: (reactants.length / particles.length) * 100,
      percentProducts: (products.length / particles.length) * 100,
      isAtEquilibrium: shift === "none",
    };

    onAnalyticsUpdate(analytics);
  }, [
    params.temperature,
    params.pressure,
    selectedReaction,
    calculateK,
    calculateQ,
    getShiftDirection,
    getPressureBias,
    onAnalyticsUpdate,
  ]);

  // Animation Loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Clear
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw Equation Header
    const reactantCount = particlesRef.current.filter(
      (p) => p.type === "reactant"
    ).length;
    const productCount = particlesRef.current.filter(
      (p) => p.type === "product"
    ).length;

    ctx.font = "bold 18px Arial";
    ctx.textAlign = "center";

    ctx.fillStyle = REACTANT_COLOR;
    ctx.fillText(
      `${selectedReaction.reactants
        .map((r) => r.name)
        .join(" + ")} (${reactantCount})`,
      CANVAS_WIDTH / 4,
      30
    );

    ctx.fillStyle = "#fff";
    ctx.fillText("⇌", CANVAS_WIDTH / 2, 30);

    ctx.fillStyle = PRODUCT_COLOR;
    ctx.fillText(
      `${selectedReaction.products
        .map((p) => p.name)
        .join(" + ")} (${productCount})`,
      (CANVAS_WIDTH * 3) / 4,
      30
    );

    // Update Particles
    particlesRef.current = particlesRef.current.map((particle) => {
      let { x, y, vx, vy } = particle;

      // Update velocity based on temperature (simple scaling if needed, but handled in init)
      // Just move
      x += vx;
      y += vy;

      // Wall bounce
      if (x - particle.radius < 0) {
        x = particle.radius;
        vx = -vx;
      }
      if (x + particle.radius > CANVAS_WIDTH) {
        x = CANVAS_WIDTH - particle.radius;
        vx = -vx;
      }
      if (y - particle.radius < 45) {
        y = 45 + particle.radius;
        vy = -vy;
      } // Header space
      if (y + particle.radius > CANVAS_HEIGHT) {
        y = CANVAS_HEIGHT - particle.radius;
        vy = -vy;
      }

      return { ...particle, x, y, vx, vy };
    });

    // Collisions
    particlesRef.current = handleCollisions(particlesRef.current);

    // Draw
    particlesRef.current.forEach((particle) => {
      // Glow
      const grad = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.radius * 2
      );
      grad.addColorStop(0, particle.color + "60");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
      ctx.fill();

      // Core
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();

      // Highlight
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.beginPath();
      ctx.arc(
        particle.x - 2,
        particle.y - 2,
        particle.radius * 0.3,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });

    if (isRunning) {
      const now = Date.now();
      if (now - lastUpdateRef.current > 100) {
        handleReactions();
        updateAnalytics();
        lastUpdateRef.current = now;
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [
    isRunning,
    handleCollisions,
    handleReactions,
    updateAnalytics,
    REACTANT_COLOR,
    PRODUCT_COLOR,
    selectedReaction,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
  ]);

  // Effects
  useEffect(() => {
    initializeParticles();
  }, [initializeParticles, params.selectedReactionId]); // Re-init on reaction change

  useEffect(() => {
    animate();
    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [animate]);

  useEffect(() => {
    updateAnalytics();
  }, [updateAnalytics, particleKey]);

  useEffect(() => {
    if (statusMessage.text) {
      const timer = setTimeout(
        () => setStatusMessage({ text: "", color: "", timestamp: 0 }),
        3000
      );
      return () => clearTimeout(timer);
    }
  }, [statusMessage.timestamp]);

  return (
    <div className="w-full h-auto flex flex-col items-stretch gap-3">
      {/* Controls Bar - Responsive */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full px-2 gap-3 sm:gap-4">
        <div className="flex items-center gap-2 bg-gray-800/80 border border-gray-700 rounded-xl px-3 py-2">
          <span
            className="text-xs sm:text-sm font-medium"
            style={{ color: REACTANT_COLOR }}
          >
            {selectedReaction.reactants.map((r, i) => (
              <span key={i}>
                {i > 0 && " + "}
                {r.coefficient > 1 && r.coefficient}
                {r.name}
              </span>
            ))}
            :
          </span>
          <button
            onClick={() => removeParticle("reactant")}
            className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all"
          >
            <Minus className="w-4 h-4 text-white" />
          </button>
          <span className="text-white font-bold min-w-[30px] text-center">
            {particlesRef.current.filter((p) => p.type === "reactant").length}
          </span>
          <button
            onClick={() => addParticle("reactant")}
            className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all"
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>

        <div
          className={`flex-1 text-center transition-all duration-300 ${
            statusMessage.text ? "opacity-100" : "opacity-0"
          }`}
        >
          <span
            className={`text-sm font-semibold ${statusMessage.color} animate-pulse`}
          >
            {statusMessage.text}
          </span>
        </div>

        <div className="flex items-center gap-2 bg-gray-800/80 border border-gray-700 rounded-xl px-3 py-2">
          <span
            className="text-xs sm:text-sm font-medium"
            style={{ color: PRODUCT_COLOR }}
          >
            {selectedReaction.products.map((p, i) => (
              <span key={i}>
                {i > 0 && " + "}
                {p.coefficient > 1 && p.coefficient}
                {p.name}
              </span>
            ))}
            :
          </span>
          <button
            onClick={() => removeParticle("product")}
            className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all"
          >
            <Minus className="w-4 h-4 text-white" />
          </button>
          <span className="text-white font-bold min-w-[30px] text-center">
            {particlesRef.current.filter((p) => p.type === "product").length}
          </span>
          <button
            onClick={() => addParticle("product")}
            className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all"
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div className="w-full overflow-auto">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="rounded-xl border-2 border-gray-600 shadow-2xl mx-auto block"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>

      {/* Compact Color Legend - Always Below Canvas */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-4 sm:px-6 py-3 bg-gradient-to-r from-gray-800/95 to-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg">
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-full border-2 border-white shadow-md"
            style={{ backgroundColor: REACTANT_COLOR }}
          />
          <span className="text-sm font-semibold text-gray-200">Reactants</span>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-full border-2 border-white shadow-md"
            style={{ backgroundColor: PRODUCT_COLOR }}
          />
          <span className="text-sm font-semibold text-gray-200">Products</span>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-full border-2 border-white shadow-md"
            style={{ backgroundColor: TRANSITION_COLOR }}
          />
          <span className="text-sm font-semibold text-gray-200">
            Transitioning State
          </span>
        </div>
      </div>
    </div>
  );
};

export default LeChatelierCanvas;
