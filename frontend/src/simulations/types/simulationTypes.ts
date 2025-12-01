import { LucideIcon } from "lucide-react";
import { FC, SVGProps } from "react";

// Base simulation configuration
export interface SimulationConfig {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: 'physics' | 'chemistry' | 'biology' | 'math';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  thumbnail?: string;
  duration: number; // in minutes
  objectives: string[];
  tags: string[];
  route: string;
  icon: LucideIcon | FC<SVGProps<SVGSVGElement>>;
  simulationDetails: {
    howItWorks: string;
    keyConcepts: string[];
    controls: string[];
    proTip: string;
  };
}

// Base simulation state
export interface BaseSimulationState {
  isRunning: boolean;
  isPaused: boolean;
  speed: number;
  time: number;
}

// Particle system
export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  color: string;
  side?: 'left' | 'right';
}

// Chemistry - Diffusion
export interface DiffusionParams {
  leftCount: number;
  rightCount: number;
  leftMass: number;
  rightMass: number;
  leftRadius: number;
  rightRadius: number;
  leftTemp: number;
  rightTemp: number;
}

export interface DiffusionState extends BaseSimulationState {
  leftParticles: Particle[];
  rightParticles: Particle[];
  hasDivider: boolean;
  showCenterOfMass: boolean;
  showParticleFlow: boolean;
  showScale: boolean;
  showStopwatch: boolean;
}

// Physics - Projectile Motion
export interface ProjectileParams {
  initialVelocity: number;
  angle: number;
  mass: number;
  airResistance: number;
}

// Math - Graph Plotter
export interface GraphParams {
  equation: string;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  showGrid: boolean;
}

// Category metadata
export interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  simulationCount: number;
}
