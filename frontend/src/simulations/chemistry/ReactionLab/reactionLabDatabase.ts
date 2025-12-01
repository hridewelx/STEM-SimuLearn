import { ChemicalElement, ReactionRule, ReactionType, ReactionResult } from './types';

// ============ ELEMENTS FOR COMBINATION REACTIONS ============
export const COMBINATION_ELEMENTS_A: ChemicalElement[] = [
  { symbol: 'H₂', name: 'Hydrogen', color: '#E8F4FF', category: 'gas', molarMass: 2.016 },
  { symbol: 'Na', name: 'Sodium', color: '#C0C0C0', category: 'metal', reactivity: 5, molarMass: 22.99 },
  { symbol: 'Mg', name: 'Magnesium', color: '#A8A8A8', category: 'metal', reactivity: 4, molarMass: 24.305 },
  { symbol: 'Fe', name: 'Iron', color: '#8B4513', category: 'metal', reactivity: 2, molarMass: 55.845 },
  { symbol: 'Ca', name: 'Calcium', color: '#F0F0F0', category: 'metal', reactivity: 4, molarMass: 40.078 },
  { symbol: 'K', name: 'Potassium', color: '#D4D4D4', category: 'metal', reactivity: 6, molarMass: 39.098 },
  { symbol: 'Al', name: 'Aluminum', color: '#C0C0C0', category: 'metal', reactivity: 3, molarMass: 26.982 },
];

export const COMBINATION_ELEMENTS_B: ChemicalElement[] = [
  { symbol: 'O₂', name: 'Oxygen', color: '#FFE4E4', category: 'gas', molarMass: 32 },
  { symbol: 'Cl₂', name: 'Chlorine', color: '#90EE90', category: 'gas', molarMass: 70.9 },
  { symbol: 'S', name: 'Sulfur', color: '#FFD700', category: 'nonmetal', molarMass: 32.06 },
  { symbol: 'N₂', name: 'Nitrogen', color: '#E8E8FF', category: 'gas', molarMass: 28.014 },
  { symbol: 'Br₂', name: 'Bromine', color: '#8B0000', category: 'nonmetal', molarMass: 159.808 },
];

// ============ COMPOUNDS FOR DECOMPOSITION ============
export const DECOMPOSITION_COMPOUNDS: ChemicalElement[] = [
  { symbol: 'H₂O₂', name: 'Hydrogen Peroxide', color: '#E0F7FA', category: 'compound', molarMass: 34.014 },
  { symbol: 'CaCO₃', name: 'Calcium Carbonate', color: '#FFFAF0', category: 'compound', molarMass: 100.09 },
  { symbol: 'KClO₃', name: 'Potassium Chlorate', color: '#F0FFF0', category: 'compound', molarMass: 122.55 },
  { symbol: 'NaHCO₃', name: 'Sodium Bicarbonate', color: '#FFFAF0', category: 'compound', molarMass: 84.007 },
  { symbol: 'H₂CO₃', name: 'Carbonic Acid', color: '#F0F8FF', category: 'compound', molarMass: 62.03 },
  { symbol: 'NH₄NO₃', name: 'Ammonium Nitrate', color: '#FFFFF0', category: 'compound', molarMass: 80.043 },
];

// ============ ACIDS ============
export const ACIDS: ChemicalElement[] = [
  { symbol: 'HCl', name: 'Hydrochloric Acid', color: '#FF6B6B', category: 'acid', molarMass: 36.46 },
  { symbol: 'H₂SO₄', name: 'Sulfuric Acid', color: '#FF4444', category: 'acid', molarMass: 98.079 },
  { symbol: 'HNO₃', name: 'Nitric Acid', color: '#FF8C00', category: 'acid', molarMass: 63.01 },
  { symbol: 'CH₃COOH', name: 'Acetic Acid', color: '#FFB6C1', category: 'acid', molarMass: 60.052 },
  { symbol: 'H₃PO₄', name: 'Phosphoric Acid', color: '#FF6347', category: 'acid', molarMass: 97.994 },
];

