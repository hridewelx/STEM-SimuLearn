import { SimulationConfig } from '../../types/simulationTypes';
import { LeChatelierIcon } from '../../../assets/icons/LeChatelierIcon';

export const LeChatelierConfig: SimulationConfig = {
  id: 'le-chatelier',
  name: "Le Chatelier's Principle",
  description: 'Explore how chemical equilibrium responds to changes in concentration, temperature, and pressure.',
  longDescription: "Le Chatelier's Principle states that when a system at equilibrium is subjected to a stress, it will shift to counteract that stress and establish a new equilibrium. This simulation lets you manipulate concentration, temperature, and pressure to observe how equilibrium shifts in real-time with visual particle representations and color changes.",
  category: 'chemistry',
  difficulty: 'intermediate',
  duration: 20,
  objectives: [
    'Understand how equilibrium systems respond to external stresses',
    'Predict the direction of equilibrium shifts based on Le Chatelier\'s Principle',
    'Analyze the effects of concentration, temperature, and pressure changes',
    'Apply concepts to industrial processes like the Haber process',
    'Interpret equilibrium constant (K) and reaction quotient (Q)',
  ],
  tags: ['equilibrium', 'reversible reactions', 'thermodynamics', 'industrial chemistry'],
  route: '/simulations/chemistry/le-chatelier',
  icon: LeChatelierIcon,
  simulationDetails: {
    howItWorks: 'This simulation models reversible chemical reactions at equilibrium. Particles represent reactants and products, and their relative amounts change as you apply stresses. The color of the solution changes to reflect the equilibrium position - shifting toward products or reactants based on applied stresses.',
    keyConcepts: [
      'Equilibrium is dynamic - forward and reverse reactions occur continuously',
      'Adding reactants shifts equilibrium toward products',
      'Increasing temperature favors the endothermic direction',
      'Increasing pressure favors the side with fewer gas moles',
      'Catalysts speed up equilibrium but don\'t shift position',
    ],
    controls: [
      'Select different equilibrium reactions to study',
      'Adjust temperature to see thermal effects',
      'Change pressure for gas-phase reactions',
      'Add or remove reactants/products to shift equilibrium',
      'Watch the Q vs K indicator to predict shift direction',
    ],
    proTip: 'Try the N₂O₄ ⇌ 2NO₂ reaction first - you can actually see the color change from colorless to brown as equilibrium shifts!',
  },
};

export const defaultLeChatelierParams = {
  reaction: 'n2o4_no2',
  temperature: 298,
  pressure: 1,
  volume: 1,
  reactant1Conc: 0.5,
  reactant2Conc: 0.5,
  product1Conc: 0.1,
  product2Conc: 0.1,
};

export default LeChatelierConfig;
