import { SimulationConfig } from '../../types/simulationTypes';
import ConvexLensIcon from '../../../assets/icons/ConvexLensIcon';
import { ConvexLensParams } from './types';

export const convexLensConfig: SimulationConfig = {
  id: 'convex-lens',
  name: 'Convex Lens',
  description: 'Explore image formation by convex lenses and understand the lens formula.',
  longDescription: 'This simulation demonstrates how convex (converging) lenses form images. By adjusting the object distance and focal length, you can observe how real and virtual images are formed, and understand concepts like magnification, focal points, and ray diagrams.',
  category: 'physics',
  difficulty: 'intermediate',
  duration: 25,
  objectives: [
    'Understand image formation by convex lenses',
    'Apply the lens formula: 1/f = 1/v + 1/u',
    'Calculate magnification and image properties',
    'Analyze ray diagrams for different object positions',
    'Distinguish between real and virtual images'
  ],
  tags: ['optics', 'lenses', 'refraction', 'focal length', 'ray diagrams'],
  route: '/simulations/physics/convex-lens',
  icon: ConvexLensIcon,
  simulationDetails: {
    howItWorks: 'The simulation shows a convex lens with adjustable focal length. Place an object at different distances and observe how the lens forms images. Three principal rays are drawn: (1) parallel to axis → through focal point, (2) through optical center → straight, (3) through focal point → parallel to axis. The intersection determines the image position.',
    keyConcepts: [
      'Convex lenses converge parallel light rays to a focal point',
      'Lens formula: 1/f = 1/v + 1/u relates focal length, image distance, and object distance',
      'Magnification m = v/u = h_i/h_o (negative for inverted images)',
      'Real images form when object is beyond focal length (inverted)',
      'Virtual images form when object is within focal length (upright, magnified)'
    ],
    controls: [
      'Adjust object distance slider to move the object',
      'Change focal length to see different lens strengths',
      'Modify object height to observe size effects',
      'Toggle rays, focal points, and grid for better visualization',
      'Watch how image distance and magnification change in real-time'
    ],
    proTip: 'Try placing the object exactly at 2f (twice the focal length) - you\'ll get a real, inverted image of the same size at 2f on the other side!'
  }
};

export const defaultConvexLensParams: ConvexLensParams = {
  objectDistance: 30,
  focalLength: 15,
  objectHeight: 5,
  showRays: true,
  showFocalPoints: true,
  showGrid: true
};
