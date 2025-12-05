import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import { getSimulationByRoute } from '../simulations/registry';

// Dynamic import map for simulation components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const simulationComponents: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  'diffusion': React.lazy(() => import('../simulations/chemistry/Diffusion/DiffusionSimulation')),
  'reaction-lab': React.lazy(() => import('../simulations/chemistry/ReactionLab/ReactionLabSimulation')),
  'le-chatelier': React.lazy(() => import('../simulations/chemistry/LeChatelier/LeChatelierSimulation')),
  'convex-lens': React.lazy(() => import('../simulations/physics/ConvexLens/ConvexLensSimulation')),
  'concave-mirror': React.lazy(() => import('../simulations/physics/ConcaveMirror/ConcaveMirrorSimulation')),
  // Add more simulations here as you create them
  // 'projectile-motion': React.lazy(() => import('../simulations/physics/ProjectileMotion/ProjectileMotionSimulation')),
};

const SimulationRunnerPage = () => {
  const { category, simulationId } = useParams<{ category: string; simulationId: string }>();
  
  // Find the simulation config
  const route = `/simulations/${category}/${simulationId}`;
  const config = getSimulationByRoute(route);

  // If simulation not found, redirect
  if (!config || !simulationId) {
    return <Navigate to={`/simulations/${category}`} replace />;
  }

  // Get the simulation component
  const SimulationComponent = simulationComponents[simulationId];

  if (!SimulationComponent) {
    return <Navigate to={`/simulations/${category}/${simulationId}`} replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Minimal Header */}
      <div className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to={`/simulations/${category}/${simulationId}`}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back to Details</span>
              </Link>
              <div className="h-4 w-px bg-gray-700" />
              <h1 className="text-lg font-semibold text-white">{config.name}</h1>
            </div>
            
            <Link 
              to={`/simulations/${category}/${simulationId}`}
              className="text-gray-400 hover:text-white transition-colors"
              title="Close Simulation"
            >
              <X className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Simulation Content */}
      <div className="container mx-auto px-4 py-6">
        <React.Suspense fallback={
          <div className="flex items-center justify-center h-96">
            <div className="text-white text-xl">Loading simulation...</div>
          </div>
        }>
          <SimulationComponent />
        </React.Suspense>
      </div>
    </div>
  );
};

export default SimulationRunnerPage;
