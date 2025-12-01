import { SimulationConfig, CategoryInfo } from './types/simulationTypes';
import { chemistrySimulations } from './chemistry/chemistrySimulations';
import { physicsSimulations, projectileMotionPlaceholder } from './physics/physicsSimulations';
import { biologySimulations, cellDivisionPlaceholder } from './biology/biologySimulations';
import { mathSimulations, graphPlotterPlaceholder } from './math/mathSimulations';

// All simulations registry
export const allSimulations: SimulationConfig[] = [
  ...chemistrySimulations,
  ...physicsSimulations,
  ...biologySimulations,
  ...mathSimulations,
];

// Coming soon placeholders
export const comingSoonSimulations: SimulationConfig[] = [
  projectileMotionPlaceholder,
  cellDivisionPlaceholder,
  graphPlotterPlaceholder,
];

// Category information
export const categories: Record<string, CategoryInfo> = {
  physics: {
    id: 'physics',
    name: 'Physics',
    description: 'Explore mechanics, thermodynamics, electromagnetism, and quantum physics',
    icon: '⚛️',
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500',
    simulationCount: physicsSimulations.length
  },
  chemistry: {
    id: 'chemistry',
    name: 'Chemistry',
    description: 'Experiment with reactions, molecules, and chemical principles',
    icon: '🧪',
    color: 'purple',
    gradient: 'from-purple-500 to-pink-500',
    simulationCount: chemistrySimulations.length
  },
  biology: {
    id: 'biology',
    name: 'Biology',
    description: 'Discover life sciences, cellular processes, and ecosystems',
    icon: '🧬',
    color: 'green',
    gradient: 'from-green-500 to-emerald-500',
    simulationCount: biologySimulations.length
  },
  math: {
    id: 'math',
    name: 'Mathematics',
    description: 'Visualize functions, geometry, calculus, and statistics',
    icon: '📐',
    color: 'orange',
    gradient: 'from-orange-500 to-yellow-500',
    simulationCount: mathSimulations.length
  }
};

// Helper functions
export const getSimulationsByCategory = (category: string): SimulationConfig[] => {
  return allSimulations.filter(sim => sim.category === category);
};

export const getSimulationById = (id: string): SimulationConfig | undefined => {
  return allSimulations.find(sim => sim.id === id);
};

export const getSimulationByRoute = (route: string): SimulationConfig | undefined => {
  return allSimulations.find(sim => sim.route === route);
};
