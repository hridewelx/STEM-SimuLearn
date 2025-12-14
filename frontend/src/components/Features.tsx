import {
  Beaker,
  Atom,
  Dna,
  Calculator,
  Users,
  BarChart,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const Features = () => {
  const { t, ready } = useTranslation();

  if (!ready) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  const features = [
    {
      title: t("features.cards.physics.title"),
      description: t("features.cards.physics.description"),
      icon: <Atom className="w-8 h-8" />,
      color: "primary",
      action: t("features.cards.physics.action"),
    },
    {
      title: t("features.cards.chemistry.title"),
      description: t("features.cards.chemistry.description"),
      icon: <Beaker className="w-8 h-8" />,
      color: "secondary",
      action: t("features.cards.chemistry.action"),
    },
    {
      title: t("features.cards.biology.title"),
      description: t("features.cards.biology.description"),
      icon: <Dna className="w-8 h-8" />,
      color: "accent",
      action: t("features.cards.biology.action"),
    },
    {
      title: t("features.cards.math.title"),
      description: t("features.cards.math.description"),
      icon: <Calculator className="w-8 h-8" />,
      color: "info",
      action: t("features.cards.math.action"),
    },
  ];

  const additionalFeatures = [
    {
      title: t("features.extra.collaboration.title"),
      description: t("features.extra.collaboration.description"),
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: t("features.extra.progress.title"),
      description: t("features.extra.progress.description"),
      icon: <BarChart className="w-6 h-6" />,
    },
    {
      title: t("features.extra.curriculum.title"),
      description: t("features.extra.curriculum.description"),
      icon: <BookOpen className="w-6 h-6" />,
    },
  ];

  return (
    <section id="features" className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("features.title_part1")}{" "}
            <span className="text-primary">{t("features.title_part2")}</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            {t("features.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300"
            >
              <div className="card-body">
                <div className="flex items-start gap-4">
                  <div className={`text-primary bg-primary/10 p-4 rounded-2xl`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="card-title text-2xl mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-base-content/70 mb-4">
                      {feature.description}
                    </p>

                    <button className="btn btn-primary btn-sm">
                      {feature.action}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {additionalFeatures.map((item, index) => (
            <div
              key={index}
              className="card bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg"
            >
              <div className="card-body items-center text-center">
                <div className="text-primary mb-3">{item.icon}</div>
                <h3 className="card-title text-lg">{item.title}</h3>
                <p className="text-sm text-base-content/70">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
