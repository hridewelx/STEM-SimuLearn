import { Users, School, Star, Beaker, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";

const Stats = () => {
  const { t, ready } = useTranslation();

  if (!ready) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  const stats = [
    {
      value: "50+",
      label: t("stats.items.simulations"),
      icon: <Beaker className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      value: "100K+",
      label: t("stats.items.students"),
      icon: <Users className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      value: "500+",
      label: t("stats.items.schools"),
      icon: <School className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      value: "4.9/5",
      label: t("stats.items.rating"),
      icon: <Star className="w-6 h-6" />,
      color: "from-orange-500 to-yellow-500",
    },
  ];

  const testimonials = [
    {
      text: t("stats.testimonials.items.0.text"),
      author: t("stats.testimonials.items.0.author"),
      role: t("stats.testimonials.items.0.role"),
      rating: 5,
      avatar: "SJ",
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      text: t("stats.testimonials.items.1.text"),
      author: t("stats.testimonials.items.1.author"),
      role: t("stats.testimonials.items.1.role"),
      rating: 5,
      avatar: "AC",
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
    },
    {
      text: t("stats.testimonials.items.2.text"),
      author: t("stats.testimonials.items.2.author"),
      role: t("stats.testimonials.items.2.role"),
      rating: 5,
      avatar: "MG",
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("stats.trusted.title")}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("stats.trusted.subtitle")}
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("stats.trusted.description")}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <div className="text-white">{stat.icon}</div>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              {t("stats.testimonials.title")}
            </h3>
            <p className="text-gray-600">{t("stats.testimonials.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <Quote className="w-8 h-8 text-primary/20 mb-4" />

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${testimonial.color} flex items-center justify-center text-white font-bold text-sm`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-6">
              Trusted by Leading Educational Institutions
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
              {["Stanford", "MIT", "Harvard", "UC Berkeley", "Cambridge"].map(
                (uni) => (
                  <span key={uni} className="text-xl font-bold text-gray-400">
                    {uni}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
