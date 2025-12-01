import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { categories } from '../simulations/registry';

const SimulationsPage = () => {
  const categoryList = Object.values(categories);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="btn btn-ghost btn-sm gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Simulations</h1>
                <p className="text-gray-600">Explore interactive STEM experiments</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse by Subject</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryList.map((category) => (
              <Link
                key={category.id}
                to={`/simulations/${category.id}`}
                className="group"
              >
                <div className={`card bg-gradient-to-br ${category.gradient} text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
                  <div className="card-body items-center text-center">
                    <div className="text-6xl mb-3">{category.icon}</div>
                    <h3 className="card-title text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-white/90 text-sm mb-4">{category.description}</p>
                    <div className="badge badge-lg bg-white/20 border-0 text-white">
                      {category.simulationCount} {category.simulationCount === 1 ? 'Simulation' : 'Simulations'}
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                      Explore
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationsPage;
