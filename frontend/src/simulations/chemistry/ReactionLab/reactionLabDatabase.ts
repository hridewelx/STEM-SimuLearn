import {
  ChemicalElement,
  ReactionRule,
  ReactionType,
  ReactionResult,
} from "./types";

// ============ ELEMENTS FOR COMBINATION REACTIONS ============
export const COMBINATION_ELEMENTS_A: ChemicalElement[] = [
  {
    symbol: "H₂",
    name: "Hydrogen",
    color: "#E8F4FF",
    category: "gas",
    molarMass: 2.016,
  },
  {
    symbol: "Na",
    name: "Sodium",
    color: "#C0C0C0",
    category: "metal",
    reactivity: 5,
    molarMass: 22.99,
  },
  {
    symbol: "Mg",
    name: "Magnesium",
    color: "#A8A8A8",
    category: "metal",
    reactivity: 4,
    molarMass: 24.305,
  },
  {
    symbol: "Fe",
    name: "Iron",
    color: "#8B4513",
    category: "metal",
    reactivity: 2,
    molarMass: 55.845,
  },
  {
    symbol: "Ca",
    name: "Calcium",
    color: "#F0F0F0",
    category: "metal",
    reactivity: 4,
    molarMass: 40.078,
  },
  {
    symbol: "K",
    name: "Potassium",
    color: "#D4D4D4",
    category: "metal",
    reactivity: 6,
    molarMass: 39.098,
  },
  {
    symbol: "Al",
    name: "Aluminum",
    color: "#C0C0C0",
    category: "metal",
    reactivity: 3,
    molarMass: 26.982,
  },
];

export const COMBINATION_ELEMENTS_B: ChemicalElement[] = [
  {
    symbol: "O₂",
    name: "Oxygen",
    color: "#FFE4E4",
    category: "gas",
    molarMass: 32,
  },
  {
    symbol: "Cl₂",
    name: "Chlorine",
    color: "#90EE90",
    category: "gas",
    molarMass: 70.9,
  },
  {
    symbol: "S",
    name: "Sulfur",
    color: "#FFD700",
    category: "nonmetal",
    molarMass: 32.06,
  },
  {
    symbol: "N₂",
    name: "Nitrogen",
    color: "#E8E8FF",
    category: "gas",
    molarMass: 28.014,
  },
  {
    symbol: "Br₂",
    name: "Bromine",
    color: "#8B0000",
    category: "nonmetal",
    molarMass: 159.808,
  },
];

// ============ COMPOUNDS FOR DECOMPOSITION ============
export const DECOMPOSITION_COMPOUNDS: ChemicalElement[] = [
  {
    symbol: "H₂O₂",
    name: "Hydrogen Peroxide",
    color: "#E0F7FA",
    category: "compound",
    molarMass: 34.014,
  },
  {
    symbol: "CaCO₃",
    name: "Calcium Carbonate",
    color: "#FFFAF0",
    category: "compound",
    molarMass: 100.09,
  },
  {
    symbol: "KClO₃",
    name: "Potassium Chlorate",
    color: "#F0FFF0",
    category: "compound",
    molarMass: 122.55,
  },
  {
    symbol: "NaHCO₃",
    name: "Sodium Bicarbonate",
    color: "#FFFAF0",
    category: "compound",
    molarMass: 84.007,
  },
  {
    symbol: "H₂CO₃",
    name: "Carbonic Acid",
    color: "#F0F8FF",
    category: "compound",
    molarMass: 62.03,
  },
  {
    symbol: "NH₄NO₃",
    name: "Ammonium Nitrate",
    color: "#FFFFF0",
    category: "compound",
    molarMass: 80.043,
  },
];

// ============ ACIDS ============
export const ACIDS: ChemicalElement[] = [
  {
    symbol: "HCl",
    name: "Hydrochloric Acid",
    color: "#FF6B6B",
    category: "acid",
    molarMass: 36.46,
  },
  {
    symbol: "H₂SO₄",
    name: "Sulfuric Acid",
    color: "#FF4444",
    category: "acid",
    molarMass: 98.079,
  },
  {
    symbol: "HNO₃",
    name: "Nitric Acid",
    color: "#FF8C00",
    category: "acid",
    molarMass: 63.01,
  },
  {
    symbol: "CH₃COOH",
    name: "Acetic Acid",
    color: "#FFB6C1",
    category: "acid",
    molarMass: 60.052,
  },
  {
    symbol: "H₃PO₄",
    name: "Phosphoric Acid",
    color: "#FF6347",
    category: "acid",
    molarMass: 97.994,
  },
];

// ============ BASES ============
export const BASES: ChemicalElement[] = [
  {
    symbol: "NaOH",
    name: "Sodium Hydroxide",
    color: "#6B8CFF",
    category: "base",
    molarMass: 39.997,
  },
  {
    symbol: "KOH",
    name: "Potassium Hydroxide",
    color: "#7B68EE",
    category: "base",
    molarMass: 56.106,
  },
  {
    symbol: "Ca(OH)₂",
    name: "Calcium Hydroxide",
    color: "#87CEEB",
    category: "base",
    molarMass: 74.093,
  },
  {
    symbol: "NH₃",
    name: "Ammonia",
    color: "#ADD8E6",
    category: "base",
    molarMass: 17.031,
  },
  {
    symbol: "Mg(OH)₂",
    name: "Magnesium Hydroxide",
    color: "#B0E0E6",
    category: "base",
    molarMass: 58.32,
  },
];

// ============ ELEMENTS FOR SINGLE REPLACEMENT ============
export const REPLACEMENT_ELEMENTS: ChemicalElement[] = [
  {
    symbol: "Zn",
    name: "Zinc",
    color: "#C0C0C0",
    category: "metal",
    reactivity: 3,
    molarMass: 65.38,
  },
  {
    symbol: "Fe",
    name: "Iron",
    color: "#8B4513",
    category: "metal",
    reactivity: 2,
    molarMass: 55.845,
  },
  {
    symbol: "Cu",
    name: "Copper",
    color: "#B87333",
    category: "metal",
    reactivity: 1,
    molarMass: 63.546,
  },
  {
    symbol: "Mg",
    name: "Magnesium",
    color: "#A8A8A8",
    category: "metal",
    reactivity: 4,
    molarMass: 24.305,
  },
  {
    symbol: "Al",
    name: "Aluminum",
    color: "#C0C0C0",
    category: "metal",
    reactivity: 3,
    molarMass: 26.982,
  },
  {
    symbol: "Ag",
    name: "Silver",
    color: "#E0E0E0",
    category: "metal",
    reactivity: 0,
    molarMass: 107.87,
  },
];

export const REPLACEMENT_COMPOUNDS: ChemicalElement[] = [
  {
    symbol: "CuSO₄",
    name: "Copper Sulfate",
    color: "#4169E1",
    category: "salt",
    molarMass: 159.609,
  },
  {
    symbol: "ZnCl₂",
    name: "Zinc Chloride",
    color: "#F5F5DC",
    category: "salt",
    molarMass: 136.286,
  },
  {
    symbol: "FeCl₂",
    name: "Iron(II) Chloride",
    color: "#98FB98",
    category: "salt",
    molarMass: 126.751,
  },
  {
    symbol: "AgNO₃",
    name: "Silver Nitrate",
    color: "#F0F0F0",
    category: "salt",
    molarMass: 169.87,
  },
  {
    symbol: "HCl",
    name: "Hydrochloric Acid",
    color: "#FF6B6B",
    category: "acid",
    molarMass: 36.46,
  },
  {
    symbol: "H₂SO₄",
    name: "Sulfuric Acid",
    color: "#FF4444",
    category: "acid",
    molarMass: 98.079,
  },
];

// ============ PRODUCTS ============
export const PRODUCTS: Record<string, ChemicalElement> = {
  "H₂O": {
    symbol: "H₂O",
    name: "Water",
    color: "#87CEEB",
    category: "water",
    molarMass: 18.015,
  },
  NaCl: {
    symbol: "NaCl",
    name: "Sodium Chloride",
    color: "#FFFFFF",
    category: "salt",
    molarMass: 58.44,
  },
  KCl: {
    symbol: "KCl",
    name: "Potassium Chloride",
    color: "#F8F8FF",
    category: "salt",
    molarMass: 74.55,
  },
  "CaCl₂": {
    symbol: "CaCl₂",
    name: "Calcium Chloride",
    color: "#FFFAF0",
    category: "salt",
    molarMass: 110.98,
  },
  MgO: {
    symbol: "MgO",
    name: "Magnesium Oxide",
    color: "#FFFFFF",
    category: "compound",
    molarMass: 40.304,
  },
  FeO: {
    symbol: "FeO",
    name: "Iron(II) Oxide",
    color: "#2F4F4F",
    category: "compound",
    molarMass: 71.844,
  },
  "Fe₂O₃": {
    symbol: "Fe₂O₃",
    name: "Iron(III) Oxide",
    color: "#8B0000",
    category: "compound",
    molarMass: 159.69,
  },
  "Na₂O": {
    symbol: "Na₂O",
    name: "Sodium Oxide",
    color: "#F5F5F5",
    category: "compound",
    molarMass: 61.98,
  },
  CaO: {
    symbol: "CaO",
    name: "Calcium Oxide",
    color: "#FFFAF0",
    category: "compound",
    molarMass: 56.077,
  },
  "CO₂": {
    symbol: "CO₂",
    name: "Carbon Dioxide",
    color: "#D3D3D3",
    category: "gas",
    molarMass: 44.01,
  },
  "O₂": {
    symbol: "O₂",
    name: "Oxygen",
    color: "#FFE4E4",
    category: "gas",
    molarMass: 32,
  },
  "H₂": {
    symbol: "H₂",
    name: "Hydrogen",
    color: "#E8F4FF",
    category: "gas",
    molarMass: 2.016,
  },
  "Na₂SO₄": {
    symbol: "Na₂SO₄",
    name: "Sodium Sulfate",
    color: "#FFFFF0",
    category: "salt",
    molarMass: 142.04,
  },
  "K₂SO₄": {
    symbol: "K₂SO₄",
    name: "Potassium Sulfate",
    color: "#FFFFF0",
    category: "salt",
    molarMass: 174.26,
  },
  "ZnSO₄": {
    symbol: "ZnSO₄",
    name: "Zinc Sulfate",
    color: "#F5F5F5",
    category: "salt",
    molarMass: 161.47,
  },
  "FeSO₄": {
    symbol: "FeSO₄",
    name: "Iron(II) Sulfate",
    color: "#98FB98",
    category: "salt",
    molarMass: 151.908,
  },
  "ZnCl₂": {
    symbol: "ZnCl₂",
    name: "Zinc Chloride",
    color: "#F5F5DC",
    category: "salt",
    molarMass: 136.286,
  },
  Cu: {
    symbol: "Cu",
    name: "Copper",
    color: "#B87333",
    category: "metal",
    molarMass: 63.546,
  },
  Zn: {
    symbol: "Zn",
    name: "Zinc",
    color: "#C0C0C0",
    category: "metal",
    molarMass: 65.38,
  },
  Fe: {
    symbol: "Fe",
    name: "Iron",
    color: "#8B4513",
    category: "metal",
    molarMass: 55.845,
  },
  Ag: {
    symbol: "Ag",
    name: "Silver",
    color: "#E0E0E0",
    category: "metal",
    molarMass: 107.87,
  },
  "KNO₃": {
    symbol: "KNO₃",
    name: "Potassium Nitrate",
    color: "#F5FFFA",
    category: "salt",
    molarMass: 101.1,
  },
  "NaNO₃": {
    symbol: "NaNO₃",
    name: "Sodium Nitrate",
    color: "#F5FFFA",
    category: "salt",
    molarMass: 84.995,
  },
};

