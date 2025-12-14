import { useRef, useEffect, useState } from 'react';
import { ConvexLensParams } from './types';

interface ConvexLensCanvasProps {
  params: ConvexLensParams;
}

const ConvexLensCanvas = ({ params }: ConvexLensCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const lensY = height / 2;

    // Calculate image position first to determine view range
    const u = -params.objectDistance; // object distance (negative)
    const f = params.focalLength;
    const v = (f * u) / (u + f); // image distance
    const m = v / u; // magnification

    // Calculate view range: minimum 2f on each side, maximum extends to show image
    const minViewRange = 2 * f;
    const imageDistanceFromLens = Math.abs(v);
    const maxObjectOrImage = Math.max(params.objectDistance, isFinite(v) && Math.abs(v) < 500 ? imageDistanceFromLens : 0);
    const viewRange = Math.max(minViewRange, Math.min(maxObjectOrImage * 1.2, 200)); // 20% padding

    // Dynamic scale factor with zoom
    const scale = (width / (2 * viewRange)) * zoomLevel; // pixels per cm (viewRange on each side) with zoom

    // Lens positioned at center
    const lensX = width / 2;

    // Draw grid
    if (params.showGrid) {
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += scale * 5) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let i = 0; i < height; i += scale * 5) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }
    }

    // Draw principal axis
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, lensY);
    ctx.lineTo(width, lensY);
    ctx.stroke();

    // Define lens aperture (fixed size in base pixels, then scaled by zoom)
    const baseLensAperturePixels = 200;
    const lensAperturePixels = baseLensAperturePixels * zoomLevel;
    const halfAperture = lensAperturePixels / 2;
    
    // Draw lens mathematically correct as two circular arcs
    // For a thin symmetric biconvex lens: R = 2f (radius of curvature)
    const radiusOfCurvature = 2 * f; // R = 2f in cm
    const radiusOfCurvaturePixels = radiusOfCurvature * scale;
    
    // Calculate C1 and C2 positions based on geometry
    // For circles of radius R to intersect at height h (half aperture):
    // distance from O to C = sqrt(R² - h²)
    const halfApertureSquared = halfAperture * halfAperture;
    const radiusSquared = radiusOfCurvaturePixels * radiusOfCurvaturePixels;
    
    // If aperture is larger than radius, clamp it
    const distanceOtoC = halfAperture < radiusOfCurvaturePixels 
      ? Math.sqrt(radiusSquared - halfApertureSquared)
      : radiusOfCurvaturePixels * 0.2; // Minimum separation for very curved lenses
    
    // C1 on left, C2 on right
    const C1x = lensX - distanceOtoC;
    const C2x = lensX + distanceOtoC;
    
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 4;
    
    // Calculate angle span for the arcs
    const angleSpan = Math.asin(Math.min(1, halfAperture / radiusOfCurvaturePixels));
    
    // Left arc: centered at C1, bulging right
    ctx.beginPath();
    ctx.arc(C1x, lensY, radiusOfCurvaturePixels, -angleSpan, angleSpan);
    ctx.stroke();
    
    // Right arc: centered at C2, bulging left
    ctx.beginPath();
    ctx.arc(C2x, lensY, radiusOfCurvaturePixels, Math.PI - angleSpan, Math.PI + angleSpan);
    ctx.stroke();

    // Cap object height to lens aperture (can't be taller than the lens)
    const maxObjectHeightCm = baseLensAperturePixels / (scale / zoomLevel * 2); // Half of base lens aperture in cm
    const effectiveObjectHeight = Math.min(params.objectHeight, maxObjectHeightCm);
    const imageHeight = m * effectiveObjectHeight;

    // Draw focal points
    if (params.showFocalPoints) {
      const focalPointSize = 8;
      ctx.fillStyle = '#ef4444';
      // Left focal point
      ctx.beginPath();
      ctx.arc(lensX - f * scale, lensY, focalPointSize, 0, Math.PI * 2);
      ctx.fill();
      // Right focal point
      ctx.beginPath();
      ctx.arc(lensX + f * scale, lensY, focalPointSize, 0, Math.PI * 2);
      ctx.fill();

      // F labels
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('F', lensX - f * scale - 10, lensY + 25);
      ctx.fillText('F', lensX + f * scale - 5, lensY + 25);
    }

    // Draw object - use effective object height (constrained to lens aperture)
    const objectX = lensX + u * scale;
    const objectHeightPixels = effectiveObjectHeight * scale;
    const objectTop = lensY - objectHeightPixels;
    
    ctx.strokeStyle = '#10b981';
    ctx.fillStyle = '#10b981';
    ctx.lineWidth = 3;
    
    // Object arrow
    ctx.beginPath();
    ctx.moveTo(objectX, lensY);
    ctx.lineTo(objectX, objectTop);
    ctx.stroke();
    
    // Arrowhead
    ctx.beginPath();
    ctx.moveTo(objectX, objectTop);
    ctx.lineTo(objectX - 5, objectTop + 10);
    ctx.lineTo(objectX + 5, objectTop + 10);
    ctx.closePath();
    ctx.fill();

    // Draw image if it forms
    if (isFinite(v) && Math.abs(v) < 200) {
      const imageX = lensX + v * scale;
      const imageTop = lensY - imageHeight * scale;
      
      ctx.strokeStyle = '#f59e0b';
      ctx.fillStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      
      // Image arrow
      ctx.beginPath();
      ctx.moveTo(imageX, lensY);
      ctx.lineTo(imageX, imageTop);
      ctx.stroke();
      
      // Arrowhead
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(imageX, imageTop);
      ctx.lineTo(imageX - 5, imageTop + (imageHeight > 0 ? -10 : 10));
      ctx.lineTo(imageX + 5, imageTop + (imageHeight > 0 ? -10 : 10));
      ctx.closePath();
      ctx.fill();
    }

    // Draw rays
    if (params.showRays && isFinite(v)) {
      ctx.lineWidth = 2;
      ctx.setLineDash([]);

      const imageX = lensX + v * scale;
      const imageTop = lensY - imageHeight * scale;
      const farFocalX = lensX + f * scale;
      const nearFocalX = lensX - f * scale;

      // Ray 1: Parallel to axis → refracts through far focal point
      ctx.strokeStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(objectX, objectTop);
      ctx.lineTo(lensX, objectTop); // Hit lens at same height
      // After lens, ray goes through far focal point
      if (v > 0) {
        // Real image: ray converges
        ctx.lineTo(imageX, imageTop);
      } else {
        // Virtual image: extend ray backwards through focal point
        ctx.setLineDash([5, 5]);
        ctx.lineTo(farFocalX, lensY);
        ctx.lineTo(imageX, imageTop);
        ctx.setLineDash([]);
      }
      ctx.stroke();

      // Ray 2: Through optical center → straight through (no refraction)
      ctx.strokeStyle = '#8b5cf6';
      ctx.beginPath();
      ctx.moveTo(objectX, objectTop);
      ctx.lineTo(lensX, lensY);
      if (isFinite(imageX)) {
        if (v < 0) ctx.setLineDash([5, 5]);
        ctx.lineTo(imageX, imageTop);
        ctx.setLineDash([]);
      }
      ctx.stroke();

      // Ray 3: Through near focal point → refracts parallel to axis
      ctx.strokeStyle = '#06b6d4';
      ctx.beginPath();
      ctx.moveTo(objectX, objectTop);
      // Ray passes through near focal point before hitting lens
      ctx.lineTo(nearFocalX, lensY);
      const slopeToFocus = (lensY - objectTop) / (nearFocalX - objectX);
      const lensIntersectY = objectTop + slopeToFocus * (lensX - objectX);
      ctx.lineTo(lensX, lensIntersectY);
      // After lens, emerges parallel to axis
      if (isFinite(imageX)) {
        if (v < 0) ctx.setLineDash([5, 5]);
        ctx.lineTo(imageX, imageTop);
        ctx.setLineDash([]);
      }
      ctx.stroke();
    }

  }, [params, zoomLevel]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoomLevel(prev => {
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        return Math.max(0.5, Math.min(3, prev * delta));
      });
    };

    canvas.addEventListener('wheel', handleWheel);
    return () => canvas.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={1400}
      height={700}
      className="w-full h-auto bg-gray-900 rounded-xl border-2 border-gray-700"
      style={{ maxHeight: '80vh' }}
    />
  );
};

export default ConvexLensCanvas;