// ============ BASES ============
export const BASES: ChemicalElement[] = [
  { symbol: 'NaOH', name: 'Sodium Hydroxide', color: '#6B8CFF', category: 'base', molarMass: 39.997 },
  { symbol: 'KOH', name: 'Potassium Hydroxide', color: '#7B68EE', category: 'base', molarMass: 56.106 },
  { symbol: 'Ca(OH)₂', name: 'Calcium Hydroxide', color: '#87CEEB', category: 'base', molarMass: 74.093 },
  { symbol: 'NH₃', name: 'Ammonia', color: '#ADD8E6', category: 'base', molarMass: 17.031 },
  { symbol: 'Mg(OH)₂', name: 'Magnesium Hydroxide', color: '#B0E0E6', category: 'base', molarMass: 58.32 },
];

// ============ ELEMENTS FOR SINGLE REPLACEMENT ============
export const REPLACEMENT_ELEMENTS: ChemicalElement[] = [
  { symbol: 'Zn', name: 'Zinc', color: '#C0C0C0', category: 'metal', reactivity: 3, molarMass: 65.38 },
  { symbol: 'Fe', name: 'Iron', color: '#8B4513', category: 'metal', reactivity: 2, molarMass: 55.845 },
  { symbol: 'Cu', name: 'Copper', color: '#B87333', category: 'metal', reactivity: 1, molarMass: 63.546 },
  { symbol: 'Mg', name: 'Magnesium', color: '#A8A8A8', category: 'metal', reactivity: 4, molarMass: 24.305 },
  { symbol: 'Al', name: 'Aluminum', color: '#C0C0C0', category: 'metal', reactivity: 3, molarMass: 26.982 },
  { symbol: 'Ag', name: 'Silver', color: '#E0E0E0', category: 'metal', reactivity: 0, molarMass: 107.87 },
];

export const REPLACEMENT_COMPOUNDS: ChemicalElement[] = [
  { symbol: 'CuSO₄', name: 'Copper Sulfate', color: '#4169E1', category: 'salt', molarMass: 159.609 },
  { symbol: 'ZnCl₂', name: 'Zinc Chloride', color: '#F5F5DC', category: 'salt', molarMass: 136.286 },
  { symbol: 'FeCl₂', name: 'Iron(II) Chloride', color: '#98FB98', category: 'salt', molarMass: 126.751 },
  { symbol: 'AgNO₃', name: 'Silver Nitrate', color: '#F0F0F0', category: 'salt', molarMass: 169.87 },
  { symbol: 'HCl', name: 'Hydrochloric Acid', color: '#FF6B6B', category: 'acid', molarMass: 36.46 },
  { symbol: 'H₂SO₄', name: 'Sulfuric Acid', color: '#FF4444', category: 'acid', molarMass: 98.079 },
];

