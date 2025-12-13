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
  icon: Calculator,
  simulationDetails: {
    howItWorks:
      'This placeholder represents a 2D graphing tool. The simulation will parse an equation, sample points across the x-range, and render the curve with optional grid/axes to help visualize transformations and behavior.',
    keyConcepts: [
      'Functions map x-values to y-values',
      'Domain/range define where a function is valid and its outputs',
      'Transformations shift, stretch, and reflect graphs',
      'Slopes and curvature relate to rates of change'
    ],
    controls: [
      'Enter an equation (e.g., x^2, sin(x), 2x+1)',
      'Adjust x/y window bounds',
      'Toggle grid and axes',
      'Inspect points and intercepts'
    ],
    proTip: 'Try changing one parameter at a time (like a vertical shift) to see exactly how the graph responds.'
  }
};
