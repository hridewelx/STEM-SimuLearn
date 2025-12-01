import {
  CirclePlay,
  Rocket,
  Star,
  Beaker,
  Atom,
  Dna,
  Calculator,
} from "lucide-react";
import { Link } from "react-router-dom";
// import ../index.css;

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

      {/* Floating Science Elements */}
      <div className="absolute top-20 left-10 w-8 h-8 bg-blue-200/30 rounded-full blur-xl animate-float" />
      <div
        className="absolute top-40 right-20 w-12 h-12 bg-purple-200/30 rounded-full blur-xl animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-40 left-20 w-10 h-10 bg-indigo-200/30 rounded-full blur-xl animate-float"
        style={{ animationDelay: "4s" }}
      />

      <div className="relative container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Premium Badge */}
          <div className="mb-8 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-4 py-2 shadow-lg">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Trusted by 10,000+ Students Worldwide
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
            <div className="leading-none">Explore Science</div>
            <div className="leading-relaxed mt-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent pb-1">
              Through Experience
            </div>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Master Physics, Chemistry, Biology, and Mathematics with hands-on
            virtual experiments. Learn by doing in our cutting-edge interactive
            laboratory environment.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/simulations" className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3">
              <Rocket className="w-6 h-6 group-hover:scale-110 transition-transform" />
              Start Exploring Now
            </Link>
            <button className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:border-black hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-3">
              <CirclePlay className="w-6 h-6 group-hover:scale-110 transition-transform" />
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-2xl mx-auto">
            {[
              { number: "50+", label: "Interactive Simulations" },
              { number: "10K+", label: "Active Students" },
              { number: "100+", label: "Learning Modules" },
              { number: "4.9/5", label: "Student Rating" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Subject Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "Physics",
                icon: <Atom className="w-8 h-8" />,
                color: "from-blue-500 to-cyan-500",
                experiments: "12 Simulations",
              },
              {
                name: "Chemistry",
                icon: <Beaker className="w-8 h-8" />,
                color: "from-green-500 to-emerald-500",
                experiments: "15 Experiments",
              },
              {
                name: "Biology",
                icon: <Dna className="w-8 h-8" />,
                color: "from-purple-500 to-pink-500",
                experiments: "10 Models",
              },
              {
                name: "Mathematics",
                icon: <Calculator className="w-8 h-8" />,
                color: "from-orange-500 to-red-500",
                experiments: "18 Tools",
              },
            ].map((subject) => (
              <div
                key={subject.name}
                className="group bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer hover:border-gray-300"
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${subject.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="text-white">{subject.icon}</div>
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{subject.name}</h3>
                <p className="text-sm text-gray-500">{subject.experiments}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
