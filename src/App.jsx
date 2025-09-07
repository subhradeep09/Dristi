import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AdvancedFeatures from './components/AdvancedFeatures';
import StatsSection from './components/StatsSection';
import TechnologyStack from './components/TechnologyStack';
import WhyChooseSection from './components/WhyChooseSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AdvancedFeatures />
      <StatsSection />
      <TechnologyStack />
      <WhyChooseSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default App;