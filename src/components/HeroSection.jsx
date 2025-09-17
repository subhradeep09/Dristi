import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, MapPin, AlertTriangle, Zap, Eye, Cpu } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleTouristRegistration = () => {
    navigate('/register');
  };

  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Futuristic animated background */}
      <div className="absolute inset-0">
        {/* Matrix-like digital rain */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px bg-gradient-to-b from-cyan-400 via-blue-500 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                height: `${Math.random() * 100 + 50}px`,
                animationDelay: `${Math.random() * 5}s`,
                animation: 'digitalRain 3s linear infinite'
              }}
            />
          ))}
        </div>

        {/* Holographic grid */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="w-full h-full" 
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 255, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.2) 1px, transparent 1px),
                radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px, 40px 40px, 20px 20px',
              animation: 'gridPulse 4s ease-in-out infinite'
            }}
          />
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-cyan-400 rotate-45 animate-spin-slow opacity-30"></div>
        <div className="absolute top-60 right-20 w-24 h-24 border-2 border-purple-500 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rotate-12 animate-bounce opacity-30"></div>
        
        {/* Neural network connections */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 600">
          <defs>
            <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ffff" />
              <stop offset="100%" stopColor="#ff00ff" />
            </linearGradient>
          </defs>
          {[...Array(20)].map((_, i) => (
            <line
              key={i}
              x1={Math.random() * 800}
              y1={Math.random() * 600}
              x2={Math.random() * 800}
              y2={Math.random() * 600}
              stroke="url(#neuralGrad)"
              strokeWidth="1"
              opacity="0.3"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </svg>

        {/* Holographic overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20"></div>
      </div>
      
      <div className="relative container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-16 sm:pb-20 text-center z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Futuristic heading with glitch effect */}
          <div className="mb-6 sm:mb-8">
            <div className="relative inline-block mb-4">
              <div className="text-cyan-400 text-sm sm:text-base font-mono tracking-widest mb-2 animate-pulse">
                [ SYSTEM INITIALIZED ]
              </div>
            </div>
            <h1 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 leading-none tracking-tight">
              <span className="relative inline-block">
                DRISHTI
                <div className="absolute inset-0 text-cyan-400 animate-pulse opacity-50">DRISHTI</div>
                <div className="absolute inset-0 text-pink-400 animate-ping opacity-30" style={{ animationDelay: '0.5s' }}>DRISTI</div>
              </span>
              <br />
              <span className="relative inline-block mt-2">
                <span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
                  style={{
                    backgroundSize: '400% 400%',
                    animation: 'holographicShift 3s ease infinite'
                  }}
                >
                  1.0
                </span>
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-lg blur-lg opacity-30 animate-pulse"></div>
              </span>
            </h1>
            
            {/* Advanced system metrics */}
            <div className="flex justify-center items-center gap-6 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400">UPTIME: 99.99%</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-cyan-400">LATENCY: 0.02ms</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-purple-400">ENCRYPTED</span>
              </div>
            </div>
            
            <div className="text-cyan-400 text-xs sm:text-sm font-mono tracking-widest animate-typewriter">
              &gt; NEURAL TOURIST SAFETY PROTOCOL ACTIVE_
            </div>
          </div>
          
          {/* Enhanced futuristic description */}
          <div className="mb-10 sm:mb-12">
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light px-4">
              Next-generation{' '}
              <span className="text-cyan-300 font-bold relative">
                AI-powered
                <span className="absolute -inset-1 bg-cyan-400/20 blur-sm rounded animate-pulse"></span>
              </span>{' '}
              neural network with quantum-encrypted{' '}
              <span className="text-purple-300 font-bold relative">
                live GPS tracking
                <span className="absolute -inset-1 bg-purple-400/20 blur-sm rounded animate-pulse"></span>
              </span>, predictive{' '}
              <span className="text-pink-300 font-bold relative">
                threat analysis
                <span className="absolute -inset-1 bg-pink-400/20 blur-sm rounded animate-pulse"></span>
              </span>{' '}
              and autonomous emergency protocols.
            </p>
          </div>
          
          {/* Futuristic CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16 sm:mb-20 px-4">
            <button 
              onClick={handleTouristRegistration}
              className="group relative bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-500 hover:via-purple-500 hover:to-pink-500 text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl w-full sm:w-auto border border-cyan-400/50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                TOURIST REGISTRATION
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-pink-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-xl opacity-0 group-hover:opacity-20 transition duration-300 animate-pulse"></div>
            </button>
            <button 
              onClick={handleAdminLogin}
              className="group relative bg-black/50 hover:bg-black/70 text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 border-2 border-cyan-400 hover:border-pink-400 backdrop-blur-sm w-full sm:w-auto overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 justify-center">
                <Eye className="w-5 h-5" />
                ADMIN LOGIN
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-pink-400/10 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </button>
          </div>

          {/* Futuristic feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto px-4">
            <div className="group relative bg-black/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-cyan-400/30 hover:border-cyan-400 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent group-hover:from-cyan-400/20 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-400/50 transition-all duration-300 group-hover:scale-110">
                    <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-cyan-300 transition-colors">
                  Quantum Security
                </h3>
                <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                  Military-grade encryption with quantum-resistant protocols
                </p>
                <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
              </div>
            </div>
            
            <div className="group relative bg-black/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-purple-400/30 hover:border-purple-400 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-transparent group-hover:from-purple-400/20 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-purple-500/30 group-hover:shadow-purple-400/50 transition-all duration-300 group-hover:scale-110">
                    <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-purple-300 transition-colors">
                  Neural Tracking
                </h3>
                <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                  AI-powered predictive analysis with machine learning
                </p>
                <div className="absolute top-2 right-2 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
            
            <div className="group relative bg-black/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-pink-400/30 hover:border-pink-400 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/5 to-transparent group-hover:from-pink-400/20 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-pink-500/30 group-hover:shadow-pink-400/50 transition-all duration-300 group-hover:scale-110">
                    <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-pink-300 transition-colors">
                  Autonomous Response
                </h3>
                <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                  Self-executing emergency protocols with zero latency
                </p>
                <div className="absolute top-2 right-2 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>

          {/* Status indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-sm font-mono">
            <div className="flex items-center gap-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              SYSTEM ONLINE
            </div>
            <div className="flex items-center gap-2 text-cyan-400">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              AI ACTIVE
            </div>
            <div className="flex items-center gap-2 text-purple-400">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              SECURE CONNECTION
            </div>
            <div className="flex items-center gap-2 text-yellow-400">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              QUANTUM READY
            </div>
          </div>

          {/* Advanced Tech Specs */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-black/30 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-3 text-center">
              <div className="text-cyan-400 text-lg font-bold font-mono">24/7</div>
              <div className="text-white/60 text-xs">MONITORING</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm border border-purple-400/20 rounded-lg p-3 text-center">
              <div className="text-purple-400 text-lg font-bold font-mono">256-bit</div>
              <div className="text-white/60 text-xs">ENCRYPTION</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm border border-pink-400/20 rounded-lg p-3 text-center">
              <div className="text-pink-400 text-lg font-bold font-mono">&lt;50ms</div>
              <div className="text-white/60 text-xs">RESPONSE</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm border border-green-400/20 rounded-lg p-3 text-center">
              <div className="text-green-400 text-lg font-bold font-mono">99.9%</div>
              <div className="text-white/60 text-xs">ACCURACY</div>
            </div>
          </div>

          {/* Floating code snippets */}
          <div className="absolute top-32 left-4 opacity-20 text-cyan-400 font-mono text-xs transform -rotate-12 hidden lg:block">
            <div className="bg-black/50 p-2 rounded border border-cyan-400/30">
              if (threat.detected) {'{'}
              <br />
              &nbsp;&nbsp;alert.send();
              <br />
              {'}'}
            </div>
          </div>

          <div className="absolute top-48 right-8 opacity-20 text-purple-400 font-mono text-xs transform rotate-12 hidden lg:block">
            <div className="bg-black/50 p-2 rounded border border-purple-400/30">
              neural.process(data)
              <br />
              .predict()
              <br />
              .secure();
            </div>
          </div>

          <div className="absolute bottom-32 left-8 opacity-20 text-pink-400 font-mono text-xs transform rotate-6 hidden lg:block">
            <div className="bg-black/50 p-2 rounded border border-pink-400/30">
              quantum.encrypt({'{'}
              <br />
              &nbsp;&nbsp;level: 'max'
              <br />
              {'}'});
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes holographicShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes digitalRain {
          0% {
            transform: translateY(-100vh);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        
        @keyframes gridPulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.02);
          }
        }
        
        @keyframes typewriter {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }
        
        .animate-typewriter {
          overflow: hidden;
          white-space: nowrap;
          animation: typewriter 3s steps(40, end) infinite;
        }
        
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;