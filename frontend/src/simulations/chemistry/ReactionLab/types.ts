// Types for the Advanced Chemistry Reaction Simulator

// Reaction types matching ChemicalReactions pattern
export type ReactionType =
  | "composition"
  | "decomposition"
  | "acidBase"
  | "singleReplacement";

// Chemical element for selection
export interface ChemicalElement {
  symbol: string;
  name: string;
  color: string;
  category:
    | "metal"
    | "nonmetal"
    | "acid"
    | "base"
    | "salt"
    | "water"
    | "gas"
    | "compound";
  reactivity?: number;
  molarMass: number;
}

// Reaction particle for canvas animation
export interface ReactionParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  chemical: string;
  color: string;
  category: string;
  reacted: boolean;
  label: string;
  isProduct?: boolean;
  mass: number;
}

// Reaction rule for determining products
export interface ReactionRule {
  reactants: string[];
  products: string[];
  coefficients: {
    reactants: number[];
    products: number[];
  };
  energyChange: "exothermic" | "endothermic" | "neutral";
  warning?: string;
  warning_bn?: string;
  explanation?: string;
  explanation_bn?: string;
  conditions?: string;
  conditions_bn?: string;
  howToPerform?: string;
  howToPerform_bn?: string;
}

// Simulation parameters
export interface ReactionLabParams {
  reactionType: ReactionType;
  // Composition
  elementA?: string;
  elementB?: string;
  // Decomposition
  compound?: string;
  // Acid-Base
  acid?: string;
  base?: string;
  // Single Replacement
  element?: string;
  compoundForReplacement?: string;
  // Quantities
  reactant1Amount: number;
  reactant2Amount: number;
  // General
  temperature: number;
}

// Reaction result from engine
export interface ReactionResult {
  valid: boolean;
  equation: string;
  products: string[];
  coefficients: {
    reactants: number[];
    products: number[];
  };
  energyChange: "exothermic" | "endothermic" | "neutral";
  warning?: string;
  warning_bn?: string;
  errorMessage?: string;
  errorMessage_bn?: string;
  explanation?: string;
  explanation_bn?: string;
  conditions?: string;
  conditions_bn?: string;
  howToPerform?: string;
  howToPerform_bn?: string;
  stoichiometricRatio: string;
}

// Analytics data for display
export interface ReactionLabAnalyticsData {
  progressPercentage: number;
  reactionRate: number;
  productsFormed: number;
  totalParticles: number;
  balancedEquation: string;
  energyChange: string;
  stoichiometricRatio: string;
  limitingReagent: string;
  excessReagent: string;
  theoreticalYield: number;
  actualYield: number;
  percentYield: number;
}