// ============ PRODUCTS ============
export const PRODUCTS: Record<string, ChemicalElement> = {
  'H₂O': { symbol: 'H₂O', name: 'Water', color: '#87CEEB', category: 'water', molarMass: 18.015 },
  'NaCl': { symbol: 'NaCl', name: 'Sodium Chloride', color: '#FFFFFF', category: 'salt', molarMass: 58.44 },
  'KCl': { symbol: 'KCl', name: 'Potassium Chloride', color: '#F8F8FF', category: 'salt', molarMass: 74.55 },
  'CaCl₂': { symbol: 'CaCl₂', name: 'Calcium Chloride', color: '#FFFAF0', category: 'salt', molarMass: 110.98 },
  'MgO': { symbol: 'MgO', name: 'Magnesium Oxide', color: '#FFFFFF', category: 'compound', molarMass: 40.304 },
  'FeO': { symbol: 'FeO', name: 'Iron(II) Oxide', color: '#2F4F4F', category: 'compound', molarMass: 71.844 },
  'Fe₂O₃': { symbol: 'Fe₂O₃', name: 'Iron(III) Oxide', color: '#8B0000', category: 'compound', molarMass: 159.69 },
  'Na₂O': { symbol: 'Na₂O', name: 'Sodium Oxide', color: '#F5F5F5', category: 'compound', molarMass: 61.98 },
  'CaO': { symbol: 'CaO', name: 'Calcium Oxide', color: '#FFFAF0', category: 'compound', molarMass: 56.077 },
  'CO₂': { symbol: 'CO₂', name: 'Carbon Dioxide', color: '#D3D3D3', category: 'gas', molarMass: 44.01 },
  'O₂': { symbol: 'O₂', name: 'Oxygen', color: '#FFE4E4', category: 'gas', molarMass: 32 },
  'H₂': { symbol: 'H₂', name: 'Hydrogen', color: '#E8F4FF', category: 'gas', molarMass: 2.016 },
  'Na₂SO₄': { symbol: 'Na₂SO₄', name: 'Sodium Sulfate', color: '#FFFFF0', category: 'salt', molarMass: 142.04 },
  'K₂SO₄': { symbol: 'K₂SO₄', name: 'Potassium Sulfate', color: '#FFFFF0', category: 'salt', molarMass: 174.26 },
  'ZnSO₄': { symbol: 'ZnSO₄', name: 'Zinc Sulfate', color: '#F5F5F5', category: 'salt', molarMass: 161.47 },
  'FeSO₄': { symbol: 'FeSO₄', name: 'Iron(II) Sulfate', color: '#98FB98', category: 'salt', molarMass: 151.908 },
  'ZnCl₂': { symbol: 'ZnCl₂', name: 'Zinc Chloride', color: '#F5F5DC', category: 'salt', molarMass: 136.286 },
  'Cu': { symbol: 'Cu', name: 'Copper', color: '#B87333', category: 'metal', molarMass: 63.546 },
  'Zn': { symbol: 'Zn', name: 'Zinc', color: '#C0C0C0', category: 'metal', molarMass: 65.38 },
  'Fe': { symbol: 'Fe', name: 'Iron', color: '#8B4513', category: 'metal', molarMass: 55.845 },
  'Ag': { symbol: 'Ag', name: 'Silver', color: '#E0E0E0', category: 'metal', molarMass: 107.87 },
  'KNO₃': { symbol: 'KNO₃', name: 'Potassium Nitrate', color: '#F5FFFA', category: 'salt', molarMass: 101.1 },
  'NaNO₃': { symbol: 'NaNO₃', name: 'Sodium Nitrate', color: '#F5FFFA', category: 'salt', molarMass: 84.995 },
};

// ============ ALL CHEMICALS MAP ============
export const ALL_CHEMICALS: Record<string, ChemicalElement> = {
  ...Object.fromEntries(COMBINATION_ELEMENTS_A.map(e => [e.symbol, e])),
  ...Object.fromEntries(COMBINATION_ELEMENTS_B.map(e => [e.symbol, e])),
  ...Object.fromEntries(DECOMPOSITION_COMPOUNDS.map(e => [e.symbol, e])),
  ...Object.fromEntries(ACIDS.map(e => [e.symbol, e])),
  ...Object.fromEntries(BASES.map(e => [e.symbol, e])),
  ...Object.fromEntries(REPLACEMENT_ELEMENTS.map(e => [e.symbol, e])),
  ...Object.fromEntries(REPLACEMENT_COMPOUNDS.map(e => [e.symbol, e])),
  ...PRODUCTS,
};

