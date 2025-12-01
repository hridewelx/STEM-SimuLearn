import { useParams, Navigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Target,
  Beaker,
  FlaskConical,
  Atom,
  Sparkles,
} from "lucide-react";
import { getSimulationsByCategory, categories, comingSoonSimulations } from "../simulations/registry";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  
  if (!category || !categories[category]) {
    return <Navigate to="/simulations" replace />;
  }

  const categoryInfo = categories[category];
  const categorySimulations = getSimulationsByCategory(category);
  const comingSoonSims = comingSoonSimulations.filter((sim) => sim.category === category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/80 via-pink-50/60 to-indigo-50/80 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.8))]" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/60">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link
                to="/simulations"
                className="group bg-white/80 hover:bg-white border border-gray-200 hover:border-purple-300 rounded-2xl px-4 py-3 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
                  <span className="font-medium text-gray-700 group-hover:text-purple-700">
                    All Subjects
                  </span>
                </div>
              </Link>

              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className={`w-20 h-20 bg-gradient-to-br ${categoryInfo.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Beaker className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <FlaskConical className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div>
                  <h1 className={`text-4xl font-bold bg-gradient-to-r ${categoryInfo.gradient} bg-clip-text text-transparent mb-2`}>
                    {categoryInfo.name}
                  </h1>
                  <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
                    {categoryInfo.description}
                  </p>
                </div>
              </div>
            </div>

            <div className={`bg-gradient-to-r ${categoryInfo.gradient} text-white px-6 py-3 rounded-2xl shadow-lg`}>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {categorySimulations.length}
                </div>
                <div className="text-sm opacity-90">
                  {categorySimulations.length === 1 ? "Active Experiment" : "Active Experiments"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-12">
        {/* Active Simulations */}
        {categorySimulations.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-1 h-8 bg-gradient-to-b ${categoryInfo.gradient} rounded-full`} />
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Laboratory Experiments
                </h2>
                <p className="text-gray-600">
                  Interactive simulations to explore {category} principles
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {categorySimulations.map((sim) => (
                <Link
                  key={sim.id}
                  to={sim.route}
                  className="group relative bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden"
                >
                  {/* Gradient Border Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${categoryInfo.gradient} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                  {/* Thumbnail */}
                  <div className={`h-52 bg-gradient-to-br ${categoryInfo.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-grid-white/10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <sim.icon className="w-24 h-24 text-white opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                      </div>
                    </div>

                    {/* Difficulty Badge */}
                    <div className="absolute top-4 right-4">
                      <div
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm border ${
                          sim.difficulty === "beginner"
                            ? "bg-green-500/90 text-white border-green-200"
                            : sim.difficulty === "intermediate"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : "bg-pink-100 text-pink-800 border-pink-200"
                        }`}
                      >
                        {sim.difficulty.charAt(0).toUpperCase() + sim.difficulty.slice(1)}
                      </div>
                    </div>
                  </div>

                  <div className="card-body p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-700 transition-colors leading-tight">
                        {sim.name}
                      </h3>
                      <Sparkles className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <p className="text-gray-600 text-sm mb-5 leading-relaxed line-clamp-2">
                      {sim.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-5">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{sim.duration} min</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          <span>{sim.objectives.length} objectives</span>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {sim.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200"
                        >
                          {tag
                            .split(" ")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="card-actions">
                      <button className={`w-full bg-gradient-to-r ${categoryInfo.gradient} hover:opacity-90 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-3 group/btn`}>
                        <span>Start Experiment</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Coming Soon */}
        {comingSoonSims.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full" />
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Future Experiments
                </h2>
                <p className="text-gray-600">
                  Exciting new simulations in development
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {comingSoonSims.map((sim) => (
                <div
                  key={sim.id}
                  className="group relative bg-white/60 backdrop-blur-sm border border-gray-200/40 rounded-3xl shadow-lg overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-gray-700/5 z-10" />

                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-gray-500/80 text-white px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm border border-gray-600/30">
                      Coming Soon
                    </div>
                  </div>

                  <div className="h-52 bg-gradient-to-br from-gray-400 to-gray-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/5" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <sim.icon className="w-24 h-24 text-white opacity-15" />
                    </div>
                  </div>

                  <div className="card-body p-6 relative z-10">
                    <h3 className="text-xl font-bold text-gray-500 mb-3">
                      {sim.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                      {sim.description}
                    </p>

                    <button className="w-full bg-gray-400 text-white font-semibold py-3.5 rounded-xl cursor-not-allowed flex items-center justify-center gap-3">
                      <span>In Development</span>
                      <Atom className="w-4 h-4 animate-spin" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {categorySimulations.length === 0 && comingSoonSims.length === 0 && (
          <div className="text-center py-24">
            <div className={`w-32 h-32 bg-gradient-to-br ${categoryInfo.gradient} opacity-20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg`}>
              <Beaker className="w-16 h-16 text-gray-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              {categoryInfo.name} Lab Under Construction
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto leading-relaxed">
              We're preparing exciting {category} experiments for you. Check back soon!
            </p>
            <Link
              to="/simulations"
              className={`bg-gradient-to-r ${categoryInfo.gradient} text-white font-semibold px-8 py-4 rounded-2xl hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3`}
            >
              Explore Other Subjects
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
