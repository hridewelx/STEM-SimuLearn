import { SimulationConfig } from '../types/simulationTypes';
import { Atom } from 'lucide-react';
import { convexLensConfig } from './ConvexLens/config';
import { concaveMirrorConfig } from './ConcaveMirror/config';

// Physics simulations
export const physicsSimulations: SimulationConfig[] = [
  convexLensConfig,
  concaveMirrorConfig,
  // projectileMotionConfig,
  // pendulumConfig,
  // circularMotionConfig,
];

// Placeholder configs for coming soon simulations
export const projectileMotionPlaceholder: SimulationConfig = {
  id: 'projectile-motion-1',
  name: 'Projectile Motion',
  description: 'Analyze the trajectory of objects under gravity with varying initial conditions.',
  longDescription: 'Study the parabolic motion of projectiles, understanding how angle, velocity, and air resistance affect range and height.',
  category: 'physics',
  difficulty: 'beginner',
  duration: 15,
  objectives: [
    'Understand 2D kinematics',
    'Analyze velocity components',
    'Calculate range and maximum height',
    'Explore the effect of air resistance'
  ],
  tags: ['mechanics', 'kinematics', 'gravity', 'projectile'],
  route: '/simulations/physics/projectile-motion',
  icon: Atom,
  simulationDetails: {
    howItWorks: 'Coming soon',
    keyConcepts: ['Coming soon'],
    controls: ['Coming soon'],
    proTip: 'Coming soon'
  }
};
