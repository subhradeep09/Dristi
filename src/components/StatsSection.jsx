import React from 'react';

const StatsSection = () => {
  const stats = [
    { value: "99.9%", label: "System Uptime" },
    { value: "24/7", label: "Monitoring" },
    { value: "10+", label: "Countries" },
    { value: "< 30s", label: "Response Time" }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-purple-900 to-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="group transform hover:scale-110 transition-all duration-300">
              <div className="text-4xl md:text-6xl font-black text-white mb-3 group-hover:text-yellow-300 transition-colors">
                {stat.value}
              </div>
              <div className="text-white/80 text-lg font-medium">{stat.label}</div>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mt-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;