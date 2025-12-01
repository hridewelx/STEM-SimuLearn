import { SimulationConfig } from '../../types/simulationTypes';
import { ReactionIcon } from '../../../assets/icons/ReactionIcon';
import { ReactionLabParams } from './types';

export const reactionLabConfig: SimulationConfig = {
  id: 'reaction-lab-1',
  name: 'Advanced Reaction Lab',
  description: 'Mix chemicals in test tubes and beakers, observe reactions, and learn stoichiometry with two view modes: Visual Lab and Molecular Level.',
  longDescription: 'This advanced chemistry simulation offers two exciting ways to explore chemical reactions! In Visual Lab mode, watch chemicals pour from test tubes into beakers with realistic animations, bubbles, steam, and color changes. In Molecular Level mode, see particles collide and react at the atomic scale. Learn about composition, decomposition, acid-base, and single replacement reactions while calculating limiting reagents and theoretical yields.',
  category: 'chemistry',
  difficulty: 'intermediate',
  duration: 30,
  objectives: [
    'Understand the four main types of chemical reactions',
    'Learn to balance chemical equations',
    'Calculate stoichiometry including limiting reagents',
    'Compare visual and molecular-level views of reactions',
    'Apply the concept of molar mass and moles'
  ],
  tags: ['stoichiometry', 'chemical equations', 'reactions', 'molar mass', 'limiting reagent', 'acid-base', 'test tubes', 'beakers'],
  route: '/simulations/chemistry/reaction-lab',
  icon: ReactionIcon,
  simulationDetails: {
    howItWorks: `Choose between two view modes: Visual Lab shows test tubes, beakers, and realistic lab equipment with pouring animations and color changes. Molecular Level displays particles moving and reacting at the atomic scale. Select a reaction type, choose your chemicals, adjust amounts, and click Start to watch the reaction unfold!`,
    keyConcepts: [
      'Visual Lab: See test tubes, beakers, pouring, bubbles, and color changes',
      'Molecular View: Watch particles collide and form new compounds',
      'Composition: Two or more elements combine to form a compound',
      'Decomposition: A compound breaks down into simpler substances',
      'Acid-Base: An acid and base react to form salt and water',
      'Single Replacement: One element replaces another in a compound',
      'Limiting Reagent: The reactant that runs out first'
    ],
    controls: [
      'Toggle between Visual Lab and Molecular Level views at the top',
      'Select a reaction type (Composition, Decomposition, Acid-Base, Single Replacement)',
      'Choose chemicals from the dropdown menus',
      'Adjust reactant amounts with the slider',
      'Click Start to begin the reaction',
      'View analytics panel for stoichiometry data',
      'Click Reset to start over'
    ],
    proTip: 'Try the same reaction in both view modes! Visual Lab is great for understanding what happens in a real lab, while Molecular Level helps you see the particle interactions that cause those changes.'
  }
};

export const defaultReactionLabParams: ReactionLabParams = {
  reactionType: 'acidBase',
  acid: '',
  base: '',
  elementA: '',
  elementB: '',
  compound: '',
  element: '',
  compoundForReplacement: '',
  reactant1Amount: 20,
  reactant2Amount: 20,
  temperature: 100,
};
