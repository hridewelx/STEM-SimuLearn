import { useState, useCallback } from 'react';
import { Atom, FlaskConical, Maximize2, Minimize2, Settings, BarChart3, Play, Pause, RotateCcw } from 'lucide-react';
import ReactionLabCanvas from './ReactionLabCanvas';
import ReactionLabVisualCanvas from './ReactionLabVisualCanvas';
import ReactionLabControls from './ReactionLabControls';
import ReactionLabAnalytics from './ReactionLabAnalytics';
import AITutorPanel from '../../../components/AITutorPanel';
import { ReactionLabParams, ReactionLabAnalyticsData } from './types';
import { defaultReactionLabParams, reactionLabConfig } from './config';

type ViewMode = 'visual' | 'molecular';

const ReactionLabSimulation = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('visual');
  const [params, setParams] = useState<ReactionLabParams>(defaultReactionLabParams);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<'none' | 'controls' | 'analytics'>('none');
  const [analytics, setAnalytics] = useState<ReactionLabAnalyticsData>({
    progressPercentage: 0,
    reactionRate: 0,
    productsFormed: 0,
    totalParticles: 0,
    balancedEquation: 'Select reactants to begin',
    energyChange: 'neutral',
    stoichiometricRatio: '0:0',
    limitingReagent: '',
    excessReagent: '',
    theoreticalYield: 0,
    actualYield: 0,
    percentYield: 0,
  });

  const handleParamsChange = (newParams: Partial<ReactionLabParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setParams(defaultReactionLabParams);
    setAnalytics({
      progressPercentage: 0,
      reactionRate: 0,
      productsFormed: 0,
      totalParticles: 0,
      balancedEquation: 'Select reactants to begin',
      energyChange: 'neutral',
      stoichiometricRatio: '0:0',
      limitingReagent: '',
      excessReagent: '',
      theoreticalYield: 0,
      actualYield: 0,
      percentYield: 0,
    });
  };

  const handleAnalyticsUpdate = useCallback((data: ReactionLabAnalyticsData) => {
    setAnalytics(data);
  }, []);

  const simulationData = {
    simulationId: reactionLabConfig.id,
    category: reactionLabConfig.category,
    state: {
      params,
      isRunning,
      analytics,
      viewMode,
    },
    metadata: {
      name: reactionLabConfig.name,
      objectives: reactionLabConfig.objectives,
      tags: reactionLabConfig.tags,
    },
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-gray-900/80 rounded-xl p-1 border border-gray-700/50">
            <button
              onClick={() => {
                setViewMode('visual');
                setIsRunning(false);
                handleReset();
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                viewMode === 'visual'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              <span className="hidden sm:inline">Visual Lab</span>
            </button>
            <button
              onClick={() => {
                setViewMode('molecular');
                setIsRunning(false);
                handleReset();
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                viewMode === 'molecular'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Atom className="w-4 h-4" />
              <span className="hidden sm:inline">Molecular</span>
            </button>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
              isRunning 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-gray-700/50 text-gray-400 border border-gray-600/30'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
              {isRunning ? 'Running' : 'Ready'}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Panel Toggles */}
      <div className="lg:hidden flex gap-2">
        <button
          onClick={() => setMobilePanel(mobilePanel === 'controls' ? 'none' : 'controls')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
            mobilePanel === 'controls'
              ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
              : 'bg-gray-800/80 text-gray-400 border border-gray-700/50 hover:bg-gray-800'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Controls</span>
        </button>
        <button
          onClick={() => setMobilePanel(mobilePanel === 'analytics' ? 'none' : 'analytics')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
            mobilePanel === 'analytics'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'bg-gray-800/80 text-gray-400 border border-gray-700/50 hover:bg-gray-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Analytics</span>
        </button>
      </div>

      {/* Mobile Panel Content */}
      {mobilePanel !== 'none' && (
        <div className="lg:hidden bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-4">
          {mobilePanel === 'controls' && (
            <ReactionLabControls
              params={params}
              isRunning={isRunning}
              onParamsChange={handleParamsChange}
              onToggleRunning={() => setIsRunning(!isRunning)}
              onReset={handleReset}
            />
          )}
          {mobilePanel === 'analytics' && (
            <ReactionLabAnalytics analytics={analytics} />
          )}
        </div>
      )}

      {/* Main Content Area */}
      <div className={`grid gap-4 transition-all duration-500 ${
        isFullscreen 
          ? 'grid-cols-1' 
          : 'lg:grid-cols-[320px_1fr_320px]'
      }`}>
        
        {/* Left Panel - Controls (Desktop) */}
        {!isFullscreen && (
          <div className="hidden lg:block">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden sticky top-4">
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 px-4 py-3 border-b border-gray-700/50">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-yellow-400" />
                  <h2 className="font-semibold text-white">Reaction Controls</h2>
                </div>
              </div>
              <div className="p-4 max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar">
                <ReactionLabControls
                  params={params}
                  isRunning={isRunning}
                  onParamsChange={handleParamsChange}
                  onToggleRunning={() => setIsRunning(!isRunning)}
                  onReset={handleReset}
                />
              </div>
            </div>
          </div>
        )}

        {/* Center - Simulation Canvas */}
        <div className={`${isFullscreen ? 'col-span-1' : ''}`}>
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden">
            {/* Canvas Header */}
            <div className={`px-4 py-3 border-b border-gray-700/50 ${
              viewMode === 'visual' 
                ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10' 
                : 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {viewMode === 'visual' ? (
                    <FlaskConical className="w-5 h-5 text-purple-400" />
                  ) : (
                    <Atom className="w-5 h-5 text-cyan-400" />
                  )}
                  <h2 className="font-semibold text-white">
                    {viewMode === 'visual' ? 'Visual Chemistry Lab' : 'Molecular Simulation'}
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  {/* Progress Bar */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-400 hidden sm:inline">Progress:</span>
                    <div className="w-20 sm:w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          viewMode === 'visual' 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                            : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                        }`}
                        style={{ width: `${analytics.progressPercentage}%` }}
                      />
                    </div>
                    <span className="text-white font-medium">{analytics.progressPercentage.toFixed(0)}%</span>
                  </div>
                  
                  {/* Fullscreen Controls */}
                  {isFullscreen && (
                    <div className="flex items-center gap-1 bg-gray-900/80 rounded-lg p-1 border border-gray-700/50">
                      <button
                        onClick={() => setIsRunning(!isRunning)}
                        className={`p-2 rounded-md transition-all ${
                          isRunning
                            ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                            : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        }`}
                        title={isRunning ? 'Pause' : 'Play'}
                      >
                        {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={handleReset}
                        className="p-2 rounded-md bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white transition-all"
                        title="Reset"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  
                  {/* Expand/Minimize Button */}
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className={`p-2 rounded-lg transition-all border ${
                      isFullscreen
                        ? 'bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30'
                        : 'bg-gray-700/50 text-gray-300 border-gray-600/50 hover:bg-gray-700 hover:text-white'
                    }`}
                    title={isFullscreen ? 'Exit Fullscreen' : 'Expand'}
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Canvas Content */}
            <div className={`${isFullscreen ? 'h-[calc(100vh-300px)]' : 'h-[450px] lg:h-[520px]'} p-2`}>
              {viewMode === 'visual' ? (
                <ReactionLabVisualCanvas
                  params={params}
                  isRunning={isRunning}
                  onAnalyticsUpdate={handleAnalyticsUpdate}
                />
              ) : (
                <ReactionLabCanvas
                  params={params}
                  isRunning={isRunning}
                  onAnalyticsUpdate={handleAnalyticsUpdate}
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Analytics (Desktop) */}
        {!isFullscreen && (
          <div className="hidden lg:block">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden sticky top-4">
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-4 py-3 border-b border-gray-700/50">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  <h2 className="font-semibold text-white">Reaction Analytics</h2>
                </div>
              </div>
              <div className="p-4 max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar">
                <ReactionLabAnalytics analytics={analytics} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Tutor Panel */}
      {!isFullscreen && (
        <div className="mt-4">
          <AITutorPanel simulationData={simulationData} />
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.8);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.8);
        }
      `}</style>
    </div>
  );
};

export default ReactionLabSimulation;
