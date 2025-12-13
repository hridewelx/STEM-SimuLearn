// Types for Le Chatelier's Principle Simulation

// Reaction type - determines how temperature affects equilibrium
export type ReactionDirection = "exothermic" | "endothermic";

// Equilibrium shift direction
export type ShiftDirection = "forward" | "reverse" | "none";

// Individual particle in the simulation
export interface EquilibriumParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: "reactant" | "product";
  color: string;
  opacity: number;
  isTransitioning: boolean;
}
export interface ChemicalReaction {
  id: string;
  name: string;
  equation: string;
  reactants: {
    name: string;
    coefficient: number;
    state: "g" | "l" | "s" | "aq";
  }[];
  products: {
    name: string;
    coefficient: number;
    state: "g" | "l" | "s" | "aq";
  }[];
  enthalpy: number; // kJ/mol (negative = exothermic, positive = endothermic)
  description: string;
  colorScheme: {
    reactant: string;
    product: string;
  };
}

export const PREDEFINED_REACTIONS: ChemicalReaction[] = [
  {
    id: "haber",
    name: "Haber Process",
    equation: "N₂(g) + 3H₂(g) ⇌ 2NH₃(g)",
    reactants: [
      { name: "N₂", coefficient: 1, state: "g" },
      { name: "H₂", coefficient: 3, state: "g" },
    ],
    products: [{ name: "NH₃", coefficient: 2, state: "g" }],
    enthalpy: -92, // Exothermic
    description:
      "Synthesis of ammonia from nitrogen and hydrogen. Exothermic reaction.",
    colorScheme: { reactant: "#3B82F6", product: "#F97316" },
  },
  {
    id: "no2_dimer",
    name: "Nitrogen Dioxide Dimerization",
    equation: "2NO₂(g) ⇌ N₂O₄(g)",
    reactants: [{ name: "NO₂", coefficient: 2, state: "g" }],
    products: [{ name: "N₂O₄", coefficient: 1, state: "g" }],
    enthalpy: -57, // Exothermic
    description:
      "Brown NO₂ gas forming colorless N₂O₄ gas. Pressure strongly affects this equilibrium.",
    colorScheme: { reactant: "#9A3412", product: "#E2E8F0" }, // Brown to Colorless/White
  },
  {
    id: "hi_synthesis",
    name: "Hydrogen Iodide Synthesis",
    equation: "H₂(g) + I₂(g) ⇌ 2HI(g)",
    reactants: [
      { name: "H₂", coefficient: 1, state: "g" },
      { name: "I₂", coefficient: 1, state: "g" },
    ],
    products: [{ name: "HI", coefficient: 2, state: "g" }],
    enthalpy: 53, // Endothermic (actually depends on I2 state but often taught as endo for HI formation from gas)
    description: "Formation of Hydrogen Iodide. Reaction is Endothermic.",
    colorScheme: { reactant: "#8B5CF6", product: "#10B981" }, // Purple to Green
  },
  {
    id: "cobalt",
    name: "Cobalt Chloride Complex",
    equation: "[Co(H₂O)₆]²⁺(aq) + 4Cl⁻(aq) ⇌ [CoCl₄]²⁻(aq) + 6H₂O(l)",
    reactants: [
      { name: "[Co(H₂O)₆]²⁺", coefficient: 1, state: "aq" },
      { name: "Cl⁻", coefficient: 4, state: "aq" },
    ],
    products: [
      { name: "[CoCl₄]²⁻", coefficient: 1, state: "aq" },
      { name: "H₂O", coefficient: 6, state: "l" },
    ],
    enthalpy: 50, // Endothermic
    description:
      "Pink Cobalt(II) turning to Blue Cobalt(II) Chloride. Changing temperature shifts color.",
    colorScheme: { reactant: "#EC4899", product: "#3B82F6" }, // Pink to Blue
  },
];

// Simulation parameters controlled by user
export interface LeChatelierParams {
  selectedReactionId: string;
  temperature: number; // Kelvin (200-600)
  pressure: number; // atm (0.5-3)
  reactantConcentration: number; // percentage (0-100)
  productConcentration: number; // percentage (0-100)
  volume: number; // visualization volume
}

// Current state of equilibrium
export interface EquilibriumState {
  kEquilibrium: number; // Equilibrium constant
  qReaction: number; // Reaction quotient
  forwardRate: number;
  reverseRate: number;
  shiftDirection: ShiftDirection;
  isAtEquilibrium: boolean;
}

// Analytics data for display panel
export interface LeChatelierAnalyticsData {
  reactantCount: number;
  productCount: number;
  totalParticles: number;
  equilibriumConstant: number;
  reactionQuotient: number;
  shiftDirection: ShiftDirection;
  forwardReactionRate: number;
  reverseReactionRate: number;
  temperature: number;
  pressure: number;
  percentReactants: number;
  percentProducts: number;
  isAtEquilibrium: boolean;
}

// Stress types that can be applied to the system
export type StressType = "temperature" | "pressure" | "concentration" | "none";

// Visual effect for showing stress response
export interface StressEffect {
  type: StressType;
  direction: "increase" | "decrease";
  timestamp: number;
}
