import { SimulationConfig } from '../../types/simulationTypes';
import ConcaveMirrorIcon from '../../../assets/icons/ConcaveMirrorIcon';
import { ConcaveMirrorParams } from './types';

export const concaveMirrorConfig: SimulationConfig = {
  id: 'concave-mirror',
  name: 'Concave Mirror',
  description: 'Study image formation by concave mirrors and learn the mirror formula.',
  longDescription: 'This simulation demonstrates how concave (converging) mirrors form images through reflection. Adjust the object position relative to the focal point to see how real and virtual images are created, and understand concepts like magnification, center of curvature, and ray diagrams for spherical mirrors.',
  category: 'physics',
  difficulty: 'intermediate',
  duration: 25,
  objectives: [
    'Understand image formation by concave mirrors',
    'Apply the mirror formula: 1/f = 1/v + 1/u',
    'Calculate magnification and image characteristics',
    'Analyze ray diagrams for different object positions',
    'Understand the relationship between focal length and radius of curvature'
  ],
  tags: ['optics', 'mirrors', 'reflection', 'focal length', 'ray diagrams'],
  route: '/simulations/physics/concave-mirror',
  icon: ConcaveMirrorIcon,
  simulationDetails: {
    howItWorks: 'The simulation displays a concave mirror with adjustable focal length. Position an object at various distances from the mirror and observe image formation. Three principal rays are traced: (1) parallel to axis → reflects through focal point, (2) through focal point → reflects parallel to axis, (3) through center of curvature → reflects back along same path.',
    keyConcepts: [
      'Concave mirrors converge parallel light rays to a focal point',
      'Mirror formula: 1/f = 1/v + 1/u (same as lens formula)',
      'Focal length f = R/2 where R is radius of curvature',
      'Magnification m = -v/u = h_i/h_o (negative for inverted)',
      'Real images when object beyond F (inverted), virtual when within F (upright, magnified)'
    ],
    controls: [
      'Move object distance slider to change object position',
      'Adjust focal length to modify mirror curvature',
      'Change object height to see size relationships',
      'Toggle rays, focal points, and grid visualization',
      'Observe real-time updates of image properties'
    ],
    proTip: 'Place the object at the center of curvature (2f) - you\'ll see a real, inverted image of equal size form at the same position!'
  }
};

export const defaultConcaveMirrorParams: ConcaveMirrorParams = {
  objectDistance: 30,
  focalLength: 15,
  objectHeight: 20,
  mirrorAperture: 40,
  showRays: true,
  showFocalPoint: true,
  showMeasurements: true
};
