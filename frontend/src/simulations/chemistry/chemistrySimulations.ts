import { SimulationConfig } from '../types/simulationTypes';
import { diffusionConfig } from './Diffusion/config';
import { reactionLabConfig } from './ReactionLab/config';
import { LeChatelierConfig } from './LeChatelier/config';

// Registry of all chemistry simulations
export const chemistrySimulations: SimulationConfig[] = [
  diffusionConfig,
  reactionLabConfig,
  LeChatelierConfig,
  // Add more chemistry simulations here as they're created
  // moleculeViewerConfig,
  // phScaleConfig,
  // etc.
];

export { diffusionConfig, reactionLabConfig, LeChatelierConfig };
