import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Stats from '../components/Stats'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <CTA />
      <Footer />
    </div>
  )
}

export default HomePage
