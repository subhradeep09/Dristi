import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeatureHighlights from './components/FeatureHighlights';
import AdvancedFeatures from './components/AdvancedFeatures';
import StatsBar from './components/StatsBar';
import TechnologyStack from './components/TechnologyStack';
import WhyChoose from './components/WhyChoose';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-gray-900 text-white">
      <Navbar />
      <HeroSection />
      <FeatureHighlights />
      <AdvancedFeatures />
      <StatsBar />
      <TechnologyStack />
      <WhyChoose />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App
