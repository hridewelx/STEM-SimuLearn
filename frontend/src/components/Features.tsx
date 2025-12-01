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

const Features = () => {
  const features = [
    {
      title: "Physics Simulations",
      description:
        "Explore mechanics, thermodynamics, electromagnetism, and quantum physics through interactive experiments.",
      icon: <Atom className="w-8 h-8" />,
      color: "primary",
      experiments: [
        // "Projectile Motion",
        // "Pendulum Oscillation",
        // "Wave Interference",
        // "Circuit Builder",
      ],
    },
    {
      title: "Chemistry Lab",
      description:
        "Perform virtual chemical reactions, explore molecular structures, and understand chemical principles safely.",
      icon: <Beaker className="w-8 h-8" />,
      color: "secondary",
      experiments: [
        // "Acid-Base Titration",
        // "Molecular Modeling",
        // "Reaction Kinetics",
        // "Periodic Table",
      ],
    },
    {
      title: "Biology Exploration",
      description:
        "Dive into cellular processes, genetics, ecosystems, and human anatomy with detailed visualizations.",
      icon: <Dna className="w-8 h-8" />,
      color: "accent",
      experiments: [
        // "Cell Division",
        // "DNA Replication",
        // "Photosynthesis",
        // "Human Body Systems",
      ],
    },
    {
      title: "Mathematics Toolkit",
      description:
        "Visualize functions, solve equations, explore geometry, and understand statistical concepts interactively.",
      icon: <Calculator className="w-8 h-8" />,
      color: "info",
      experiments: [
        // "Graph Plotter",
        // "Calculus Visualizer",
        // "3D Geometry",
        // "Statistics Lab",
      ],
    },
  ];

  const additionalFeatures = [
    {
      title: "Real-time Collaboration",
      description: "Work together with classmates on experiments in real-time",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics",
      icon: <BarChart className="w-6 h-6" />,
    },
    {
      title: "Curriculum Aligned",
      description: "Content aligned with international science standards",
      icon: <BookOpen className="w-6 h-6" />,
    },
  ];

  return (
    <section id="features" className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Four Disciplines,{" "}
            <span className="text-primary">Endless Possibilities</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Access a comprehensive suite of interactive simulations designed to
            make complex concepts easy to understand
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

                    <div className="flex flex-wrap gap-2 mb-4">
                      {feature.experiments.map((exp, i) => (
                        <div
                          key={i}
                          className="badge badge-outline badge-primary"
                        >
                          {exp}
                        </div>
                      ))}
                    </div>

                    <button className="btn btn-primary btn-sm">
                      Explore {feature.title.split(" ")[0]}
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