// ============ ALL CHEMICALS MAP ============
export const ALL_CHEMICALS: Record<string, ChemicalElement> = {
  ...Object.fromEntries(COMBINATION_ELEMENTS_A.map((e) => [e.symbol, e])),
  ...Object.fromEntries(COMBINATION_ELEMENTS_B.map((e) => [e.symbol, e])),
  ...Object.fromEntries(DECOMPOSITION_COMPOUNDS.map((e) => [e.symbol, e])),
  ...Object.fromEntries(ACIDS.map((e) => [e.symbol, e])),
  ...Object.fromEntries(BASES.map((e) => [e.symbol, e])),
  ...Object.fromEntries(REPLACEMENT_ELEMENTS.map((e) => [e.symbol, e])),
  ...Object.fromEntries(REPLACEMENT_COMPOUNDS.map((e) => [e.symbol, e])),
  ...PRODUCTS,
};

// ============ REACTION RULES ============
const REACTION_RULES: Record<string, ReactionRule> = {
  // ========== COMPOSITION REACTIONS ==========
  "H₂+O₂": {
    reactants: ["H₂", "O₂"],
    products: ["H₂O"],
    coefficients: { reactants: [2, 1], products: [2] },
    energyChange: "exothermic",
    explanation:
      "CLASSIFICATION:\n• H₂ → diatomic hydrogen (reducing agent, electron donor)\n• O₂ → diatomic oxygen (oxidizing agent, electron acceptor)\n\nMECHANISM:\nThis is a redox reaction. H₂ is oxidized (loses electrons): H₂ → 2H⁺ + 2e⁻. O₂ is reduced (gains electrons): O₂ + 4e⁻ → 2O²⁻. The electrons transfer, and covalent O-H bonds form in water molecules.\n\nREACTION:\n2H₂(g) + O₂(g) → 2H₂O(l)  ΔH = -572 kJ/mol\n\nOBSERVABLE RESULT:\nExplosive combustion with a blue flame. Water vapor condenses on cool surfaces. Significant heat released.",
    explanation_bn:
      "শ্রেণিবিন্যাস:\n• H₂ → দ্বিপারমাণবিক হাইড্রোজেন (বিজারক)\n• O₂ → দ্বিপারমাণবিক অক্সিজেন (জারক)\n\nকৌশল:\nএটি একটি রেডক্স বিক্রিয়া। H₂ জারিত হয়: H₂ → 2H⁺ + 2e⁻। O₂ বিজারিত হয়: O₂ + 4e⁻ → 2O²⁻।\n\nবিক্রিয়া:\n2H₂(g) + O₂(g) → 2H₂O(l)  ΔH = -572 kJ/mol\n\nফলাফল:\nনীল শিখা সহ বিস্ফোরক দহন। জলীয় বাষ্প ঘনীভূত হয়। তাপ নির্গত হয়।",
    conditions_bn:
      "ইগনিশন উৎস (স্ফুলিঙ্গ) প্রয়োজন। কক্ষ তাপমাত্রায় বিক্রিয়া করে না।",
    howToPerform_bn: "H₂ এবং O₂ এর ২:১ অনুপাত মেশান। স্ফুলিঙ্গ প্রয়োগ করুন।",
    conditions:
      "Requires ignition source (spark/flame) or Pt catalyst. Activation energy ~50 kJ/mol must be overcome. At room temperature: kinetically stable (no reaction). Above 500°C: spontaneous ignition.",
    howToPerform:
      "Mix H₂ and O₂ in 2:1 molar ratio. Apply spark or flame. CAUTION: Explosive! Use small quantities (<10 mL) in well-ventilated area. Alternatively, bubble H₂ through water with Pt catalyst for gentle reaction.",
  },
  "H₂+Br₂": {
    reactants: ["H₂", "Br₂"],
    products: ["HBr"],
    coefficients: { reactants: [1, 1], products: [2] },
    energyChange: "exothermic",
    warning: "Toxic! Use fume hood.",
    explanation:
      "CLASSIFICATION:\n• H₂ → oxidation state 0 (reducing agent)\n• Br₂ → halogen (oxidizing agent)\n\nMECHANISM:\nFree radical chain reaction. Initiation: Br₂ molecule absorbs UV photon and homolytically cleaves into 2Br• radicals. Propagation: Br• + H₂ → HBr + H•, then H• + Br₂ → HBr + Br•. Termination: Radicals recombine.\n\nREACTION:\nH₂(g) + Br₂(g) → 2HBr(g)  (Requires UV/Heat)\n\nOBSERVABLE RESULT:\nSlow fade of reddish-brown bromine vapor color as colorless HBr gas forms. Steamy fumes in moist air (hydrobromic acid mist).",
    explanation_bn:
      "শ্রেণিবিন্যাস:\n• H₂ → জারণ অবস্থা ০ (বিজারক)\n• Br₂ → হ্যালোজেন (জারক)\n\nকৌশল:\nফ্রি র‍্যাডিকেল চেইন বিক্রিয়া।\n\nবিক্রিয়া:\nH₂(g) + Br₂(g) → 2HBr(g) (UV/তাপ প্রয়োজন)\n\nফলাফল:\nব্রোমিন বাষ্পের রঙ ম্লান হয়ে বর্ণহীন HBr গ্যাস তৈরি হয়।",
    conditions_bn: "UV আলো বা তাপ (~২০০°C) প্রয়োজন।",
    howToPerform_bn: "H₂ এবং Br₂ বাষ্প মেশানো জারে UV আলো ফেলুন।",
    warning_bn: "বিষাক্ত! ফিউম হুড ব্যবহার করুন।",
    conditions:
      "Requires activation by UV light or heat (~200°C) to break Br-Br bond (193 kJ/mol). Reaction is slow at room temperature compared to explosive H₂+Cl₂ due to weaker bond energy but higher activation energy.",
    howToPerform:
      "Mix H₂ and Br₂ vapor in a gas jar. Shine a bright UV lamp or sunlight on the mixture. The brown color will slowly fade.",
  },
  "Na+Cl₂": {
    reactants: ["Na", "Cl₂"],
    products: ["NaCl"],
    coefficients: { reactants: [2, 1], products: [2] },
    energyChange: "exothermic",
    warning: "Highly exothermic! Produces bright yellow flame.",
    explanation:
      "CLASSIFICATION:\n• Na → alkali metal (strong reducing agent, loses 1 electron easily)\n• Cl₂ → halogen (strong oxidizing agent, gains 1 electron per atom)\n\nMECHANISM:\nElectron transfer reaction. Na donates its 3s¹ electron: Na → Na⁺ + e⁻ (oxidation). Each Cl atom accepts one electron: Cl₂ + 2e⁻ → 2Cl⁻ (reduction). The resulting Na⁺ and Cl⁻ ions form an ionic crystal lattice.\n\nREACTION:\n2Na(s) + Cl₂(g) → 2NaCl(s)  ΔH = -822 kJ/mol\n\nOBSERVABLE RESULT:\nVigorous reaction with bright yellow flame (Na emission). White crystalline NaCl (table salt) forms as solid product.",
    explanation_bn:
      "শ্রেণিবিন্যাস:\n• Na → ক্ষার ধাতু (তীব্র বিজারক)\n• Cl₂ → হ্যালোজেন (তীব্র জারক)\n\nকৌশল:\nইলেকট্রন স্থানান্তর বিক্রিয়া। Na+ এবং Cl- ল্যাটিস গঠন করে।\n\nবিক্রিয়া:\n2Na(s) + Cl₂(g) → 2NaCl(s)  ΔH = -822 kJ/mol\n\nফলাফল:\nউজ্জ্বল হলুদ শিখা সহ তীব্র বিক্রিয়া। সাদা লবণ (NaCl) তৈরি হয়।",
    warning_bn: "অত্যধিক তাপ উৎপাদী! উজ্জ্বল হলুদ শিখা।",
    conditions_bn: "স্বতঃস্ফূর্ত। কোনো প্রভাবক লাগে না।",
    howToPerform_bn: "Cl₂ গ্যাসে ছোট Na টুকরো প্রবেশ করান।",
    conditions:
      "Spontaneous upon contact at room temperature. No catalyst needed. Reaction is thermodynamically and kinetically favorable due to Na's low ionization energy (496 kJ/mol) and Cl's high electron affinity (-349 kJ/mol).",
    howToPerform:
      "Lower a small piece of Na metal into a flask of Cl₂ gas using a deflagrating spoon. Reaction is immediate and violent with bright yellow flame. Perform in fume hood with safety screen.",
  },
  "Mg+O₂": {
    reactants: ["Mg", "O₂"],
    products: ["MgO"],
    coefficients: { reactants: [2, 1], products: [2] },
    energyChange: "exothermic",
    warning: "Produces intense bright white light!",
    explanation:
      "**Classification:**\n• Mg → alkaline earth metal (reducing agent, loses 2 electrons)\n• O₂ → diatomic oxygen (oxidizing agent, gains electrons)\n\n**Mechanism:**\nRedox reaction with electron transfer. Mg is oxidized: Mg → Mg²⁺ + 2e⁻. Oxygen is reduced: O₂ + 4e⁻ → 2O²⁻. The Mg²⁺ and O²⁻ ions form ionic MgO with very high lattice energy (-3850 kJ/mol).\n\n**Reaction:**\n2Mg(s) + O₂(g) → 2MgO(s)  ΔH = -1204 kJ/mol\n\n**Observable Result:**\nIntense white light (~3000°C flame), white smoke (MgO particles), and white powdery ash remaining. Used in flares and fireworks.",
    explanation_bn:
      "শ্রেণিবিন্যাস:\n• Mg → ক্ষারীয় মৃত্তিকা ধাতু (বিজারক)\n• O₂ → অক্সিজেন (জারক)\n\nকৌশল:\nরেডক্স বিক্রিয়া। Mg জারিত হয় এবং O₂ বিজারিত হয়।\n\nবিক্রিয়া:\n2Mg(s) + O₂(g) → 2MgO(s)\n\nফলাফল:\nতীব্র সাদা আলো, সাদা ধোঁয়া এবং সাদা ছাই (MgO) অবশিষ্ট থাকে।",
    warning_bn: "তীব্র সাদা আলো তৈরি করে! সরাসরি তাকাবেন না।",
    conditions_bn: "ইগনিশন তাপমাত্রায় (~৪৭৩°C) উত্তপ্ত করা প্রয়োজন।",
    howToPerform_bn: "Mg রিবন বার্নারে ধরুন।",
    conditions:
      "Requires initial heating to ignition temperature (~473°C). Once ignited, self-sustaining due to extreme exothermicity. Cannot be extinguished with water (reacts with H₂O too).",
    howToPerform:
      "Hold Mg ribbon with tongs, ignite with Bunsen burner. Burns with blinding white light. DO NOT look directly at flame - causes eye damage. Collect white MgO ash after cooling.",
  },
  "Fe+O₂": {
    reactants: ["Fe", "O₂"],
    products: ["Fe₂O₃"],
    coefficients: { reactants: [4, 3], products: [2] },
    energyChange: "exothermic",
    explanation:
      "Iron oxidation (rusting) is thermodynamically spontaneous (ΔG = -742 kJ/mol) but kinetically slow at room temperature due to the protective oxide layer. The reaction rate increases significantly with temperature, moisture, and electrolytes (salt). At high temperatures, iron burns directly in oxygen.",
    explanation_bn:
      "আয়রন জারণ (মরিচা ধরা) তাপগতিয়ভাবে স্বতঃস্ফূর্ত কিন্তু কক্ষ তাপমাত্রায় ধীর। তাপমাত্রা, আর্দ্রতা এবং লবণের উপস্থিতিতে বিক্রিয়ার হার বাড়ে। উচ্চ তাপমাত্রায় লোহা অক্সিজেনে জ্বলে।",
    conditions_bn:
      "কক্ষ তাপমাত্রায় খুব ধীর। দ্রুত দহন: লোহাকে লাল-গরম (~৭০০°C) করতে হয়।",
    howToPerform_bn:
      "মরিচা: আর্দ্র বাতাসে রাখুন। দহন: স্টিল উল গরম করে বিশুদ্ধ অক্সিজেনে প্রবেশ করান।",
    conditions:
      "Room temperature: very slow (days-weeks). Accelerated by: moisture, salt, heat. Rapid combustion: requires heating iron to red-hot (~700°C) or using fine iron powder.",
    howToPerform:
      "For slow oxidation: expose iron to moist, salty air. For rapid combustion: heat steel wool until red-hot and introduce into pure oxygen. The iron will burn with sparks.",
  },
  "Ca+O₂": {
    reactants: ["Ca", "O₂"],
    products: ["CaO"],
    coefficients: { reactants: [2, 1], products: [2] },
    energyChange: "exothermic",
    explanation:
      "Calcium readily reacts with oxygen due to its low ionization energy. The formation of CaO (quicklime) is highly exothermic (ΔH = -635 kJ/mol). The ionic bonding in CaO contributes to its high melting point and stability.",
    explanation_bn:
      "ক্যালসিয়ামের কম আয়নীকরণ শক্তির কারণে এটি অক্সিজেনের সাথে সহজেই বিক্রিয়া করে। CaO (কুইকলাইম) গঠন অত্যধিক তাপ উৎপাদী।",
    conditions_bn: "বাল্ক ধাতুর জন্য প্রাথমিক উত্তাপ প্রয়োজন।",
    howToPerform_bn:
      "বুন্সেন বার্নার দিয়ে ক্যালসিয়াম ধাতুর টুকরো গরম করুন। ধাতু লাল-কমলা শিখা সহ জ্বলে।",
    conditions:
      "Requires initial heating for bulk metal. Powdered calcium may ignite spontaneously in air. Temperature: ignition ~300°C. Standard atmospheric pressure.",
    howToPerform:
      "Heat calcium metal turnings with a Bunsen burner until ignition occurs. The metal burns with a brick-red to orange flame producing white calcium oxide powder.",
  },
  "K+Cl₂": {
    reactants: ["K", "Cl₂"],
    products: ["KCl"],
    coefficients: { reactants: [2, 1], products: [2] },
    energyChange: "exothermic",
    warning: "Violent reaction! Purple flame.",
    explanation:
      "Potassium is more reactive than sodium due to its larger atomic radius and lower ionization energy. The reaction with chlorine is extremely exothermic and spontaneous. The purple flame is characteristic of potassium's emission spectrum.",
    explanation_bn:
      "ক্লোরিনের সাথে পটাশিয়ামের বিক্রিয়া অত্যন্ত তাপ উৎপাদী এবং স্বতঃস্ফূর্ত। বেগুনি শিখা পটাশিয়ামের বৈশিষ্ট্য।",
    warning_bn: "হিংস্র বিক্রিয়া! বেগুনি শিখা।",
    conditions_bn: "কক্ষ তাপমাত্রায় স্বতঃস্ফূর্ত। অত্যন্ত সক্রিয়!",
    howToPerform_bn:
      "ক্লোরিন গ্যাসে সামান্য পটাশিয়াম দিন। বিক্রিয়াটি হিংস্র।",
    conditions:
      "Spontaneous at room temperature. No heating required. EXTREMELY REACTIVE - occurs explosively upon contact. Phase: Solid K + gaseous Cl₂.",
    howToPerform:
      "EXTREME CAUTION REQUIRED. Use only trace amounts. Place a tiny piece of potassium in a deflagrating spoon and lower into a flask of chlorine gas. The reaction is violent and immediate.",
  },
  "Al+O₂": {
    reactants: ["Al", "O₂"],
    products: ["Al₂O₃"],
    coefficients: { reactants: [4, 3], products: [2] },
    energyChange: "exothermic",
    explanation:
      "Aluminum is thermodynamically very reactive (ΔG = -1582 kJ/mol for 4Al + 3O₂), but kinetically protected by a thin, impervious Al₂O₃ layer (passivation). This oxide layer is only 4nm thick but extremely stable, preventing further oxidation at room temperature.",
    explanation_bn:
      "অ্যালুমিনিয়াম খুব সক্রিয়, কিন্তু একটি পাতলা Al₂O₃ স্তরের (প্যাসিভেশন) কারণে সুরক্ষিত থাকে। এই অক্সাইড স্তরটি আরও জারণ রোধ করে।",
    conditions_bn:
      "কক্ষ তাপমাত্রা: কেবল পৃষ্ঠের জারণ। দহন: গুঁড়ো অ্যালুমিনিয়াম এবং উচ্চ তাপমাত্রা প্রয়োজন।",
    howToPerform_bn:
      "প্যাসিভেশন: অ্যালুমিনিয়াম বাতাসে রাখুন। দহন: পাউডার ব্যবহার করুন।",
    conditions:
      "Room temperature: only surface oxidation (passivation). Bulk combustion: requires powdered aluminum and high temperature (~660°C melting point). Thermite reaction uses Fe₂O₃ as oxygen source.",
    howToPerform:
      "For passivation: simply expose aluminum to air (instantaneous). For combustion: use aluminum powder mixed with an oxidizer, ignite with magnesium ribbon. Used in thermite welding and pyrotechnics.",
  },

  // ========== DECOMPOSITION REACTIONS ==========
  "H₂O₂": {
    reactants: ["H₂O₂"],
    products: ["H₂O", "O₂"],
    coefficients: { reactants: [2], products: [2, 1] },
    energyChange: "exothermic",
    explanation:
      "CLASSIFICATION:\n• H₂O₂ → hydrogen peroxide (oxidizer and reducer)\n\nMECHANISM:\nDisproportionation redox reaction. Oxygen in H₂O₂ (oxidation state -1) is both oxidized to O₂ (0) and reduced to H₂O (-2). The O-O single bond is relatively weak (146 kJ/mol) and breaks easily.\n\nREACTION:\n2H₂O₂(aq) → 2H₂O(l) + O₂(g)  ΔH = -196 kJ/mol\n\nOBSERVABLE RESULT:\nSlow bubbling of oxygen gas. Rapid effervescence if catalyst (KMnO₄, MnO₂, or catalase from blood/yeast) is added.",
    explanation_bn:
      "শ্রেণিবিন্যাস:\n• H₂O₂ → হাইড্রোজেন পারক্সাইড\n\nকৌশল:\nডিসপ্রোপোরশনেশন রেডক্স বিক্রিয়া। অক্সিজেন জারিত ও বিজারিত হয়।\n\nবিক্রিয়া:\n2H₂O₂(aq) → 2H₂O(l) + O₂(g)\n\nফলাফল:\nঅক্সিজেন গ্যাসের বুদবুদ। প্রভাবক থাকলে দ্রুত বুদবুদ।",
    conditions_bn: "স্বতঃস্ফূর্ত কিন্তু ধীর। প্রভাবক (MnO₂) হার বাড়ায়।",
    howToPerform_bn: "হাইড্রোজেন পারক্সাইডে এক চিমটি MnO₂ যোগ করুন।",
    conditions:
      "Spontaneous but slow at room temp. Catalysts (MnO₂, Fe³⁺, I⁻) or UV light dramatically accelerate the rate. Store in dark bottles.",
    howToPerform:
      "Add a pinch of manganese dioxide (MnO₂) to hydrogen peroxide solution. Immediate, vigorous bubbling occurs. A glowing splint will confirm the gas is oxygen.",
  },
  "CaCO₃": {
    reactants: ["CaCO₃"],
    products: ["CaO", "CO₂"],
    coefficients: { reactants: [1], products: [1, 1] },
    energyChange: "endothermic",
    warning: "Requires strong heating (>840°C).",
    explanation:
      "CLASSIFICATION:\n• CaCO₃ → ionic salt (lattice structure)\n\nMECHANISM:\nThermal decomposition. High temperature vibrational energy overcomes the lattice energy and breaks the C-O bond in the carbonate ion (CO₃²⁻ → O²⁻ + CO₂). The entropy increase (ΔS > 0) from gas formation drives the process at high T.\n\nREACTION:\nCaCO₃(s) → CaO(s) + CO₂(g)  ΔH = +178 kJ/mol\n\nOBSERVABLE RESULT:\nWhite powder remains white (CaO looks like CaCO₃) but mass decreases due to CO₂ loss. Limewater test confirms CO₂.",
    explanation_bn:
      "শ্রেণিবিন্যাস:\n• CaCO₃ → আয়নিক লবণ\n\nকৌশল:\nতাপীয় বিয়োজন। কার্বনেট আয়ন ভেঙে যায়।\n\nবিক্রিয়া:\nCaCO₃(s) → CaO(s) + CO₂(g)\n\nফলাফল:\nসাদা পাউডার (CaO) থেকে যায় এবং CO₂ বের হয়।",
    warning_bn: "তীব্র উত্তাপ প্রয়োজন (>৮৪০°C)।",
    conditions_bn: "T > ৮৪০°C প্রয়োজন।",
    howToPerform_bn:
      "টেস্ট টিউবে ক্যালসিয়াম কার্বনেট চিপস তীব্রভাবে গরম করুন।",
    conditions:
      "Requires T > 840°C for spontaneous decomposition (where ΔG becomes negative). Industrial rotation kilns use this to make quicklime (CaO).",
    howToPerform:
      "Heat calcium carbonate chips strongly in a test tube with a delivery tube leading to limewater. The limewater turns milky, proving CO₂ evolution.",
  },
  "KClO₃": {
    reactants: ["KClO₃"],
    products: ["KCl", "O₂"],
    coefficients: { reactants: [2], products: [2, 3] },
    energyChange: "exothermic",
    warning: "Explosive risk with organics!",
    explanation:
      "CLASSIFICATION:\n• KClO₃ → strong oxidizing agent\n\nMECHANISM:\nRedox decomposition. Chlorine reduces from +5 to -1. Oxygen oxidizes from -2 to 0. Breaking the Cl-O bonds requires initial energy, but the overall process releases energy.\n\nREACTION:\n2KClO₃(s) → 2KCl(s) + 3O₂(g)\n\nOBSERVABLE RESULT:\nSolid melts, then bubbles vigorously as oxygen is evolved. White solid residue (KCl) remains.",
    explanation_bn:
      "শ্রেণিবিন্যাস:\n• KClO₃ → তীব্র জারক\n\nকৌশল:\nরেডক্স বিয়োজন। ক্লোরিন ও অক্সিজেন জারিত/বিজারিত হয়।\n\nবিক্রিয়া:\n2KClO₃(s) → 2KCl(s) + 3O₂(g)\n\nফলাফল:\nকঠিন পদার্থ গলে যায় এবং বুদবুদ হয়। সাদা অবশেষ (KCl) থাকে।",
    warning_bn: "জৈব পদার্থের সাথে বিস্ফোরক ঝুঁকি!",
    conditions_bn: "~৪০০°C তাপ বা MnO₂ সহ ~১৫০°C।",
    howToPerform_bn: "সামান্য KClO₃ এর সাথে MnO₂ মেশান এবং গরম করুন।",
    conditions:
      "Requires heating to ~400°C, or ~150°C if MnO₂ catalyst is used. CAUTION: Contact with combustibles (sugar, sulfur) can cause detonation.",
    howToPerform:
      "Mix small amount of KClO₃ with trace MnO₂ (catalyst). Heat gently in test tube. Test evolved gas with glowing splint (relights brilliantly).",
  },
  "NaHCO₃": {
    reactants: ["NaHCO₃"],
    products: ["Na₂CO₃", "H₂O", "CO₂"],
    coefficients: { reactants: [2], products: [1, 1, 1] },
    energyChange: "endothermic",
    explanation:
      "CLASSIFICATION:\n• NaHCO₃ → sodium bicarbonate (amphoteric salt)\n\nMECHANISM:\nThermal instability of the bicarbonate ion. Proton transfer occurs between two HCO₃⁻ ions: 2HCO₃⁻ → H₂CO₃ + CO₃²⁻, followed by dehydration: H₂CO₃ → H₂O + CO₂.\n\nREACTION:\n2NaHCO₃(s) → Na₂CO₃(s) + H₂O(g) + CO₂(g)\n\nOBSERVABLE RESULT:\nPowder 'dances' as gas escapes. Water droplets condense on cool parts of tube. Gas turns limewater milky.",
    explanation_bn:
      "শ্রেণিবিন্যাস:\n• NaHCO₃ → সোডিয়াম বাইকার্বোনেট\n\nকৌশল:\nবাইকার্বোনেট আয়নের তাপীয় অস্থিরতা।\n\nবিক্রিয়া:\n2NaHCO₃(s) → Na₂CO₃(s) + H₂O(g) + CO₂(g)\n\nফলাফল:\nপাউডার 'নাচে' কারণ গ্যাস বের হয়। চুনের পানি ঘোলা হয়।",
    conditions_bn: ">৫০°C এ ধীরে, >২০০°C এ দ্রুত ঘটে।",
    howToPerform_bn: "বেকিং সোডা গরম করুন এবং গ্যাস পরীক্ষা করুন।",
    conditions:
      "Occurs slowly >50°C, rapidly >200°C. Common Leavening reaction in baking (cookies/cakes rise).",
    howToPerform:
      "Heat baking soda in a test tube. Pass gas through delivery tube into limewater to verifying CO₂.",
  },
  "H₂CO₃": {
    reactants: ["H₂CO₃"],
    products: ["H₂O", "CO₂"],
    coefficients: { reactants: [1], products: [1, 1] },
    energyChange: "endothermic",
    explanation:
      "CLASSIFICATION:\n• H₂CO₃ → weak acid (unstable)\n\nMECHANISM:\nDehydration. The molecule is structurally unstable relative to CO₂ + H₂O. Kinetic barrier is very low.\n\nREACTION:\nH₂CO₃(aq) ⇌ H₂O(l) + CO₂(g)\n\nOBSERVABLE RESULT:\nEffervescence (bubbling) in carbonated water/soda. Use of nucleation sites (Mentos) accelerates gas release.",
    explanation_bn:
      "শ্রেণিবিন্যাস:\n• H₂CO₃ → দুর্বল এসিড (অস্থির)\n\nকৌশল:\nনিরুদন। অণু গঠনগতভাবে অস্থির।\n\nবিক্রিয়া:\nH₂CO₃(aq) ⇌ H₂O(l) + CO₂(g)\n\nফলাফল:\nকার্বনেটেড পানীয়/সোডায় বুদবুদ।",
    conditions_bn: "কক্ষ তাপমাত্রায় ও চাপে স্বতঃস্ফূর্ত।",
    howToPerform_bn: "সোডার বোতল খুলুন। CO₂ বুদবুদ বের হবে।",
    conditions:
      "Spontaneous at room temperature and pressure. Equilibrium strongly favors CO₂ gas release when open to atmosphere.",
    howToPerform:
      "Simply open a bottle of soda. The pressure drop shifts equilibrium to the right, releasing CO₂ bubbles.",
  },
  "HCl+NH₃": {
    reactants: ["HCl", "NH₃"],
    products: ["NH₄Cl"],
    coefficients: { reactants: [1, 1], products: [1] },
    energyChange: "exothermic",
    explanation:
      "CLASSIFICATION:\n• HCl → strong Brønsted acid (proton donor)\n• NH₃ → weak Brønsted base (lone-pair proton acceptor)\n\nMECHANISM:\nGas-phase proton transfer. The lone pair on Nitrogen attacks the H on HCl. H-Cl bond breaks, forming N-H bond. Identical to solution acid-base but forms solid lattice immediately.\n\nREACTION:\nHCl(g) + NH₃(g) → NH₄Cl(s)\n\nOBSERVABLE RESULT:\nTypical 'magic' chemistry demo. Two colorless gases mix to form dense WHITE SMOKE (microscopic solid particles of ammonium chloride).",
    explanation_bn:
      "শ্রেণিবিন্যাস:\n• HCl → তীব্র এসিড\n• NH₃ → দুর্বল ক্ষার\n\nকৌশল:\nগ্যাসীয় প্রোটন স্থানান্তর। সাদা ধোঁয়া তৈরি হয়।\n\nবিক্রিয়া:\nHCl(g) + NH₃(g) → NH₄Cl(s)\n\nফলাফল:\nদুটি বর্ণহীন গ্যাস মিশে সাদা ধোঁয়া (অ্যামোনিয়াম ক্লোরাইড) তৈরি করে।",
    conditions_bn: "কক্ষ তাপমাত্রায় স্বতঃস্ফূর্ত।",
    howToPerform_bn:
      "ঘন HCl ও ঘন NH₃ এর বাষ্প কাছাকাছি আনুন। সাদা ধোঁয়ার রিং তৈরি হবে।",
    conditions:
      "Spontaneous at room temperature. Requires gas phase contact (vapors from concentrated solutions).",
    howToPerform:
      "Dip one Q-tip in conc. HCl, another in conc. NH₃ (ammonium hydroxide). Bring them close together. White smoke rings form in the air between them.",
  },

  // ========== ACID-BASE REACTIONS ==========
  // ========== ACID-BASE REACTIONS ==========
  "HCl+NaOH": {
    reactants: ["HCl", "NaOH"],
    products: ["NaCl", "H₂O"],
    coefficients: { reactants: [1, 1], products: [1, 1] },
    energyChange: "exothermic",
    explanation:
      "CLASSIFICATION:\n• HCl → strong acid\n• NaOH → strong base\n\nMECHANISM:\nProton transfer neutralization. The H⁺ from the acid combines with the OH⁻ from the base to form water (H⁺ + OH⁻ → H₂O). Spectator ions (Na⁺, Cl⁻) remain in solution.\n\nREACTION:\nHCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)  ΔH ≈ -57 kJ/mol\n\nOBSERVABLE RESULT:\nTemperature rises (exothermic). pH changes from acidic/basic to neutral (pH 7). Solution remains colorless.",
    explanation_bn:
      "শ্রেণিবিন্যাস:\n• HCl → তীব্র এসিড\n• NaOH → তীব্র ক্ষার\n\nকৌশল:\nপ্রশমন। H⁺ এবং OH⁻ মিলে পানি তৈরি করে।\n\nবিক্রিয়া:\nHCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)  ΔH ≈ -57 kJ/mol\n\nফলাফল:\nতাপমাত্রা বৃদ্ধি পায় (তাপ উৎপাদী)। দ্রবণ নিরপেক্ষ হয়।",
    conditions_bn: "কক্ষ তাপমাত্রায় স্বতঃস্ফূর্ত।",
    howToPerform_bn: "সমান মোলার HCl এবং NaOH মেশান।",
    conditions:
      "Spontaneous at room temperature. Reaction is diffusion-limited (instantaneous upon mixing).",
    howToPerform:
      "Mix equal molar amounts of HCl and NaOH. Use an indicator (phenolphthalein) to see the color change at the endpoint.",
  },
  "HCl+KOH": {
    reactants: ["HCl", "KOH"],
    products: ["KCl", "H₂O"],
    coefficients: { reactants: [1, 1], products: [1, 1] },
    energyChange: "exothermic",
    explanation:
      "CLASSIFICATION:\n• HCl → strong acid\n• KOH → strong base\n\nMECHANISM:\nStrong acid-strong base neutralization. Identical mechanism to HCl+NaOH. K⁺ and Cl⁻ are spectator ions.\n\nREACTION:\nHCl(aq) + KOH(aq) → KCl(aq) + H₂O(l)  ΔH ≈ -57 kJ/mol\n\nOBSERVABLE RESULT:\nHeat release. pH neutralization. Formation of potassium chloride solution.",
    explanation_bn:
      "শ্রেণিবিন্যাস:\n• HCl → তীব্র এসিড\n• KOH → তীব্র ক্ষার\n\nকৌশল:\nতীব্র এসিড-তীব্র ক্ষার প্রশমন।\n\nবিক্রিয়া:\nHCl(aq) + KOH(aq) → KCl(aq) + H₂O(l)\n\nফলাফল:\nতাপ নির্গমন। নিরপেক্ষ pH।",
    conditions_bn: "কক্ষ তাপমাত্রায় স্বতঃস্ফূর্ত।",
    howToPerform_bn: "সূচক পরিবর্তন না হওয়া পর্যন্ত টাইট্রেট করুন।",
    conditions: "Spontaneous at room temperature. 1:1 molar stoichiometry.",
    howToPerform:
      "Titrate KOH with HCl until indicator changes color. Evaporate to obtain KCl crystals.",
  },
  "H₂SO₄+NaOH": {
    reactants: ["H₂SO₄", "NaOH"],
    products: ["Na₂SO₄", "H₂O"],
    coefficients: { reactants: [1, 2], products: [1, 2] },
    energyChange: "exothermic",
    explanation:
      "CLASSIFICATION:\n• H₂SO₄ → strong diprotic acid\n• NaOH → strong base\n\nMECHANISM:\nTwo-step neutralization. H₂SO₄ releases two protons. Two moles of NaOH are required to neutralize one mole of acid.\n\nREACTION:\nH₂SO₄(aq) + 2NaOH(aq) → Na₂SO₄(aq) + 2H₂O(l)  ΔH ≈ -114 kJ/mol\n\nOBSERVABLE RESULT:\nSignificant heat release (more than monoprotic acids). Neutral solution formed.",
    explanation_bn:
      "শ্রেণিবিন্যাস:\n• H₂SO₄ → তীব্র দ্বিখারীয় এসিড\n• NaOH → তীব্র ক্ষার\n\nকৌশল:\nদ্বি-ধাপ প্রশমন।\n\nবিক্রিয়া:\nH₂SO₄(aq) + 2NaOH(aq) → Na₂SO₄(aq) + 2H₂O(l)\n\nফলাফল:\nউল্লেখযোগ্য তাপ নির্গমন। নিরপেক্ষ দ্রবণ।",
    conditions_bn: "স্বতঃস্ফূর্ত। সতর্কতা: অত্যন্ত তাপ উৎপাদী।",
    howToPerform_bn: "ধীরে ধীরে ক্ষারে এসিড যোগ করুন।",
    conditions:
      "Spontaneous. CAUTION: Highly exothermic, especially with concentrated acid.",
    howToPerform:
      "Add dilute acid to base slowly. Monitor temperature. 1:2 stoichiometry needed for complete reaction.",
  },
  "H₂SO₄+KOH": {
    reactants: ["H₂SO₄", "KOH"],
    products: ["K₂SO₄", "H₂O"],
    coefficients: { reactants: [1, 2], products: [1, 2] },
    energyChange: "exothermic",
    explanation:
      "CLASSIFICATION:\n• H₂SO₄ → strong diprotic acid\n• KOH → strong base\n\nMECHANISM:\nComplete neutralization requires two OH⁻ ions for every H₂SO₄ molecule. Forms potassium sulfate salt.\n\nREACTION:\nH₂SO₄(aq) + 2KOH(aq) → K₂SO₄(aq) + 2H₂O(l)\n\nOBSERVABLE RESULT:\nTemperature increase. pH neutralization. K₂SO₄ stays in solution (soluble).",
    explanation_bn:
      "শ্রেণিবিন্যাস:\n• H₂SO₄ → তীব্র দ্বিখারীয় এসিড\n• KOH → তীব্র ক্ষার\n\nকৌশল:\nH₂SO₄ এর প্রতিটি অণুর জন্য দুটি OH⁻ আয়ন প্রয়োজন। পটাশিয়াম সালফেট লবণ তৈরি হয়।\n\nবিক্রিয়া:\nH₂SO₄(aq) + 2KOH(aq) → K₂SO₄(aq) + 2H₂O(l)\n\nফলাফল:\nতাপমাত্রা বৃদ্ধি। নিরপেক্ষ pH। K₂SO₄ দ্রবণে থাকে।",
    conditions_bn: "কক্ষ তাপমাত্রায় স্বতঃস্ফূর্ত।",
    howToPerform_bn: "লঘু H₂SO₄ (১ ভাগ) এবং KOH (২ ভাগ) মেশান।",
    conditions:
      "Spontaneous at room temperature. Use dilute solutions for safety.",
    howToPerform:
      "Mix dilute H₂SO₄ (1 part) with KOH solution (2 parts). Evaporate water to crystallize the fertilizer salt K₂SO₄.",
  },
  "HNO₃+NaOH": {
    reactants: ["HNO₃", "NaOH"],
    products: ["NaNO₃", "H₂O"],
    coefficients: { reactants: [1, 1], products: [1, 1] },
    energyChange: "exothermic",
    explanation:
      "CLASSIFICATION:\n• HNO₃ → strong acid (oxidizing anion)\n• NaOH → strong base\n\nMECHANISM:\nSimple proton transfer. Nitrate ion (NO₃⁻) is a spectator in neutralization (though reactive in redox contexts).\n\nREACTION:\nHNO₃(aq) + NaOH(aq) → NaNO₃(aq) + H₂O(l)\n\nOBSERVABLE RESULT:\nExothermic warming. Clear solution of sodium nitrate stays.",
    explanation_bn:
      "শ্রেণিবিন্যাস:\n• HNO₃ → তীব্র এসিড\n• NaOH → তীব্র ক্ষার\n\nকৌশল:\nপ্রোটন স্থানান্তর। নাইট্রেট আয়ন দর্শক আয়ন।\n\nবিক্রিয়া:\nHNO₃(aq) + NaOH(aq) → NaNO₃(aq) + H₂O(l)\n\nফলাফল:\nতাপ নির্গমন। সোডিয়াম নাইট্রেটের স্বচ্ছ দ্রবণ।",
    conditions_bn: "কক্ষ তাপমাত্রায় স্বতঃস্ফূর্ত।",
    howToPerform_bn: "লঘু এসিড এবং ক্ষার মেশান।",
    conditions: "Spontaneous at room temperature.",
    howToPerform:
      "Mix dilute acid and base. Result is sodium nitrate solution - useful for making fertilizer or flash powder (careful evaporation required).",
  },
  "HNO₃+KOH": {
    reactants: ["HNO₃", "KOH"],
    products: ["KNO₃", "H₂O"],
    coefficients: { reactants: [1, 1], products: [1, 1] },
    energyChange: "exothermic",
    explanation:
      "CLASSIFICATION:\n• HNO₃ → strong acid\n• KOH → strong base\n\nMECHANISM:\nNeutralization forming potassium nitrate (Saltpeter). The H⁺ and OH⁻ combine to form water.\n\nREACTION:\nHNO₃(aq) + KOH(aq) → KNO₃(aq) + H₂O(l)\n\nOBSERVABLE RESULT:\nHeat generated. Neutral pH. KNO₃ is highly soluble (no precipitate).",
    explanation_bn:
      "শ্রেণিবিন্যাস:\n• HNO₃ → তীব্র এসিড\n• KOH → তীব্র ক্ষার\n\nকৌশল:\nপ্রশমন। সল্টপিটার (পটাশিয়াম নাইট্রেট) তৈরি হয়।\n\nবিক্রিয়া:\nHNO₃(aq) + KOH(aq) → KNO₃(aq) + H₂O(l)\n\nফলাফল:\nতাপ উৎপন্ন হয়। নিরপেক্ষ pH। KNO₃ অত্যন্ত দ্রবণীয়।",
    conditions_bn: "স্বতঃস্ফূর্ত।",
    howToPerform_bn: "সমান মোল প্রশমিত করুন।",
    conditions:
      "Spontaneous. CAUTION: Evaporated solid KNO₃ is a strong oxidizer.",
    howToPerform:
      "Neutralize equal moles. Evaporate solution to get crystals of saltpeter (historical gunpowder ingredient).",
  },
  "HCl+Ca(OH)₂": {
    reactants: ["HCl", "Ca(OH)₂"],
    products: ["CaCl₂", "H₂O"],
    coefficients: { reactants: [2, 1], products: [1, 2] },
    energyChange: "exothermic",
    explanation:
      "CLASSIFICATION:\n• HCl → strong acid\n• Ca(OH)₂ → strong base (sparingly soluble)\n\nMECHANISM:\nAcid dissolves the slightly soluble base. 2HCl neutralized by one Ca(OH)₂.\n\nREACTION:\n2HCl(aq) + Ca(OH)₂(s/aq) → CaCl₂(aq) + 2H₂O(l)\n\nOBSERVABLE RESULT:\nCloudy lime water (suspension) turns clear as the solid Ca(OH)₂ dissolves and reacts. Heat released.",
    explanation_bn:
      "শ্রেণিবিন্যাস:\n• HCl → তীব্র এসিড\n• Ca(OH)₂ → ক্ষার (স্বল্প দ্রবণীয়)\n\nকৌশল:\nএসিড কঠিন ক্ষারকে দ্রবীভূত করে।\n\nবিক্রিয়া:\n2HCl(aq) + Ca(OH)₂(s/aq) → CaCl₂(aq) + 2H₂O(l)\n\nফলাফল:\nঘোলা চুনের পানি স্বচ্ছ হয়ে যায়।",
    conditions_bn: "স্বতঃস্ফূর্ত।",
    howToPerform_bn: "চুনের পানির সাসপেনশনে লঘু HCl যোগ করুন।",
    conditions: "Spontaneous. Reacts with solid or aqueous Ca(OH)₂.",
    howToPerform:
      "Add dilute HCl to a milky suspension of Ca(OH)₂. The liquid clears as CaCl₂ forms (highly soluble).",
  },
  "HCl+Mg(OH)₂": {
    reactants: ["HCl", "Mg(OH)₂"],
    products: ["MgCl₂", "H₂O"],
    coefficients: { reactants: [2, 1], products: [1, 2] },
    energyChange: "exothermic",
    explanation:
      "CLASSIFICATION:\n• HCl → strong acid (stomach acid sim.)\n• Mg(OH)₂ → weak/insoluble base (milk of magnesia)\n\nMECHANISM:\nNeutralization. Insoluble Mg(OH)₂ solid consumes H⁺ ions, pulling the dissolution equilibrium forward.\n\nREACTION:\n2HCl(aq) + Mg(OH)₂(s) → MgCl₂(aq) + 2H₂O(l)\n\nOBSERVABLE RESULT:\nWhite suspension of milk of magnesia gradually clears. Stomach acid neutralization simulation.",
    explanation_bn:
      "শ্রেণিবিন্যাস:\n• HCl → তীব্র এসিড\n• Mg(OH)₂ → দুর্বল ক্ষার\n\nকৌশল:\nপ্রশমন। অদ্রবণীয় Mg(OH)₂ কঠিন H⁺ আয়ন শোষণ করে।\n\nবিক্রিয়া:\n2HCl(aq) + Mg(OH)₂(s) → MgCl₂(aq) + 2H₂O(l)\n\nফলাফল:\nমিল্ক অফ ম্যাগনেসিয়ার সাদা সাসপেনশন ধীরে ধীরে স্বচ্ছ হয়।",
    conditions_bn: "কক্ষ তাপমাত্রায় স্বতঃস্ফূর্ত।",
    howToPerform_bn: "সাদা Mg(OH)₂ সাসপেনশনে HCl যোগ করুন।",
    conditions:
      "Spontaneous at body temp or room temp. Slower than soluble base reactions due to solid phase.",
    howToPerform:
      "Add HCl to white Mg(OH)₂ suspension. Stir until clear solution of magnesium chloride remains.",
  },

  // ========== SINGLE REPLACEMENT REACTIONS ==========
  // ========== SINGLE REPLACEMENT REACTIONS ==========
  "Zn+CuSO₄": {
    reactants: ["Zn", "CuSO₄"],
    products: ["ZnSO₄", "Cu"],
    coefficients: { reactants: [1, 1], products: [1, 1] },
    energyChange: "exothermic",
    explanation:
      "CLASSIFICATION:\n• Zn → active metal (reducing agent)\n• Cu²⁺ → less active ion (oxidizing agent)\n\nMECHANISM:\nSingle displacement redox. Zinc (E°=-0.76V) is more active than Copper (E°=+0.34V). Zn displaces Cu from solution: Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s).\n\nREACTION:\nZn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)  ΔG = -212 kJ/mol\n\nOBSERVABLE RESULT:\nBlue solution fades to colorless. Reddish-brown copper metal deposits on the grey zinc strip.",
    explanation_bn:
      "শ্রেণিবিন্যাস:\n• Zn → সক্রিয় ধাতু (বিজারক)\n• Cu²⁺ → কম সক্রিয় আয়ন (জারক)\n\nকৌশল:\nসিঙ্গেল ডিসপ্লেসমেন্ট রেডক্স। জিঙ্ক কপারকে প্রতিস্থাপন করে।\n\nবিক্রিয়া:\nZn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)\n\nফলাফল:\nনীল দ্রবণ বর্ণহীন হয়। লালচে-বাদামী কপার জমা হয়।",
    conditions_bn: "কক্ষ তাপমাত্রায় স্বতঃস্ফূর্ত।",
    howToPerform_bn: "কপার সালফেট দ্রবণে জিঙ্কের পাত রাখুন।",
    conditions:
      "Spontaneous at room temperature. Rate increases with surface area.",
    howToPerform:
      "Place a zinc strip in copper sulfate solution. Observe the color change and metal deposition over 10-20 minutes.",
  },
  "Zn+HCl": {
    reactants: ["Zn", "HCl"],
    products: ["ZnCl₂", "H₂"],
    coefficients: { reactants: [1, 2], products: [1, 1] },
    energyChange: "exothermic",
    explanation:
      "CLASSIFICATION:\n• Zn → active metal\n• HCl → acid (proton source)\n\nMECHANISM:\nRedox displacement. Zn is oxidized (Zn → Zn²⁺ + 2e⁻). H⁺ is reduced (2H⁺ + 2e⁻ → H₂). Zinc displaces hydrogen.\n\nREACTION:\nZn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)\n\nOBSERVABLE RESULT:\nSteady bubbling of hydrogen gas. Zinc metal gradually disappears.",
    conditions: "Spontaneous. Dilute acid works well. Exothermic.",
    howToPerform:
      "Add zinc granules to dilute HCl in a test tube. Use a lighter to pop the hydrogen gas bubbles.",
  },
  "Zn+H₂SO₄": {
    reactants: ["Zn", "H₂SO₄"],
    products: ["ZnSO₄", "H₂"],
    coefficients: { reactants: [1, 1], products: [1, 1] },
    energyChange: "exothermic",
    explanation:
      "CLASSIFICATION:\n• Zn → active metal\n• H₂SO₄ → acid\n\nMECHANISM:\nSingle replacement. Zinc displaces hydrogen from the acid. (Zn > H in activity series).\n\nREACTION:\nZn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)\n\nOBSERVABLE RESULT:\nHydrogen gas evolution (bubbles). Heat generation.",
    explanation_bn:
      "শ্রেণিবিন্যাস:\n• Zn → সক্রিয় ধাতু\n• H₂SO₄ → এসিড\n\nকৌশল:\nএকক প্রতিস্থাপন। জিঙ্ক এসিড থেকে হাইড্রোজেনকে প্রতিস্থাপন করে।\n\nবিক্রিয়া:\nZn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)\n\nফলাফল:\nহাইড্রোজেন গ্যাস নির্গমন (বুদবুদ)। তাপ উৎপন্ন হয়।",
    conditions_bn: "লঘু এসিডের সাথে স্বতঃস্ফূর্ত।",
    howToPerform_bn:
      "নিরাপত্তা চশমা ব্যবহার করে লঘু H₂SO₄ তে জিঙ্ক যোগ করুন। বুদবুদ তৈরি পর্যবেক্ষণ করুন।",
    conditions:
      "Spontaneous with dilute acid. CAUTION: Concentrated H₂SO₄ acts as oxidizer (produces SO₂), so use dilute only.",
    howToPerform:
      "Add zinc to dilute H₂SO₄ using safety glasses. Observe bubble formation.",
  },
  "Fe+CuSO₄": {
    reactants: ["Fe", "CuSO₄"],
    products: ["FeSO₄", "Cu"],
    coefficients: { reactants: [1, 1], products: [1, 1] },
    energyChange: "exothermic",
    explanation:
      "CLASSIFICATION:\n• Fe → active metal\n• Cu²⁺ → less active ion\n\nMECHANISM:\nRedox displacement. Iron (E°=-0.44V) is more active than Copper. Fe transfers electrons to Cu²⁺.\n\nREACTION:\nFe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)\n\nOBSERVABLE RESULT:\nIron nail gets coated with reddish copper. Blue solution turns pale green (Fe²⁺).",
    conditions:
      "Spontaneous but slow interaction at room temperature compared to Zinc. Requires clean iron surface.",
    howToPerform:
      "Put an iron nail in CuSO₄ solution. Leave for 1 hour to see significant copper plating.",
  },
  "Mg+HCl": {
    reactants: ["Mg", "HCl"],
    products: ["MgCl₂", "H₂"],
    coefficients: { reactants: [1, 2], products: [1, 1] },
    energyChange: "exothermic",
    warning: "Vigorous reaction with hydrogen gas release!",
    explanation:
      "CLASSIFICATION:\n• Mg → highly active alkaline earth metal\n• HCl → strong acid\n\nMECHANISM:\nRapid redox displacement. Mg has very negative reduction potential (-2.37V), donating electrons readily to H⁺.\n\nREACTION:\nMg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)\n\nOBSERVABLE RESULT:\nViolent fizzing/bubbling. Test tube gets hot. Magnesium ribbon vanishes quickly.",
    conditions: "Spontaneous and very fast at room temperature.",
    howToPerform:
      "Add small strip of Mg ribbon to dilute HCl. Reaction essentially instantaneous.",
  },
  "Mg+CuSO₄": {
    reactants: ["Mg", "CuSO₄"],
    products: ["MgSO₄", "Cu"],
    coefficients: { reactants: [1, 1], products: [1, 1] },
    energyChange: "exothermic",
    explanation:
      "CLASSIFICATION:\n• Mg → highly active metal\n• Cu²⁺ → less active ion\n\nMECHANISM:\nSingle displacement with large potential difference (∆E° = 2.71V). Mg reduces Cu²⁺ very rapidly.\n\nREACTION:\nMg(s) + CuSO₄(aq) → MgSO₄(aq) + Cu(s)  ΔG = -523 kJ/mol\n\nOBSERVABLE RESULT:\nImmediate, vigorous reaction. Copper deposits as spongy brown mass. Solution turns colorless (Mg²⁺) from blue (Cu²⁺).",
    conditions:
      "Spontaneous and violent at room temperature. Highly exothermic.",
    howToPerform:
      "Add magnesium ribbon to copper sulfate solution. Watch the rapid color change and hear the fizzing.",
  },
  "Al+HCl": {
    reactants: ["Al", "HCl"],
    products: ["AlCl₃", "H₂"],
    coefficients: { reactants: [2, 6], products: [2, 3] },
    energyChange: "exothermic",
    explanation:
      "CLASSIFICATION:\n• Al → active metal (passivated)\n• HCl → acid\n\nMECHANISM:\nInitially impeded by Al₂O₃ layer. Acid dissolves oxide layer: Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O. Then, redox occurs: 2Al + 6H⁺ → 2Al³⁺ + 3H₂.\n\nREACTION:\n2Al(s) + 6HCl(aq) → 2AlCl₃(aq) + 3H₂(g)\n\nOBSERVABLE RESULT:\nDelay period (induction time) while oxide dissolves, followed by vigorous fizzing and heat. Hydrogen gas evolved.",
    conditions:
      "Spontaneous but has induction period. Scratching surface or adding Cu²⁺/Cl⁻ ions accelerates depassivation.",
    howToPerform:
      "Add aluminum foil to HCl. Note the delay before bubbles appear. Scratching foil speeds it up.",
  },
};

