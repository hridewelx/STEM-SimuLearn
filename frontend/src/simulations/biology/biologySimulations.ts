import { SimulationConfig } from '../types/simulationTypes';
import { Dna } from 'lucide-react';

export const biologySimulations: SimulationConfig[] = [
  // cellDivisionConfig,
  // dnaReplicationConfig,
];

export const cellDivisionPlaceholder: SimulationConfig = {
  id: 'cell-division-1',
  name: 'Cell Division (Mitosis)',
  description: 'Watch the process of cell division and understand the stages of mitosis.',
  longDescription: 'Explore the fascinating process of mitosis, where one cell divides into two identical daughter cells.',
  category: 'biology',
  difficulty: 'intermediate',
  duration: 25,
  objectives: [
    'Identify the phases of mitosis',
    'Understand chromosome behavior',
    'Learn about cell cycle regulation'
  ],
  tags: ['cell biology', 'mitosis', 'chromosomes', 'cell cycle'],
  route: '/simulations/biology/cell-division',
  icon: Dna,
  simulationDetails: {
    howItWorks:
      'This placeholder introduces the mitosis learning goals. The interactive simulation will visualize each stage (prophase → metaphase → anaphase → telophase) and track chromosome movement and cell-cycle checkpoints.',
    keyConcepts: [
      'Mitosis produces two genetically identical daughter cells',
      'Chromosomes condense, align, separate, and decondense in phases',
      'Spindle fibers attach and pull sister chromatids apart',
      'Cell-cycle checkpoints regulate division'
    ],
    controls: [
      'Start/pause the stage progression',
      'Step forward/back between phases',
      'Highlight chromosomes and spindle fibers',
      'Toggle labels and brief explanations'
    ],
    proTip: 'Focus on what happens to chromosomes in each phase (condense, align, separate, decondense).'
  }
};
