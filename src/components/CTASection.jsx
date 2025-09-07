import React from 'react';

const CTASection = () => {
  const highlights = [
    { value: "Free", label: "Setup & Onboarding" },
    { value: "24/7", label: "Technical Support" },
    { value: "Instant", label: "Deployment" }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Transform Tourist Safety?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          Join thousands of destinations already using SafeTour to protect their visitors 
          and enhance their travel experience with cutting-edge technology.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="group bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            <span className="flex items-center justify-center gap-2">
              Request Demo
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>
          <button className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300">
            <span className="flex items-center justify-center gap-2">
              Contact Sales
              <span className="group-hover:translate-x-1 transition-transform">📞</span>
            </span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {highlights.map((item, index) => (
            <div key={index} className="group text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                {item.value}
              </div>
              <div className="text-white/80">{item.label}</div>
              <div className="w-16 h-1 bg-white/30 mx-auto mt-2 group-hover:bg-yellow-300 transition-colors rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;