import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Target,
  Award,
  BookOpen,
  Play,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Zap,
} from "lucide-react";
import { SimulationConfig } from "../simulations/types/simulationTypes";

interface ExperimentDetailPageProps {
  config: SimulationConfig;
}

const ExperimentDetailPage = ({ config }: ExperimentDetailPageProps) => {
  const navigate = useNavigate();

  const categoryColors = {
    physics: {
      primary: "from-blue-500 to-cyan-500",
      badge: "bg-blue-100 text-blue-800 border-blue-200",
      button: "from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700",
    },
    chemistry: {
      primary: "from-purple-500 to-pink-500",
      badge: "bg-purple-100 text-purple-800 border-purple-200",
      button:
        "from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
    },
    biology: {
      primary: "from-green-500 to-emerald-500",
      badge: "bg-green-100 text-green-800 border-green-200",
      button:
        "from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700",
    },
    math: {
      primary: "from-orange-500 to-yellow-500",
      badge: "bg-orange-100 text-orange-800 border-orange-200",
      button:
        "from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700",
    },
  };

  const colors = categoryColors[config.category];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div
        className={`relative bg-gradient-to-r ${colors.primary} text-white overflow-hidden`}
      >
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 py-12">
          {/* Back Button */}
          <Link
            to={`/simulations/${config.category}`}
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl transition-all duration-300 mb-8 border border-white/30"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">
              Back to{" "}
              {config.category.charAt(0).toUpperCase() +
                config.category.slice(1)}
            </span>
          </Link>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold ${colors.badge} backdrop-blur-sm border`}
                >
                  {config.difficulty.charAt(0).toUpperCase() +
                    config.difficulty.slice(1)}
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{config.duration} minutes</span>
                </div>
              </div>

              <h1 className="text-5xl font-bold mb-4 leading-tight">
                {config.name}
              </h1>

              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {config.description}
              </p>

              <button
                onClick={() => navigate(`${config.route}/simulation`)}
                className={`bg-gradient-to-r ${colors.button} text-white font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 text-lg group`}
              >
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Launch Simulation
                <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </button>
            </div>

            {/* Right: Icon */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl animate-pulse" />
                <div className="relative bg-white/10 backdrop-blur-md border border-white/30 rounded-3xl p-16 shadow-2xl">
                  <config.icon className="w-48 h-48 text-white drop-shadow-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${colors.primary} rounded-xl flex items-center justify-center`}
                >
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                {config.longDescription}
              </p>
            </div>

            {config.simulationDetails && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${colors.primary} rounded-xl flex items-center justify-center`}
                  >
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    How It Works
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 text-lg">
                      Simulation Mechanics
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                      {config.simulationDetails.howItWorks}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 text-lg">
                      Key Concepts
                    </h3>
                    <ul className="space-y-2">
                      {config.simulationDetails.keyConcepts.map(
                        (concept, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-lg text-gray-700"
                          >
                            <div
                              className={`w-2 h-2 bg-gradient-to-br ${colors.primary} rounded-full mt-2 flex-shrink-0`}
                            />
                            {concept}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 text-lg">
                      Controls Guide
                    </h3>
                    <ul className="space-y-3">
                      {config.simulationDetails.controls.map(
                        (control, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-lg text-gray-700"
                          >
                            <div className="w-6 h-6 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                              {index + 1}
                            </div>
                            {control}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {config.simulationDetails.proTip && (
                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl border border-yellow-200 p-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-yellow-800 mb-1">
                            Pro Tip
                          </h4>
                          <p className="text-yellow-700">
                            {config.simulationDetails.proTip}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Learning Objectives */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${colors.primary} rounded-xl flex items-center justify-center`}
                >
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Learning Objectives
                </h2>
              </div>
              <div className="space-y-4">
                {config.objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div
                      className={`mt-1 w-6 h-6 bg-gradient-to-br ${colors.primary} rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {objective}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Prerequisites
                </h2>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-amber-600 mt-1">•</span>
                  <span className="text-lg">
                    Basic understanding of {config.category} concepts
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-600 mt-1">•</span>
                  <span className="text-lg">
                    Familiarity with scientific method and experimentation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-600 mt-1">•</span>
                  <span className="text-lg">
                    No prior simulation experience required
                  </span>
                </li>
              </ul>
            </div>

            {/* How to Use */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  How to Use This Simulation
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Click "Launch Simulation" to open the interactive experiment
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Adjust parameters using the control panel on the right side
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Observe changes in real-time and take notes of patterns
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Reset and experiment with different values to explore
                    thoroughly
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-800 mb-6">
                Quick Info
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${colors.primary} rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Duration
                    </p>
                    <p className="text-lg font-bold text-gray-800">
                      {config.duration} minutes
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${colors.primary} rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Difficulty
                    </p>
                    <p className="text-lg font-bold text-gray-800 capitalize">
                      {config.difficulty}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${colors.primary} rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Objectives
                    </p>
                    <p className="text-lg font-bold text-gray-800">
                      {config.objectives.length} learning goals
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-600 mb-3">
                  Topics Covered
                </h4>
                <div className="flex flex-wrap gap-2">
                  {config.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200 capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => navigate(`${config.route}/simulation`)}
                className={`w-full mt-8 bg-gradient-to-r ${colors.button} text-white font-bold px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group`}
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Start Experiment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperimentDetailPage;
