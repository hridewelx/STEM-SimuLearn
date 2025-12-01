// Le Chatelier's Principle Simulation Types

export interface EquilibriumReaction {
  id: string;
  name: string;
  equation: string;
  reactants: string[];
  products: string[];
  reactantCoeffs: number[];
  productCoeffs: number[];
  colors: {
    reactants: string[];
    products: string[];
  };
  Kc: number; // Equilibrium constant at standard temp
  deltaH: number; // Enthalpy change (kJ/mol) - negative = exothermic
  hasGas: boolean;
  gasSpecies: ('reactant' | 'product' | 'both' | 'none');
  description: string;
}

export interface SimulationParams {
  reaction: string;
  temperature: number; // Kelvin
  pressure: number; // atm
  volume: number; // L
  concentrations: {
    reactants: number[];
    products: number[];
  };
}

export interface EquilibriumState {
  Q: number; // Reaction quotient
  Kc: number; // Current equilibrium constant
  position: 'left' | 'right' | 'equilibrium';
  shiftDirection: 'forward' | 'reverse' | 'none';
  shiftReason: string;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'reactant' | 'product';
  speciesIndex: number;
  radius: number;
  color: string;
}

export interface StressEvent {
  type: 'concentration' | 'temperature' | 'pressure' | 'catalyst';
  action: 'increase' | 'decrease' | 'add_reactant' | 'add_product' | 'remove_reactant' | 'remove_product';
  magnitude: number;
  timestamp: number;
}

export const REACTIONS: EquilibriumReaction[] = [
  {
    id: 'n2o4_no2',
    name: 'Nitrogen Dioxide Equilibrium',
    equation: 'N₂O₄ (g) ⇌ 2NO₂ (g)',
    reactants: ['N₂O₄'],
    products: ['NO₂'],
    reactantCoeffs: [1],
    productCoeffs: [2],
    colors: {
      reactants: ['#E8E8E8'], // Colorless
      products: ['#8B4513'], // Brown
    },
    Kc: 0.0059,
    deltaH: 57.2, // Endothermic
    hasGas: true,
    gasSpecies: 'both',
    description: 'Colorless N₂O₄ decomposes to brown NO₂. Heating shifts equilibrium right (more brown). Increasing pressure shifts left (fewer gas moles).',
  },
  {
    id: 'co_h2_methanol',
    name: 'Methanol Synthesis',
    equation: 'CO (g) + 2H₂ (g) ⇌ CH₃OH (g)',
    reactants: ['CO', 'H₂'],
    products: ['CH₃OH'],
    reactantCoeffs: [1, 2],
    productCoeffs: [1],
    colors: {
      reactants: ['#87CEEB', '#FFFFFF'], // Light blue, white
      products: ['#98FB98'], // Pale green
    },
    Kc: 10.2,
    deltaH: -90.5, // Exothermic
    hasGas: true,
    gasSpecies: 'both',
    description: 'Industrial methanol synthesis. Exothermic reaction favored at low temperature. High pressure favors products (fewer moles).',
  },
  {
    id: 'fescn',
    name: 'Iron Thiocyanate Equilibrium',
    equation: 'Fe³⁺ (aq) + SCN⁻ (aq) ⇌ FeSCN²⁺ (aq)',
    reactants: ['Fe³⁺', 'SCN⁻'],
    products: ['FeSCN²⁺'],
    reactantCoeffs: [1, 1],
    productCoeffs: [1],
    colors: {
      reactants: ['#FFD700', '#FFFFFF'], // Yellow, colorless
      products: ['#DC143C'], // Deep red
    },
    Kc: 890,
    deltaH: -8.5, // Slightly exothermic
    hasGas: false,
    gasSpecies: 'none',
    description: 'Classic demonstration reaction. Adding Fe³⁺ or SCN⁻ shifts right (deeper red). Removing ions shifts left (lighter color).',
  },
  {
    id: 'cobalt_chloride',
    name: 'Cobalt Chloride Equilibrium',
    equation: '[Co(H₂O)₆]²⁺ + 4Cl⁻ ⇌ [CoCl₄]²⁻ + 6H₂O',
    reactants: ['[Co(H₂O)₆]²⁺', 'Cl⁻'],
    products: ['[CoCl₄]²⁻', 'H₂O'],
    reactantCoeffs: [1, 4],
    productCoeffs: [1, 6],
    colors: {
      reactants: ['#FF69B4', '#FFFFFF'], // Pink, colorless
      products: ['#0000CD', '#ADD8E6'], // Blue, light blue
    },
    Kc: 0.01,
    deltaH: 50, // Endothermic
    hasGas: false,
    gasSpecies: 'none',
    description: 'Temperature indicator. Pink at low temp, blue at high temp. Adding Cl⁻ shifts right (more blue).',
  },
  {
    id: 'haber',
    name: 'Haber Process (Ammonia)',
    equation: 'N₂ (g) + 3H₂ (g) ⇌ 2NH₃ (g)',
    reactants: ['N₂', 'H₂'],
    products: ['NH₃'],
    reactantCoeffs: [1, 3],
    productCoeffs: [2],
    colors: {
      reactants: ['#ADD8E6', '#FFFFFF'], // Light blue, white
      products: ['#90EE90'], // Light green
    },
    Kc: 6.0e5,
    deltaH: -92.4, // Exothermic
    hasGas: true,
    gasSpecies: 'both',
    description: 'Industrial ammonia synthesis. Exothermic, so low temp favors products. High pressure favors products (4 moles → 2 moles).',
  },
];

export const DEFAULT_PARAMS: SimulationParams = {
  reaction: 'n2o4_no2',
  temperature: 298, // 25°C
  pressure: 1,
  volume: 1,
  concentrations: {
    reactants: [0.5],
    products: [0.1],
  },
};
