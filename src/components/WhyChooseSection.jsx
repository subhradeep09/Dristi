import React from 'react';
import { CheckCircle, Clock, Zap, Globe, Shield } from 'lucide-react';

const WhyChooseSection = () => {
  const benefits = [
    {
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      title: "Enhanced Safety Coverage",
      description: "Comprehensive monitoring across all tourist areas with 360-degree protection."
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "Data Privacy Compliant", 
      description: "GDPR and international data protection standards with end-to-end encryption."
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-500" />,
      title: "Rapid Response System",
      description: "Automated emergency protocols with sub-30 second response times for critical incidents."
    },
    {
      icon: <Globe className="w-8 h-8 text-orange-500" />,
      title: "Universal Accessibility", 
      description: "Multi-platform support with offline capabilities and accessibility features for all users."
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Why Choose SafeTour?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Advanced tourist safety management platform with cutting-edge technology and 
              proven results across multiple destinations.
            </p>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1">
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-1">
                <div className="bg-gray-800 rounded-xl p-8">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
                      <Shield className="w-16 h-16 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Advanced Protection</h3>
                    <p className="text-gray-300">AI-powered safety ecosystem for modern tourism</p>
                    
                    <div className="grid grid-cols-3 gap-4 mt-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">50+</div>
                        <div className="text-gray-400 text-sm">Languages</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">1M+</div>
                        <div className="text-gray-400 text-sm">Users</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">99%</div>
                        <div className="text-gray-400 text-sm">Accuracy</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;