// ============ REACTION RULES ============
const REACTION_RULES: Record<string, ReactionRule> = {
  // Composition reactions
  'H₂+O₂': {
    reactants: ['H₂', 'O₂'],
    products: ['H₂O'],
    coefficients: { reactants: [2, 1], products: [2] },
    energyChange: 'exothermic',
  },
  'Na+Cl₂': {
    reactants: ['Na', 'Cl₂'],
    products: ['NaCl'],
    coefficients: { reactants: [2, 1], products: [2] },
    energyChange: 'exothermic',
    warning: 'Highly exothermic! Produces bright yellow flame.',
  },
  'Mg+O₂': {
    reactants: ['Mg', 'O₂'],
    products: ['MgO'],
    coefficients: { reactants: [2, 1], products: [2] },
    energyChange: 'exothermic',
    warning: 'Produces intense bright white light!',
  },
  'Fe+O₂': {
    reactants: ['Fe', 'O₂'],
    products: ['Fe₂O₃'],
    coefficients: { reactants: [4, 3], products: [2] },
    energyChange: 'exothermic',
  },
  'Ca+O₂': {
    reactants: ['Ca', 'O₂'],
    products: ['CaO'],
    coefficients: { reactants: [2, 1], products: [2] },
    energyChange: 'exothermic',
  },
  'K+Cl₂': {
    reactants: ['K', 'Cl₂'],
    products: ['KCl'],
    coefficients: { reactants: [2, 1], products: [2] },
    energyChange: 'exothermic',
    warning: 'Violent reaction! Purple flame.',
  },
  'Al+O₂': {
    reactants: ['Al', 'O₂'],
    products: ['Al₂O₃'],
    coefficients: { reactants: [4, 3], products: [2] },
    energyChange: 'exothermic',
  },

  // Decomposition reactions
  'H₂O₂': {
    reactants: ['H₂O₂'],
    products: ['H₂O', 'O₂'],
    coefficients: { reactants: [2], products: [2, 1] },
    energyChange: 'exothermic',
  },
  'CaCO₃': {
    reactants: ['CaCO₃'],
    products: ['CaO', 'CO₂'],
    coefficients: { reactants: [1], products: [1, 1] },
    energyChange: 'endothermic',
    warning: 'Requires heating to decompose.',
  },
  'KClO₃': {
    reactants: ['KClO₃'],
    products: ['KCl', 'O₂'],
    coefficients: { reactants: [2], products: [2, 3] },
    energyChange: 'exothermic',
    warning: 'Can be explosive! Handle with care.',
  },
  'NaHCO₃': {
    reactants: ['NaHCO₃'],
    products: ['Na₂CO₃', 'H₂O', 'CO₂'],
    coefficients: { reactants: [2], products: [1, 1, 1] },
    energyChange: 'endothermic',
  },
  'H₂CO₃': {
    reactants: ['H₂CO₃'],
    products: ['H₂O', 'CO₂'],
    coefficients: { reactants: [1], products: [1, 1] },
    energyChange: 'endothermic',
  },

  // Acid-Base reactions
  'HCl+NaOH': {
    reactants: ['HCl', 'NaOH'],
    products: ['NaCl', 'H₂O'],
    coefficients: { reactants: [1, 1], products: [1, 1] },
    energyChange: 'exothermic',
  },
  'HCl+KOH': {
    reactants: ['HCl', 'KOH'],
    products: ['KCl', 'H₂O'],
    coefficients: { reactants: [1, 1], products: [1, 1] },
    energyChange: 'exothermic',
  },
  'H₂SO₄+NaOH': {
    reactants: ['H₂SO₄', 'NaOH'],
    products: ['Na₂SO₄', 'H₂O'],
    coefficients: { reactants: [1, 2], products: [1, 2] },
    energyChange: 'exothermic',
  },
  'H₂SO₄+KOH': {
    reactants: ['H₂SO₄', 'KOH'],
    products: ['K₂SO₄', 'H₂O'],
    coefficients: { reactants: [1, 2], products: [1, 2] },
    energyChange: 'exothermic',
  },
  'HNO₃+NaOH': {
    reactants: ['HNO₃', 'NaOH'],
    products: ['NaNO₃', 'H₂O'],
    coefficients: { reactants: [1, 1], products: [1, 1] },
    energyChange: 'exothermic',
  },
  'HNO₃+KOH': {
    reactants: ['HNO₃', 'KOH'],
    products: ['KNO₃', 'H₂O'],
    coefficients: { reactants: [1, 1], products: [1, 1] },
    energyChange: 'exothermic',
  },
  'HCl+Ca(OH)₂': {
    reactants: ['HCl', 'Ca(OH)₂'],
    products: ['CaCl₂', 'H₂O'],
    coefficients: { reactants: [2, 1], products: [1, 2] },
    energyChange: 'exothermic',
  },
  'HCl+Mg(OH)₂': {
    reactants: ['HCl', 'Mg(OH)₂'],
    products: ['MgCl₂', 'H₂O'],
    coefficients: { reactants: [2, 1], products: [1, 2] },
    energyChange: 'exothermic',
  },

  // Single Replacement reactions
  'Zn+CuSO₄': {
    reactants: ['Zn', 'CuSO₄'],
    products: ['ZnSO₄', 'Cu'],
    coefficients: { reactants: [1, 1], products: [1, 1] },
    energyChange: 'exothermic',
  },
  'Zn+HCl': {
    reactants: ['Zn', 'HCl'],
    products: ['ZnCl₂', 'H₂'],
    coefficients: { reactants: [1, 2], products: [1, 1] },
    energyChange: 'exothermic',
  },
  'Zn+H₂SO₄': {
    reactants: ['Zn', 'H₂SO₄'],
    products: ['ZnSO₄', 'H₂'],
    coefficients: { reactants: [1, 1], products: [1, 1] },
    energyChange: 'exothermic',
  },
  'Fe+CuSO₄': {
    reactants: ['Fe', 'CuSO₄'],
    products: ['FeSO₄', 'Cu'],
    coefficients: { reactants: [1, 1], products: [1, 1] },
    energyChange: 'exothermic',
  },
  'Mg+HCl': {
    reactants: ['Mg', 'HCl'],
    products: ['MgCl₂', 'H₂'],
    coefficients: { reactants: [1, 2], products: [1, 1] },
    energyChange: 'exothermic',
    warning: 'Vigorous reaction with hydrogen gas release!',
  },
  'Mg+CuSO₄': {
    reactants: ['Mg', 'CuSO₄'],
    products: ['MgSO₄', 'Cu'],
    coefficients: { reactants: [1, 1], products: [1, 1] },
    energyChange: 'exothermic',
  },
  'Al+HCl': {
    reactants: ['Al', 'HCl'],
    products: ['AlCl₃', 'H₂'],
    coefficients: { reactants: [2, 6], products: [2, 3] },
    energyChange: 'exothermic',
  },
};

