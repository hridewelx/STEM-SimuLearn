import React, { useEffect, useRef } from 'react';
import { ConcaveMirrorParams } from './types';

interface ConcaveMirrorCanvasProps {
  params: ConcaveMirrorParams;
}

const ConcaveMirrorCanvas: React.FC<ConcaveMirrorCanvasProps> = ({ params }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Mirror pole P is always at canvas center
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const mirrorPoleX = centerX;
    
    // Calculate the viewing range: canvas displays 4PC total (2PC on each side of P)
    const focalLength = params.focalLength;
    const PC = 2 * focalLength; // Distance from P to C
    const viewRange = 4 * PC; // Total range to display: 4PC
    
    // Dynamic scale factor: canvas width represents 4PC in cm
    const scale = canvas.width / viewRange; // pixels per cm

    // Draw principal axis
    ctx.strokeStyle = '#4B5563';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Calculate focal point and center of curvature ON THE LEFT (concave side)
    const focalLengthPixels = focalLength * scale;
    const focalX = mirrorPoleX - focalLengthPixels; // F is to the LEFT of P
    const centerCurvatureX = mirrorPoleX - (2 * focalLengthPixels); // C is to the LEFT of P
    
    // Radius of curvature R = 2f = PC (in pixels)
    const radiusOfCurvaturePixels = 2 * focalLengthPixels;
    
    // Mirror aperture from params (user-controlled, in pixels)
    const mirrorAperturePixels = params.mirrorAperture * scale;
    
    // Draw mirror as arc centered at C with radius R = 2f
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 4;
    ctx.beginPath();
    
    // Calculate arc angles based on aperture
    const halfAperture = mirrorAperturePixels / 2;
    const angleSpan = Math.asin(Math.min(1, halfAperture / radiusOfCurvaturePixels));
    
    // Arc from C, facing right (concave faces left)
    ctx.arc(
      centerCurvatureX, 
      centerY, 
      radiusOfCurvaturePixels, 
      -angleSpan, 
      angleSpan
    );
    ctx.stroke();
    
    // Draw pole point (P) - should be on the mirror surface
    ctx.fillStyle = '#10B981';
    ctx.beginPath();
    ctx.arc(mirrorPoleX, centerY, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Label P
    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 18px Arial';
    ctx.fillText('P', mirrorPoleX + 15, centerY + 5);
    
    // Draw reflecting surface indicators on the RIGHT (convex/back side)
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 2;
    for (let i = -2; i <= 2; i++) {
      const angle = (i / 2) * angleSpan;
      const x = centerCurvatureX + radiusOfCurvaturePixels * Math.cos(angle);
      const y = centerY + radiusOfCurvaturePixels * Math.sin(angle);
      const normalAngle = angle; // Points outward (to the right, convex side)
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(normalAngle) * 5, y + Math.sin(normalAngle) * 5);
      ctx.lineTo(x + Math.cos(normalAngle) * 15, y + Math.sin(normalAngle) * 15);
      ctx.stroke();
    }

    // Draw focal point (F)
    if (params.showFocalPoint) {
      ctx.fillStyle = '#F59E0B';
      ctx.beginPath();
      ctx.arc(focalX, centerY, 6, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw F label with better visibility
      ctx.fillStyle = '#F59E0B';
      ctx.font = 'bold 16px Arial';
      ctx.fillText('F', focalX - 8, centerY - 12);
      
      // Draw vertical dashed line at F
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(focalX, centerY - 100);
      ctx.lineTo(focalX, centerY + 100);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw center of curvature (C)
    if (params.showFocalPoint) {
      ctx.fillStyle = '#8B5CF6';
      ctx.beginPath();
      ctx.arc(centerCurvatureX, centerY, 6, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw C label with better visibility
      ctx.fillStyle = '#8B5CF6';
      ctx.font = 'bold 16px Arial';
      ctx.fillText('C', centerCurvatureX - 8, centerY - 12);
      
      // Draw vertical dashed line at C
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(centerCurvatureX, centerY - 100);
      ctx.lineTo(centerCurvatureX, centerY + 100);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw object - ensure it's always to the left of the mirror pole
    const minObjectX = 50; // Minimum x position (left edge with padding)
    const calculatedObjectX = mirrorPoleX - (params.objectDistance * scale);
    const objectX = Math.max(minObjectX, Math.min(calculatedObjectX, mirrorPoleX - 20)); // Clamp to valid range
    const objectHeight = params.objectHeight * scale;

    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 3;
    ctx.fillStyle = '#3B82F6';
    
    // Object arrow
    ctx.beginPath();
    ctx.moveTo(objectX, centerY);
    ctx.lineTo(objectX, centerY - objectHeight);
    ctx.stroke();
    
    // Object arrowhead
    ctx.beginPath();
    ctx.moveTo(objectX, centerY - objectHeight);
    ctx.lineTo(objectX - 5, centerY - objectHeight + 10);
    ctx.lineTo(objectX + 5, centerY - objectHeight + 10);
    ctx.closePath();
    ctx.fill();

    // Label object
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '14px Arial';
    ctx.fillText('Object', objectX - 20, centerY + 20);

    // Calculate image position using mirror formula: 1/f = 1/v + 1/u
    const u = -params.objectDistance; // Object distance is negative in sign convention
    const f = -params.focalLength; // Focal length is negative for concave mirror
    const v = (f * u) / (u - f); // Image distance

    // Only draw image if it's not at infinity
    if (Math.abs(v) < 500 && !isNaN(v) && isFinite(v)) {
      const imageX = mirrorPoleX + (v * scale);
      const magnification = -v / u;
      const imageHeight = magnification * objectHeight;

      // Draw image rays if enabled
      if (params.showRays) {
        ctx.strokeStyle = '#EF4444';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([]);

        // Helper function to find intersection point on curved mirror
        const findMirrorIntersection = (startX: number, startY: number, dirX: number, dirY: number) => {
          // Ray from (startX, startY) in direction (dirX, dirY)
          // Mirror arc centered at (centerCurvatureX, centerY) with radius radiusOfCurvaturePixels
          const dx = startX - centerCurvatureX;
          const dy = startY - centerY;
          const a = dirX * dirX + dirY * dirY;
          const b = 2 * (dx * dirX + dy * dirY);
          const c = dx * dx + dy * dy - radiusOfCurvaturePixels * radiusOfCurvaturePixels;
          const discriminant = b * b - 4 * a * c;
          
          if (discriminant < 0) return null;
          
          // Use positive t to get the forward intersection
          const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
          const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);
          const t = t1 > 0 && t2 > 0 ? Math.min(t1, t2) : Math.max(t1, t2);
          
          if (t < 0) return null;
          
          return {
            x: startX + dirX * t,
            y: startY + dirY * t
          };
        };

        // Ray 1: Parallel to principal axis, reflects through focal point
        ctx.beginPath();
        ctx.moveTo(objectX, centerY - objectHeight);
        const ray1Hit = findMirrorIntersection(objectX, centerY - objectHeight, 1, 0);
        if (ray1Hit) {
          ctx.lineTo(ray1Hit.x, ray1Hit.y);
          ctx.lineTo(imageX, centerY - imageHeight);
        }
        ctx.stroke();

        // Ray 2: Through focal point, reflects parallel to principal axis
        ctx.beginPath();
        ctx.moveTo(objectX, centerY - objectHeight);
        const dirX2 = focalX - objectX;
        const dirY2 = centerY - (centerY - objectHeight);
        const ray2Hit = findMirrorIntersection(objectX, centerY - objectHeight, dirX2, dirY2);
        if (ray2Hit) {
          ctx.lineTo(ray2Hit.x, ray2Hit.y);
          ctx.lineTo(imageX, centerY - imageHeight);
        }
        ctx.stroke();

        // Ray 3: Through center of curvature, reflects back on itself
        ctx.beginPath();
        ctx.moveTo(objectX, centerY - objectHeight);
        const dirX3 = centerCurvatureX - objectX;
        const dirY3 = centerY - (centerY - objectHeight);
        const ray3Hit = findMirrorIntersection(objectX, centerY - objectHeight, dirX3, dirY3);
        if (ray3Hit) {
          ctx.lineTo(ray3Hit.x, ray3Hit.y);
          ctx.lineTo(imageX, centerY - imageHeight);
        }
        ctx.stroke();
      }

      // Draw image
      if (v < 0) {
        // Real image (in front of mirror)
        ctx.strokeStyle = '#10B981';
        ctx.fillStyle = '#10B981';
      } else {
        // Virtual image (behind mirror) - draw with dashed line
        ctx.strokeStyle = '#A78BFA';
        ctx.fillStyle = '#A78BFA';
        ctx.setLineDash([5, 5]);
      }
      
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(imageX, centerY);
      ctx.lineTo(imageX, centerY - imageHeight);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Image arrowhead
      if (imageHeight > 0) {
        ctx.beginPath();
        ctx.moveTo(imageX, centerY - imageHeight);
        ctx.lineTo(imageX - 5, centerY - imageHeight + 10);
        ctx.lineTo(imageX + 5, centerY - imageHeight + 10);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(imageX, centerY - imageHeight);
        ctx.lineTo(imageX - 5, centerY - imageHeight - 10);
        ctx.lineTo(imageX + 5, centerY - imageHeight - 10);
        ctx.closePath();
        ctx.fill();
      }

      // Label image
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '14px Arial';
      ctx.fillText(v < 0 ? 'Real Image' : 'Virtual Image', imageX - 30, centerY + 20);
    }

    // Draw measurements if enabled
    if (params.showMeasurements) {
      ctx.strokeStyle = '#9CA3AF';
      ctx.fillStyle = '#9CA3AF';
      ctx.lineWidth = 1;
      ctx.font = '12px Arial';

      // Object distance
      ctx.beginPath();
      ctx.moveTo(objectX, centerY + 40);
      ctx.lineTo(mirrorPoleX, centerY + 40);
      ctx.stroke();
      ctx.fillText(`u = ${params.objectDistance} cm`, (objectX + mirrorPoleX) / 2 - 30, centerY + 55);

      // Focal length
      ctx.beginPath();
      ctx.moveTo(focalX, centerY + 60);
      ctx.lineTo(mirrorPoleX, centerY + 60);
      ctx.stroke();
      ctx.fillText(`f = ${params.focalLength} cm`, (focalX + mirrorPoleX) / 2 - 20, centerY + 75);
    }

  }, [params]);

  return (
    <canvas
      ref={canvasRef}
      width={1400}
      height={700}
      className="w-full h-auto border border-gray-700 rounded-lg"
      style={{ maxHeight: '80vh' }}
    />
  );
};

export default ConcaveMirrorCanvas;
