import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone } from 'lucide-react';

const CTASection = () => {
  const navigate = useNavigate();

  const handleTouristRegistration = () => {
    navigate('/register');
  };

  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  return (
    <section className="py-24 bg-gradient-to-r from-purple-600 to-blue-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
          Ready to Transform Tourist Safety?
        </h2>
        <p className="text-xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
          Join thousands of destinations already using DrisTi to protect their visitors 
          and enhance their travel experience with cutting-edge technology.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <button 
            onClick={handleTouristRegistration}
            className="group bg-white text-purple-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
          >
            <span className="flex items-center justify-center gap-2">
              Tourist Registration
              <span className="group-hover:translate-x-1 transition-transform"></span>
            </span>
          </button>
          <button 
            onClick={handleAdminLogin}
            className="group bg-transparent border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300"
          >
            <span className="flex items-center justify-center gap-2">
              Admin Login
              
            </span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="group text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
              Free
            </div>
            <div className="text-white/80 text-lg">Setup & Onboarding</div>
            <div className="w-16 h-1 bg-white/30 mx-auto mt-3 group-hover:bg-yellow-300 transition-colors rounded-full"></div>
          </div>
          <div className="group text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
              24/7
            </div>
            <div className="text-white/80 text-lg">Technical Support</div>
            <div className="w-16 h-1 bg-white/30 mx-auto mt-3 group-hover:bg-yellow-300 transition-colors rounded-full"></div>
          </div>
          <div className="group text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
              Instant
            </div>
            <div className="text-white/80 text-lg">Deployment</div>
            <div className="w-16 h-1 bg-white/30 mx-auto mt-3 group-hover:bg-yellow-300 transition-colors rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;