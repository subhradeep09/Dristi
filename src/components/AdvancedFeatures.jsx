import { Monitor, Smartphone, Cpu, Globe } from 'lucide-react';

const AdvancedFeatures = () => {
  const features = [
    {
      icon: <Monitor className="w-8 h-8 text-white" />,
      title: "Digital Tourist ID Generation",
      description: "Advanced biometric verification and secure digital identity creation for seamless travel experiences with multi-layer authentication and fraud prevention systems.",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-white" />,
      title: "Smart Mobile Application",
      description: "Feature-rich mobile app with geofencing, offline maps, emergency contacts, and real-time safety notifications for comprehensive tourist protection.",
      gradient: "from-red-500 to-orange-500"
    },
    {
      icon: <Cpu className="w-8 h-8 text-white" />,
      title: "AI-Based Anomaly Detection",
      description: "Machine learning algorithms analyze behavioral patterns and environmental data to predict and prevent potential safety threats before they occur.",
      gradient: "from-pink-500 to-blue-500"
    },
    {
      icon: <Monitor className="w-8 h-8 text-white" />,
      title: "Command & Control Dashboard",
      description: "Centralized monitoring system for authorities with real-time analytics, incident management, and coordinated emergency response capabilities.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      title: "IoT Integration",
      description: "Connected network of smart sensors, cameras, and devices throughout tourist areas providing comprehensive environmental monitoring and safety coverage.",
      gradient: "from-orange-500 to-amber-500"
    },
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      title: "Multilingual Support",
      description: "AI-powered translation services and cultural guidance system supporting over 50 languages with voice recognition and real-time communication assistance.",
      gradient: "from-indigo-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 font-medium mb-4">
            ✨ Advanced Technology
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Advanced Safety <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Features</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Comprehensive technology stack designed to enhance tourist safety through intelligent 
            monitoring and rapid response systems powered by cutting-edge AI.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto space-y-24">
          {features.map((feature, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                    {feature.icon}
                  </div>
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                  <div className="bg-purple-100 px-4 py-2 rounded-full">
                    <span className="text-purple-700 font-semibold text-sm">0{index + 1}</span>
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                  {feature.description}
                </p>
                <div className="pt-4">
                  <button className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors">
                    Learn More 
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="relative group">
                  <div className={`absolute -inset-4 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-2xl opacity-25 group-hover:opacity-40 transition duration-1000`}></div>
                  <div className="relative bg-white rounded-3xl p-2 shadow-2xl">
                    <div className={`w-full h-80 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <div className="text-center text-white">
                        <div className="w-20 h-20 mx-auto mb-4 opacity-50">
                          {feature.icon}
                        </div>
                        <h4 className="text-xl font-bold">{feature.title.split(' ').slice(0, 2).join(' ')}</h4>
                        <p className="text-sm opacity-75">Interface</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvancedFeatures;