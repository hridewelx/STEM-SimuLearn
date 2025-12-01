import { SimulationConfig } from '../types/simulationTypes';
import { Calculator } from 'lucide-react';

export const mathSimulations: SimulationConfig[] = [
  // graphPlotterConfig,
  // calculusVisualizerConfig,
];

export const graphPlotterPlaceholder: SimulationConfig = {
  id: 'graph-plotter-1',
  name: 'Function Grapher',
  description: 'Visualize mathematical functions in 2D with interactive controls.',
  longDescription: 'Plot and analyze various mathematical functions, explore transformations, and understand function behavior.',
  category: 'math',
  difficulty: 'beginner',
  duration: 15,
  objectives: [
    'Plot different function types',
    'Understand function transformations',
    'Analyze function properties',
    'Explore calculus concepts visually'
  ],
  tags: ['functions', 'graphing', 'algebra', 'calculus'],
  route: '/simulations/math/graph-plotter',
  icon: Calculator
};
