import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, MapPin, AlertTriangle } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleTouristRegistration = () => {
    navigate('/register');
  };

  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/50 to-blue-800/50"></div>
        
        {/* Animated background shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-48 h-48 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-pink-500/20 rounded-full blur-lg animate-pulse"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="w-full h-full" 
            style={{
              backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          ></div>
        </div>
      </div>
      
      <div className="relative container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-16 sm:pb-20 text-center z-10">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced heading */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 leading-none tracking-tight">
              Smart Tourist{' '}
              <span className="relative inline-block">
                <span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
                  style={{
                    backgroundSize: '200% 200%',
                    animation: 'gradient 3s ease infinite'
                  }}
                >
                  Safety
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-lg blur opacity-30 animate-pulse"></div>
              </span>
            </h1>
          </div>
          
          {/* Enhanced description */}
          <div className="mb-10 sm:mb-12">
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light px-4">
              AI-powered monitoring system with{' '}
              <span className="text-purple-300 font-semibold">real-time security alerts</span>, comprehensive{' '}
              <span className="text-blue-300 font-semibold">location tracking</span>, and 
              instant <span className="text-pink-300 font-semibold">emergency response</span> for tourist safety.
            </p>
          </div>
          
          {/* Enhanced CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16 sm:mb-20 px-4">
            <button 
              onClick={handleTouristRegistration}
              className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl w-full sm:w-auto"
            >
              <span className="relative z-10">Tourist Registration</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition duration-300"></div>
            </button>
            <button 
              onClick={handleAdminLogin}
              className="group bg-white/10 hover:bg-white/20 text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 border-2 border-white/30 hover:border-white/50 backdrop-blur-sm w-full sm:w-auto"
            >
              <span className="flex items-center gap-2 justify-center">
                Admin Login
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            </button>
          </div>

          {/* Enhanced feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto px-4">
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
              <div className="mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-purple-300 transition-colors">
                Blockchain Security
              </h3>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                Decentralized security protocols with immutable safety records
              </p>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 hover:border-blue-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
              <div className="mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110">
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-blue-300 transition-colors">
                Real-time Tracking
              </h3>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                GPS monitoring with intelligent route optimization
              </p>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 hover:border-red-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
              <div className="mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-red-500/50 transition-all duration-300 group-hover:scale-110">
                  <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-red-300 transition-colors">
                Emergency Response
              </h3>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                Instant alerts and automated emergency protocols
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;