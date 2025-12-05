export interface ConvexLensParams {
  objectDistance: number; // Distance from lens to object (cm)
  focalLength: number; // Focal length of lens (cm)
  objectHeight: number; // Height of object (cm)
  showRays: boolean;
  showFocalPoints: boolean;
  showGrid: boolean;
}

export interface ConvexLensAnalyticsData {
  imageDistance: number;
  imageHeight: number;
  magnification: number;
  imageType: 'real' | 'virtual';
  imageOrientation: 'inverted' | 'upright';
  lensFormula: string;
  magnificationFormula: string;
}
