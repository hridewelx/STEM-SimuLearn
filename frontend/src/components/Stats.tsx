import { Users, School, Star, Beaker, Quote } from 'lucide-react';

const Stats = () => {
  const stats = [
    { 
      value: '50+', 
      label: 'Interactive Simulations', 
      icon: <Beaker className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      value: '100K+', 
      label: 'Active Students', 
      icon: <Users className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    },
    { 
      value: '500+', 
      label: 'Schools & Universities', 
      icon: <School className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500'
    },
    { 
      value: '4.9/5', 
      label: 'Average Rating', 
      icon: <Star className="w-6 h-6" />,
      color: 'from-orange-500 to-yellow-500'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Educators Worldwide</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of students and educators revolutionizing STEM education with interactive learning
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="group bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {stat.icon}
                </div>
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
              What Our Community Says
            </h3>
            <p className="text-gray-600">
              Hear from students, teachers, and educators using LabVerse
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "LabVerse transformed how my students understand physics. The interactive simulations make abstract concepts tangible and engaging.",
                author: "Dr. Sarah Johnson",
                role: "Physics Teacher, Stanford High",
                rating: 5,
                avatar: "SJ",
                color: "bg-gradient-to-br from-blue-500 to-cyan-500"
              },
              {
                text: "As a visual learner, I struggled with chemistry until I found this platform. Being able to manipulate molecules changed everything.",
                author: "Alex Chen",
                role: "University Student",
                rating: 5,
                avatar: "AC",
                color: "bg-gradient-to-br from-purple-500 to-pink-500"
              },
              {
                text: "The most intuitive virtual lab platform I've used. It's comprehensive, scientifically accurate, and actually makes learning fun.",
                author: "Maria Garcia",
                role: "Science Department Head",
                rating: 5,
                avatar: "MG",
                color: "bg-gradient-to-br from-green-500 to-emerald-500"
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="group bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-gray-300 group-hover:text-blue-300 transition-colors" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-4 h-4 fill-yellow-400 text-yellow-400" 
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center text-white font-semibold`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-500 mb-6 font-medium">
              TRUSTED BY LEADING EDUCATIONAL INSTITUTIONS
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {['Stanford', 'MIT', 'Harvard', 'UC Berkeley', 'Cambridge'].map((institution, index) => (
                <div 
                  key={index} 
                  className="text-gray-400 font-bold text-lg hover:text-gray-600 transition-colors cursor-pointer"
                >
                  {institution}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;