// ============ REACTION ENGINE ============
export class ReactionLabEngine {
  static getReaction(
    type: ReactionType,
    reactant1: string,
    reactant2?: string
  ): ReactionResult {
    if (!reactant1 || (type !== 'decomposition' && !reactant2)) {
      return {
        valid: false,
        equation: '',
        products: [],
        coefficients: { reactants: [], products: [] },
        energyChange: 'neutral',
        errorMessage: 'Please select all required reactants.',
        stoichiometricRatio: '0:0',
      };
    }

    let key: string;
    if (type === 'decomposition') {
      key = reactant1;
    } else {
      key = `${reactant1}+${reactant2}`;
      // Also try reverse order
      if (!REACTION_RULES[key]) {
        key = `${reactant2}+${reactant1}`;
      }
    }

    const rule = REACTION_RULES[key];

    if (!rule) {
      // Check reactivity for single replacement
      if (type === 'singleReplacement') {
        const element = ALL_CHEMICALS[reactant1!];
        const compound = ALL_CHEMICALS[reactant2!];
        
        if (element && compound && element.reactivity !== undefined) {
          const compoundMetal = getMetalFromCompound(reactant2!);
          const compoundElement = ALL_CHEMICALS[compoundMetal];
          
          if (compoundElement && compoundElement.reactivity !== undefined) {
            if (element.reactivity <= compoundElement.reactivity) {
              return {
                valid: false,
                equation: `${reactant1} + ${reactant2} → No Reaction`,
                products: [],
                coefficients: { reactants: [], products: [] },
                energyChange: 'neutral',
                errorMessage: `${reactant1} is less reactive than ${compoundMetal}. No reaction occurs. (Reactivity: ${element.reactivity} ≤ ${compoundElement.reactivity})`,
                stoichiometricRatio: '0:0',
              };
            }
          }
        }
      }

      return {
        valid: false,
        equation: `${reactant1}${reactant2 ? ` + ${reactant2}` : ''} → ?`,
        products: [],
        coefficients: { reactants: [], products: [] },
        energyChange: 'neutral',
        errorMessage: 'This combination does not form a known reaction.',
        stoichiometricRatio: '0:0',
      };
    }

    // Build equation string
    const reactantsStr = rule.coefficients.reactants
      .map((c, i) => (c > 1 ? `${c}${rule.reactants[i]}` : rule.reactants[i]))
      .join(' + ');

    const productsStr = rule.coefficients.products
      .map((c, i) => (c > 1 ? `${c}${rule.products[i]}` : rule.products[i]))
      .join(' + ');

    const equation = `${reactantsStr} → ${productsStr}`;

    // Calculate stoichiometric ratio
    const reactantSum = rule.coefficients.reactants.reduce((a, b) => a + b, 0);
    const productSum = rule.coefficients.products.reduce((a, b) => a + b, 0);
    const stoichiometricRatio = `${reactantSum}:${productSum}`;

    return {
      valid: true,
      equation,
      products: rule.products,
      coefficients: rule.coefficients,
      energyChange: rule.energyChange,
      warning: rule.warning,
      stoichiometricRatio,
    };
  }

