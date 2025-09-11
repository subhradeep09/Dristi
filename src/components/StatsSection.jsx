import React from 'react';

const StatsSection = () => {
  const stats = [
    { value: "99.9%", label: "System Uptime" },
    { value: "24/7", label: "Monitoring" },
    { value: "10+", label: "Countries" },
    { value: "< 30s", label: "Response Time" }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-purple-900 to-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="group transform hover:scale-110 transition-all duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 sm:mb-3 group-hover:text-yellow-300 transition-colors">
                {stat.value}
              </div>
              <div className="text-white/80 text-sm sm:text-base lg:text-lg font-medium px-2">{stat.label}</div>
              <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mt-2 sm:mt-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;