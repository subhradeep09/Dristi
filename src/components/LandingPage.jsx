import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import AdvancedFeatures from './AdvancedFeatures';
import StatsSection from './StatsSection';
import TechnologyStack from './TechnologyStack';
import WhyChooseSection from './WhyChooseSection';
import CTASection from './CTASection';
import Footer from './Footer';

const LandingPage = () => {
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

export default LandingPage;