  static getColorForChemical(symbol: string): string {
    return ALL_CHEMICALS[symbol]?.color || '#888888';
  }

  static getRadiusForChemical(symbol: string): number {
    const chemical = ALL_CHEMICALS[symbol];
    if (!chemical) return 15;
    
    // Size based on molar mass
    if (chemical.molarMass < 30) return 12;
    if (chemical.molarMass < 60) return 15;
    if (chemical.molarMass < 100) return 18;
    return 22;
  }

  static getMolarMass(symbol: string): number {
    return ALL_CHEMICALS[symbol]?.molarMass || 1;
  }

  static calculateLimitingReagent(
    reactant1: string,
    amount1: number,
    reactant2: string,
    amount2: number,
    coefficients: { reactants: number[]; products: number[] }
  ): { limiting: string; excess: string; excessAmount: number } {
    const molarMass1 = this.getMolarMass(reactant1);
    const molarMass2 = this.getMolarMass(reactant2);

    const moles1 = amount1 / molarMass1;
    const moles2 = amount2 / molarMass2;

    // Moles needed based on stoichiometric ratio
    const ratio = coefficients.reactants[0] / coefficients.reactants[1];
    const moles2Needed = moles1 / ratio;
    const moles1Needed = moles2 * ratio;

    if (moles2 < moles2Needed) {
      // Reactant 2 is limiting
      const excessMoles = moles1 - moles1Needed;
      return {
        limiting: reactant2,
        excess: reactant1,
        excessAmount: excessMoles * molarMass1,
      };
    } else {
      // Reactant 1 is limiting
      const excessMoles = moles2 - moles2Needed;
      return {
        limiting: reactant1,
        excess: reactant2,
        excessAmount: excessMoles * molarMass2,
      };
    }
  }
}

// Helper function to extract metal from compound
function getMetalFromCompound(compound: string): string {
  if (compound.startsWith('Cu')) return 'Cu';
  if (compound.startsWith('Zn')) return 'Zn';
  if (compound.startsWith('Fe')) return 'Fe';
  if (compound.startsWith('Ag')) return 'Ag';
  if (compound.startsWith('H')) return 'H';
  return '';
}
