export interface ConcaveMirrorParams {
  objectDistance: number; // Distance from mirror to object (cm)
  focalLength: number; // Focal length of mirror (cm)
  objectHeight: number; // Height of object (cm)
  mirrorAperture: number; // Height/length of mirror (cm)
  showRays: boolean;
  showFocalPoint: boolean;
  showMeasurements: boolean;
}

export interface ConcaveMirrorAnalyticsData {
  imageDistance: number;
  imageHeight: number;
  magnification: number;
  imageType: 'real' | 'virtual';
  imageOrientation: 'inverted' | 'upright';
  mirrorFormula: string;
  magnificationFormula: string;
}
