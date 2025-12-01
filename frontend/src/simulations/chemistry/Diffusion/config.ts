import { SimulationConfig } from '../../types/simulationTypes';
import { DiffusionIcon } from '../../../assets/icons/DiffusionIcon';

export const diffusionConfig: SimulationConfig = {
  id: 'diffusion-1',
  name: 'Gas Diffusion',
  description: 'Explore how gas particles diffuse across a membrane based on temperature and concentration.',
  longDescription: 'This simulation demonstrates the process of diffusion - the movement of particles from an area of higher concentration to an area of lower concentration. It\'s a fundamental concept in chemistry and physics that explains how gases mix, how odors spread, and many biological processes.',
  category: 'chemistry',
  difficulty: 'beginner',
  duration: 20,
  objectives: [
    'Understand particle movement and kinetic theory',
    'Observe the effect of temperature on diffusion rate',
    'Analyze how molecular mass affects particle velocity',
    'Learn about concentration gradients and equilibrium'
  ],
  tags: ['kinetic theory', 'gas laws', 'thermodynamics', 'diffusion', 'particles'],
  route: '/simulations/chemistry/diffusion',
  icon: DiffusionIcon,
  simulationDetails: {
    howItWorks: `This simulation models gas diffusion through a semi-permeable membrane. Particles move randomly based on kinetic theory, with their speed determined by temperature and mass. Heavier particles (like Nitrogen) move slower than lighter ones (like Helium) at the same temperature. Over time, you'll observe particles moving from high concentration to low concentration until equilibrium is reached.`,
    keyConcepts: [
      'Particles move randomly and collide elastically',
      'Temperature determines average kinetic energy',
      'Lighter particles diffuse faster than heavier ones',
      'Diffusion continues until concentration equalizes'
    ],
    controls: [
      'Adjust temperature sliders to change particle speed',
      'Modify particle counts to change concentrations',
      'Change molecular masses to compare diffusion rates',
      'Observe how different parameters affect equilibrium time'
    ],
    proTip: 'Try starting with extreme values (very high vs very low temperature) to see dramatic differences in diffusion rates.'
  }
};

export const defaultDiffusionParams = {
  leftCount: 10,
  rightCount: 70,
  leftMass: 28,
  rightMass: 4,
  leftRadius: 8,
  rightRadius: 6,
  leftTemp: 300,
  rightTemp: 500
};
