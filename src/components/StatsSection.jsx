import React from 'react';

const StatsSection = () => {
  const stats = [
    { value: "99.9%", label: "System Uptime" },
    { value: "24/7", label: "Monitoring" },
    { value: "10+", label: "Countries" },
    { value: "< 30s", label: "Response Time" }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-purple-900 to-blue-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="transform hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-white/80 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;