// ============ REACTION ENGINE ============

// Classify a chemical by its reactive nature
const classifyChemical = (chem: ChemicalElement): string => {
  const cat = chem.category;
  const symbol = chem.symbol;
  const name = chem.name;

  // Acids
  if (cat === "acid" || name.includes("Acid")) {
    if (["HCl", "HNO₃", "H₂SO₄", "HBr", "HI", "HClO₄"].includes(symbol)) {
      return "strong Brønsted acid (proton donor, fully dissociates in water)";
    }
    return "weak Brønsted acid (proton donor, partially dissociates)";
  }

  // Bases
  if (cat === "base" || name.includes("Hydroxide")) {
    if (["NaOH", "KOH", "Ca(OH)₂", "Ba(OH)₂"].includes(symbol)) {
      return "strong Brønsted base (proton acceptor, fully dissociates)";
    }
    if (symbol === "NH₃") {
      return "weak Brønsted base (lone-pair proton acceptor)";
    }
    return "Brønsted base (proton acceptor)";
  }

  // Metals
  if (cat === "metal") {
    const reactivity = chem.reactivity ?? 0;
    if (reactivity >= 5) return "highly reactive metal (strong reducing agent)";
    if (reactivity >= 3) return "moderately reactive metal (reducing agent)";
    if (reactivity >= 1) return "low reactivity metal (weak reducing agent)";
    return "noble/unreactive metal";
  }

  // Noble gases
  if (["He", "Ne", "Ar", "Kr", "Xe"].includes(symbol)) {
    return "noble gas (inert, full valence shell)";
  }

  // Halogens
  if (["Cl₂", "Br₂", "I₂", "F₂"].includes(symbol)) {
    return "halogen (oxidizing agent, electron acceptor)";
  }

  // Oxygen
  if (symbol === "O₂") {
    return "diatomic oxygen (oxidizing agent)";
  }

  // Hydrogen
  if (symbol === "H₂") {
    return "diatomic hydrogen (reducing agent)";
  }

  // Salts
  if (cat === "salt") {
    return "ionic salt (electrolyte when dissolved)";
  }

  // Compounds
  if (cat === "compound") {
    return "molecular compound";
  }

  return "chemical species";
};

