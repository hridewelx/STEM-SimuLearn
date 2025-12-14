import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Target, Award, Play, Zap, Book } from 'lucide-react';
import { SimulationConfig } from '../simulations/types';

interface SimulationViewerProps {
  config: SimulationConfig;
  children: ReactNode;
}

const SimulationViewer = ({ config, children }: SimulationViewerProps) => {
  const categoryColors = {
    physics: { badge: 'badge-info', gradient: 'from-blue-500 to-cyan-500' },
    chemistry: { badge: 'badge-secondary', gradient: 'from-purple-500 to-pink-500' },
    biology: { badge: 'badge-accent', gradient: 'from-green-500 to-emerald-500' },
    math: { badge: 'badge-warning', gradient: 'from-orange-500 to-yellow-500' }
  };

  const colors = categoryColors[config.category as keyof typeof categoryColors];

  // Simulation-specific descriptions (you could move this to config)
  const simulationDetails = {
    'diffusion-1': {
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
      ]
    }
  };

  const details = simulationDetails[config.id as keyof typeof simulationDetails];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to={`/simulations/${config.category}`} className="btn btn-ghost btn-sm gap-2 text-white">
                <ArrowLeft className="w-4 h-4" />
                Back to {config.category.charAt(0).toUpperCase() + config.category.slice(1)}
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  <config.icon className="w-6 h-6" />
                  {config.name}
                </h1>
                <p className="text-sm text-gray-400">{config.category.charAt(0).toUpperCase() + config.category.slice(1)} Simulation</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`badge ${colors.badge} badge-lg`}>
                {config.difficulty}
              </div>
              <div className="badge badge-outline badge-lg text-white">
                {config.duration} min
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Simulation */}
      <div className="container mx-auto px-4 py-8">
        {children}

        {/* How It Works Section */}
        {details && (
          <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              How This Simulation Works
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Description */}
              <div className="lg:col-span-2">
                <h3 className="font-semibold text-white mb-3 text-lg">Simulation Overview</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {details.howItWorks}
                </p>
                
                <h3 className="font-semibold text-white mb-3 text-lg">Key Concepts Demonstrated</h3>
                <ul className="space-y-2">
                {details.keyConcepts.map((concept: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      {concept}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Controls & Interaction */}
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Play className="w-5 h-5 text-green-400" />
                  How to Interact
                </h3>
                <ul className="space-y-3">
                  {details.controls.map((control: string, index: number) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                      {control}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                    <Book className="w-4 h-4" />
                    Pro Tip
                  </h4>
                  <p className="text-blue-200 text-sm">
                    Try starting with extreme values (very high vs very low temperature) to see dramatic differences in diffusion rates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* About Section */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">About This Simulation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-start gap-3">
              <Clock className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white mb-1">Duration</h3>
                <p className="text-gray-400 text-sm">Approximately {config.duration} minutes</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Target className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white mb-1">Objectives</h3>
                <p className="text-gray-400 text-sm">{config.objectives.length} learning objectives</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Award className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white mb-1">Difficulty</h3>
                <p className="text-gray-400 text-sm capitalize">{config.difficulty} level</p>
              </div>
            </div>
          </div>

          <div className="text-gray-300 space-y-4">
            <p className="leading-relaxed">{config.longDescription}</p>
            
            <div>
              <h3 className="font-bold text-white mb-3">Learning Objectives:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {config.objectives.map((objective: string, index: number) => (
                  <li key={index} className="text-gray-300">{objective}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-3">Topics Covered:</h3>
              <div className="flex flex-wrap gap-2">
                {config.tags.map((tag: string, index: number) => (
                  <span key={index} className="badge badge-outline text-white">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationViewer;