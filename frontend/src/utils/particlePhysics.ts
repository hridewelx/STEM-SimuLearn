import {
  Particle,
  DiffusionParams,
} from "../simulations/types/simulationTypes";

// Constants
const BOLTZMANN_CONSTANT = 0.01; // Scaled for visualization

// Create particles based on parameters
export const createParticles = (
  params: DiffusionParams,
  canvasWidth: number,
  canvasHeight: number
): { left: Particle[]; right: Particle[] } => {
  const leftParticles: Particle[] = [];
  const rightParticles: Particle[] = [];

  // Create left particles
  for (let i = 0; i < params.leftCount; i++) {
    leftParticles.push(
      createParticle(
        i,
        "left",
        params.leftMass,
        params.leftRadius,
        params.leftTemp,
        canvasWidth,
        canvasHeight
      )
    );
  }

  // Create right particles
  for (let i = 0; i < params.rightCount; i++) {
    rightParticles.push(
      createParticle(
        i + params.leftCount,
        "right",
        params.rightMass,
        params.rightRadius,
        params.rightTemp,
        canvasWidth,
        canvasHeight
      )
    );
  }

  return { left: leftParticles, right: rightParticles };
};

// Create a single particle
const createParticle = (
  id: number,
  side: "left" | "right",
  mass: number,
  radius: number,
  temperature: number,
  canvasWidth: number,
  canvasHeight: number
): Particle => {
  const halfWidth: number = canvasWidth / 2;
  const diameter: number = radius * 2;

  // Position based on side
  const x =
    side === "left"
      ? diameter + Math.random() * (halfWidth - diameter * 2)
      : halfWidth + diameter + Math.random() * (halfWidth - diameter * 2);

  const y = diameter + Math.random() * (canvasHeight - diameter * 2);

  // Velocity based on temperature (kinetic theory: KE = 3/2 * k * T)
  const speed = Math.sqrt((3 * BOLTZMANN_CONSTANT * temperature) / mass);
  const angle = Math.random() * 2 * Math.PI;
  const vx = speed * Math.cos(angle);
  const vy = speed * Math.sin(angle);

  return {
    id,
    x,
    y,
    vx,
    vy,
    radius,
    mass,
    color: side === "left" ? "#3b82f6" : "#ef4444", // Blue for left, Red for right
    side,
  };
};

// Update particle positions
export const updateParticles = (
  particles: Particle[],
  canvasWidth: number,
  canvasHeight: number,
  hasDivider: boolean,
  deltaTime: number
): Particle[] => {
  return particles.map((p) => {
    let { x, y, vx, vy } = p;

    // Update position
    x += vx * deltaTime;
    y += vy * deltaTime;

    // Wall collisions
    if (x - p.radius < 0 || x + p.radius > canvasWidth) {
      vx = -vx;
      x = x - p.radius < 0 ? p.radius : canvasWidth - p.radius;
    }

    if (y - p.radius < 0 || y + p.radius > canvasHeight) {
      vy = -vy;
      y = y - p.radius < 0 ? p.radius : canvasHeight - p.radius;
    }

    // Divider collision (middle of canvas)
    if (hasDivider) {
      const halfWidth = canvasWidth / 2;
      if (
        (p.side === "left" && x + p.radius > halfWidth) ||
        (p.side === "right" && x - p.radius < halfWidth)
      ) {
        vx = -vx;
        x = p.side === "left" ? halfWidth - p.radius : halfWidth + p.radius;
      }
    } else {
      // Update side based on position when no divider
      p.side = x < canvasWidth / 2 ? "left" : "right";
    }

    return { ...p, x, y, vx, vy };
  });
};

// Handle particle collisions
export const handleCollisions = (particles: Particle[]): Particle[] => {
  const updatedParticles = [...particles];
  // console.log(updatedParticles);
  for (let i = 0; i < updatedParticles.length; i++) {
    for (let j = i + 1; j < updatedParticles.length; j++) {
      const p1 = updatedParticles[i];
      const p2 = updatedParticles[j];

      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Check collision
      if (distance < p1.radius + p2.radius) {
        // Elastic collision response
        const angle = Math.atan2(dy, dx);
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);

        // Rotate velocities
        const v1x = p1.vx * cos + p1.vy * sin;
        const v1y = p1.vy * cos - p1.vx * sin;
        const v2x = p2.vx * cos + p2.vy * sin;
        const v2y = p2.vy * cos - p2.vx * sin;

        // Conservation of momentum (1D collision along contact)
        const totalMass = p1.mass + p2.mass;
        const newV1x =
          ((p1.mass - p2.mass) * v1x + 2 * p2.mass * v2x) / totalMass;
        const newV2x =
          ((p2.mass - p1.mass) * v2x + 2 * p1.mass * v1x) / totalMass;

        // Rotate back
        updatedParticles[i].vx = newV1x * cos - v1y * sin;
        updatedParticles[i].vy = v1y * cos + newV1x * sin;
        updatedParticles[j].vx = newV2x * cos - v2y * sin;
        updatedParticles[j].vy = v2y * cos + newV2x * sin;

        // Separate particles to prevent overlap
        const overlap = p1.radius + p2.radius - distance;
        const separationX = (overlap / 2) * cos;
        const separationY = (overlap / 2) * sin;

        updatedParticles[i].x -= separationX;
        updatedParticles[i].y -= separationY;
        updatedParticles[j].x += separationX;
        updatedParticles[j].y += separationY;
      }
    }
  }

  return updatedParticles;
};

// Calculate center of mass
export const calculateCenterOfMass = (particles: Particle[]) => {
  if (particles.length === 0) return { x: 0, y: 0 };

  let totalMass = 0;
  let weightedX = 0;
  let weightedY = 0;

  particles.forEach((p) => {
    totalMass += p.mass;
    weightedX += p.x * p.mass;
    weightedY += p.y * p.mass;
  });

  return {
    x: weightedX / totalMass,
    y: weightedY / totalMass,
  };
};

// Calculate average temperature from particle velocities
export const calculateTemperature = (particles: Particle[]): number => {
  if (particles.length === 0) return 0;

  const avgKE =
    particles.reduce((sum, p) => {
      const ke = 0.5 * p.mass * (p.vx * p.vx + p.vy * p.vy);
      return sum + ke;
    }, 0) / particles.length;

  // T = (2/3) * KE / k
  return ((2 / 3) * avgKE) / BOLTZMANN_CONSTANT;
};