// Generate reaction-specific explanation for "No Reaction" cases
const generateNoReactionDetails = (
  r1: ChemicalElement,
  r2: ChemicalElement
): { explanation: string; conditions: string; howToPerform: string } => {
  const class1 = classifyChemical(r1);
  const class2 = classifyChemical(r2);
  const cat1 = r1.category;
  const cat2 = r2.category;

  // ========== ACID + ACID ==========
  if (
    (cat1 === "acid" || r1.name.includes("Acid")) &&
    (cat2 === "acid" || r2.name.includes("Acid"))
  ) {
    return {
      explanation: `CLASSIFICATION:\n• ${r1.symbol} → ${class1}\n• ${r2.symbol} → ${class2}\n\nMECHANISM BARRIER:\nBoth ${r1.symbol} and ${r2.symbol} are proton donors. A neutralization reaction requires a proton acceptor (base). Since neither can accept protons, no proton transfer occurs. The H⁺ ions from both acids simply coexist in solution.\n\nOBSERVABLE RESULT:\nNo reaction. Mixing produces a solution with combined acidity (lower pH). No salt forms, no gas evolves, no precipitate appears.`,
      conditions: `Not applicable - no reaction mechanism exists between two acids.`,
      howToPerform: `Mix dilute solutions of ${r1.symbol} and ${r2.symbol}. Measure pH - it will be lower (more acidic) than either individual solution due to increased H⁺ concentration. No new chemical species forms.`,
    };
  }

  // ========== BASE + BASE ==========
  if (
    (cat1 === "base" || r1.name.includes("Hydroxide") || r1.symbol === "NH₃") &&
    (cat2 === "base" || r2.name.includes("Hydroxide") || r2.symbol === "NH₃")
  ) {
    return {
      explanation: `CLASSIFICATION:\n• ${r1.symbol} → ${class1}\n• ${r2.symbol} → ${class2}\n\nMECHANISM BARRIER:\nBoth ${r1.symbol} and ${r2.symbol} are proton acceptors (bases). A neutralization reaction requires a proton donor (acid). Without an acid, neither base can accept a proton. The OH⁻ ions simply coexist.\n\nOBSERVABLE RESULT:\nNo reaction. Mixing produces a solution with combined basicity (higher pH). No salt precipitates unless cation/anion combination happens to be insoluble.`,
      conditions: `Not applicable - no reaction mechanism exists between two bases.`,
      howToPerform: `Mix aqueous solutions of ${r1.symbol} and ${r2.symbol}. The pH will increase (more basic). Check for precipitate - if cations don't form insoluble hydroxides with each other, no solid forms.`,
    };
  }

  // ========== METAL + METAL ==========
  if (cat1 === "metal" && cat2 === "metal") {
    return {
      explanation: `CLASSIFICATION:\n• ${r1.symbol} → ${class1}\n• ${r2.symbol} → ${class2}\n\nMECHANISM BARRIER:\nBoth ${r1.symbol} and ${r2.symbol} are metals with delocalized electron clouds. Metals do not undergo ionic or covalent bonding with each other under normal conditions. Instead, they can form ALLOYS (homogeneous mixtures) when melted together, but this is a physical mixing, not a chemical reaction.\n\nOBSERVABLE RESULT:\nNo chemical reaction at room temperature. Solid pieces remain separate. Only physical mixing occurs if melted.`,
      conditions: `Alloy formation requires melting both metals (${
        r1.symbol
      }: ~${r1.molarMass > 50 ? "high" : "moderate"} melting point, ${
        r2.symbol
      }: similar). At room temperature: no interaction.`,
      howToPerform: `Place solid ${r1.symbol} and ${r2.symbol} in contact. No observable change occurs. To form an alloy, heat both above their melting points in a crucible and mix the molten metals.`,
    };
  }

  // ========== NOBLE GAS + ANYTHING ==========
  if (
    ["He", "Ne", "Ar", "Kr", "Xe"].includes(r1.symbol) ||
    ["He", "Ne", "Ar", "Kr", "Xe"].includes(r2.symbol)
  ) {
    const noble = ["He", "Ne", "Ar", "Kr", "Xe"].includes(r1.symbol) ? r1 : r2;
    const other = noble === r1 ? r2 : r1;
    return {
      explanation: `CLASSIFICATION:\n• ${
        noble.symbol
      } → noble gas (inert, complete valence shell)\n• ${
        other.symbol
      } → ${classifyChemical(other)}\n\nMECHANISM BARRIER:\n${
        noble.symbol
      } has a complete valence electron shell (${
        noble.symbol === "He" ? "2 electrons, duet" : "8 electrons, octet"
      }). Its ionization energy is extremely high (~${
        noble.symbol === "He" ? "2372" : noble.symbol === "Ne" ? "2081" : "1521"
      } kJ/mol) and its electron affinity is positive (repels electrons). Therefore:\n• Cannot donate electrons (no oxidation)\n• Cannot accept electrons (no reduction)\n• Cannot share electrons (no covalent bonding)\n• Cannot form ions (no ionic bonding)\n\nOBSERVABLE RESULT:\nNo reaction. ${
        noble.symbol
      } remains monoatomic and chemically unchanged.`,
      conditions: `Only XeF₂ and a few xenon compounds exist, requiring extreme conditions (high pressure, UV, fluorine gas). Standard conditions: completely inert.`,
      howToPerform: `Mix ${noble.symbol} with ${other.symbol} in any proportion. No observable change occurs. Spectroscopic analysis confirms no new bonds form.`,
    };
  }

  // ========== GAS + GAS (non-reactive pair) ==========
  if (cat1 === "gas" && cat2 === "gas") {
    return {
      explanation: `CLASSIFICATION:\n• ${r1.symbol} → ${class1}\n• ${r2.symbol} → ${class2}\n\nMECHANISM BARRIER:\nAlthough both are gases, their molecular structures do not provide a favorable reaction pathway under standard conditions. Key barriers may include:\n• High activation energy for bond breaking\n• Unfavorable thermodynamics (positive ΔG)\n• Kinetic stability of reactant molecules\n\nOBSERVABLE RESULT:\nNo reaction at room temperature. Gases mix homogeneously but no new compounds form.`,
      conditions: `May require specific catalysts, high temperature, or UV light to overcome activation energy barrier.`,
      howToPerform: `Mix ${r1.symbol} and ${r2.symbol} gases in a container. No color change, no heat release, no product formation observed at room temperature.`,
    };
  }

  // ========== DEFAULT - Provide specific analysis ==========
  return {
    explanation: `CLASSIFICATION:\n• ${r1.symbol} → ${class1}\n• ${
      r2.symbol
    } → ${class2}\n\nMECHANISM ANALYSIS:\nExamining possible reaction pathways:\n• Acid-base: ${
      (cat1 === "acid" && cat2 === "base") ||
      (cat1 === "base" && cat2 === "acid")
        ? "Available"
        : "Not available - requires acid + base pair"
    }\n• Redox: ${
      (class1.includes("reducing") && class2.includes("oxidizing")) ||
      (class2.includes("reducing") && class1.includes("oxidizing"))
        ? "Possible"
        : "Not favorable - no complementary redox pair"
    }\n• Precipitation: Check solubility rules for ion combinations\n\nOBSERVABLE RESULT:\nNo standard reaction occurs between ${
      r1.symbol
    } and ${
      r2.symbol
    } under laboratory conditions. This combination lacks a compatible reaction mechanism.`,
    conditions: `This specific pair does not have a defined reaction pathway in standard inorganic chemistry.`,
    howToPerform: `Mix ${r1.symbol} and ${r2.symbol}. Observe for: temperature change, color change, gas bubbles, or precipitate. Absence of these indicates no reaction.`,
  };
};

