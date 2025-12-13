import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { categories } from "../simulations/registry";
import { useTranslation } from "react-i18next";

const SimulationsPage = () => {
  const { t } = useTranslation();
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
                {t("simulations_page.back")}
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {t("simulations_page.title")}
                </h1>
                <p className="text-gray-600">
                  {t("simulations_page.subtitle")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t("simulations_page.browse_by_subject")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryList.map((category) => (
              <Link
                key={category.id}
                to={`/simulations/${category.id}`}
                className="group"
              >
                <div
                  className={`card bg-gradient-to-br ${category.gradient} text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
                >
                  <div className="card-body items-center text-center">
                    <div className="text-6xl mb-3">{category.icon}</div>
                    <h3 className="card-title text-2xl font-bold mb-2">
                      {t(`categories.${category.id}.name`)}
                    </h3>
                    <p className="text-white/90 text-sm mb-4">
                      {t(`categories.${category.id}.description`)}
                    </p>
                    <div className="badge badge-lg bg-white/20 border-0 text-white">
                      {t("simulations_page.simulation_count", {
                        count: category.simulationCount,
                      })}
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                      {t("simulations_page.explore")}
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