export const ReactionLabEngine = {
  getReaction(
    type: ReactionType,
    reactant1: string,
    reactant2?: string
  ): ReactionResult {
    // Validate inputs
    if (!reactant1 || (type !== "decomposition" && !reactant2)) {
      return {
        valid: false,
        equation: "",
        products: [],
        coefficients: { reactants: [], products: [] },
        energyChange: "neutral",
        errorMessage: "Please select all required reactants.",
        stoichiometricRatio: "0:0",
      };
    }

    // If decomposition, only one reactant
    if (type === "decomposition") {
      if (REACTION_RULES[reactant1]) {
        const rule = REACTION_RULES[reactant1];
        // Calculate stoichiometric ratio
        const reactantSum = rule.coefficients.reactants.reduce(
          (a, b) => a + b,
          0
        );
        const productSum = rule.coefficients.products.reduce(
          (a, b) => a + b,
          0
        );
        const stoichiometricRatio = `${reactantSum}:${productSum}`;

        return {
          valid: true,
          equation: `${rule.reactants[0]} → ${rule.products.join(" + ")}`,
          products: rule.products,
          coefficients: rule.coefficients,
          energyChange: rule.energyChange,
          warning: rule.warning,
          warning_bn: rule.warning_bn,
          explanation: rule.explanation,
          explanation_bn: rule.explanation_bn,
          conditions: rule.conditions,
          conditions_bn: rule.conditions_bn,
          howToPerform: rule.howToPerform,
          howToPerform_bn: rule.howToPerform_bn,
          stoichiometricRatio,
        };
      }
      return {
        valid: false,
        equation: `${reactant1} → No Reaction`,
        products: [],
        coefficients: { reactants: [], products: [] },
        energyChange: "neutral",
        errorMessage:
          "This substance is stable and does not spontaneously decompose under standard conditions.",
        errorMessage_bn:
          "এই পদার্থটি স্থিতিশীল এবং প্রমাণ অবস্থায় স্বতঃস্ফূর্তভাবে বিযোজিত হয় না।",
        explanation: `${reactant1} is thermodynamically stable at room temperature. It does not undergo decomposition without significant energy input (intense heat, electrolysis) or a specific catalyst.`,
        explanation_bn: `${reactant1} তাপগতিয়ভাবে স্থিতিশীল। উল্লেখযোগ্য শক্তি বা প্রভাবক ছাড়া এটি বিযোজিত হয় না।`,
        conditions: "Requires extreme heat or electrolysis to force breakdown.",
        conditions_bn: "ভাঙার জন্য চরম তাপ বা তড়িৎ বিশ্লেষণ প্রয়োজন।",
        howToPerform:
          "Even upon heating with a Bunsen burner, no decomposition is observed. The substance simply melts or boils (physical change).",
        howToPerform_bn:
          "বুনসেন বার্নারে গরম করলেও বিয়োজন দেখা যায় না। পদার্থটি কেবল গলে বা ফুটে যায়।",
        stoichiometricRatio: "0:0",
      };
    }

    // Two reactants (reactant2 is guaranteed to exist here due to validation above)
    const reactant2Safe = reactant2!;

    // Re-check logic for single replacement NO REACTION specifically first
    if (type === "singleReplacement") {
      const element = ALL_CHEMICALS[reactant1];
      const compoundMetalName = getMetalFromCompound(reactant2Safe);
      const compoundMetal = ALL_CHEMICALS[compoundMetalName];

      // Logic check for activity
      if (
        element &&
        compoundMetal &&
        element.reactivity !== undefined &&
        compoundMetal.reactivity !== undefined &&
        element.reactivity <= compoundMetal.reactivity
      ) {
        // This is a known "No Reaction" case for Single Replacement
        return {
          valid: false,
          equation: `${reactant1} + ${reactant2Safe} → No Reaction`,
          products: [],
          coefficients: { reactants: [], products: [] },
          energyChange: "neutral",
          errorMessage: `${reactant1} is less reactive than ${compoundMetal.name}. No reaction occurs.`,
          errorMessage_bn: `${compoundMetal.name}-এর চেয়ে ${reactant1} কম সক্রিয়। কোনো বিক্রিয়া হয় না।`,
          explanation: `According to the metal activity series, a single replacement reaction will only occur if the free element is more reactive than the element in the compound. Here, ${element.name} (reactivity: ${element.reactivity}) is less reactive than ${compoundMetal.name} (reactivity: ${compoundMetal.reactivity}), so it cannot displace it from the compound.`,
          explanation_bn: `সক্রিয়তা সিরিজ অনুযায়ী, মুক্ত মৌলটি যৌগস্থিত মৌলের চেয়ে বেশি সক্রিয় হলেই বিক্রিয়া ঘটে। এখানে, ${element.name} (সক্রিয়তা: ${element.reactivity}), ${compoundMetal.name} (সক্রিয়তা: ${compoundMetal.reactivity})-এর চেয়ে কম সক্রিয়, তাই প্রতিস্থাপন সম্ভব নয়।`,
          conditions: `Reaction allows only if the free metal is HIGHER in the activity series. Cannot force this thermodynamically unfavorable reaction under standard conditions.`,
          conditions_bn: `বিক্রিয়া কেবল তখনই সম্ভব যদি মুক্ত ধাতু সক্রিয়তা সিরিজে উঁচুতে থাকে।`,
          howToPerform: `Place ${element.name} metal in ${reactant2Safe} solution. Observe for hours - no color change or precipitate will form, confirming lack of displacement.`,
          howToPerform_bn: `${reactant2Safe} দ্রবণে ${element.name} ধাতু রাখুন। কোনো পরিবর্তন হবে না।`,
          stoichiometricRatio: "0:0",
        };
      }
    }

    // Determine key for REACTION_RULES lookup
    let key: string;
    key = `${reactant1}+${reactant2Safe}`;
    if (!REACTION_RULES[key]) {
      key = `${reactant2Safe}+${reactant1}`;
    }

    const rule = REACTION_RULES[key];

    if (!rule) {
      // Fallback for "No generic reaction found"
      const r1 = ALL_CHEMICALS[reactant1];
      const r2 = ALL_CHEMICALS[reactant2Safe];
      const details =
        r1 && r2
          ? generateNoReactionDetails(r1, r2)
          : {
              explanation: "One or more reactants are unidentified.",
              conditions: "N/A",
              howToPerform: "N/A",
            };

      return {
        valid: false,
        equation: `${reactant1} + ${reactant2Safe} → No Reaction`,
        products: [],
        coefficients: { reactants: [], products: [] },
        energyChange: "neutral",
        errorMessage:
          "This combination does not form a known reaction under standard conditions.",
        errorMessage_bn:
          "প্রমাণ অবস্থায় এই সংমিশ্রণটি কোনো পরিচিত বিক্রিয়া গঠন করে না।",
        explanation: details.explanation,
        explanation_bn: "ল্যাবরেটরি অবস্থায় এদের মধ্যে কোনো বিক্রিয়া ঘটে না।",
        conditions: details.conditions,
        conditions_bn: "কোনো সংজ্ঞায়িত বিক্রিয়া পথ নেই।",
        howToPerform: details.howToPerform,
        howToPerform_bn: "এরা মেশালে কোনো পরিবর্তন দেখা যায় না।",
        stoichiometricRatio: "0:0",
      };
    }

    // Build equation string for VALID reaction
    const reactantsStr = rule.coefficients.reactants
      .map((c, i) => (c > 1 ? `${c}${rule.reactants[i]}` : rule.reactants[i]))
      .join(" + ");

    const productsStr = rule.coefficients.products
      .map((c, i) => (c > 1 ? `${c}${rule.products[i]}` : rule.products[i]))
      .join(" + ");

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
      warning_bn: rule.warning_bn,
      explanation: rule.explanation,
      explanation_bn: rule.explanation_bn,
      conditions: rule.conditions,
      conditions_bn: rule.conditions_bn,
      howToPerform: rule.howToPerform,
      howToPerform_bn: rule.howToPerform_bn,
      stoichiometricRatio,
    };
  },

  getColorForChemical(symbol: string): string {
    return ALL_CHEMICALS[symbol]?.color || "#888888";
  },

  getChemicalName(symbol: string): string {
    return ALL_CHEMICALS[symbol]?.name || symbol;
  },
  getRadiusForChemical(symbol: string): number {
    const chemical = ALL_CHEMICALS[symbol];
    if (!chemical) return 15;

    // Size based on molar mass
    if (chemical.molarMass < 30) return 12;
    if (chemical.molarMass < 60) return 15;
    if (chemical.molarMass < 100) return 18;
    return 22;
  },

  getMolarMass(symbol: string): number {
    return ALL_CHEMICALS[symbol]?.molarMass || 1;
  },

  calculateLimitingReagent(
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
  },
};

// Helper function to extract metal from compound
function getMetalFromCompound(compound: string): string {
  if (compound.startsWith("Cu")) return "Cu";
  if (compound.startsWith("Zn")) return "Zn";
  if (compound.startsWith("Fe")) return "Fe";
  if (compound.startsWith("Ag")) return "Ag";
  if (compound.startsWith("H")) return "H";
  return "";
}
