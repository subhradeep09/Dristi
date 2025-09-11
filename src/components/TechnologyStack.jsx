
const TechnologyStack = () => {
  const technologies = [
    { name: "React.js", description: "Frontend framework for building user interfaces", icon: "⚛️", color: "from-blue-400 to-cyan-400" },
    { name: "Node.js", description: "Backend runtime for server-side applications", icon: "🟢", color: "from-green-400 to-emerald-400" },
    { name: "MongoDB", description: "NoSQL database for flexible data storage", icon: "🍃", color: "from-green-500 to-teal-500" },
    { name: "IoT Integration", description: "Connected devices and sensors network", icon: "📡", color: "from-purple-400 to-pink-400" },
    { name: "Cloud Infrastructure", description: "Scalable cloud computing services", icon: "☁️", color: "from-blue-400 to-indigo-400" },
    { name: "Mobile SDK", description: "Native mobile application development", icon: "📱", color: "from-orange-400 to-red-400" }
  ];

  return (
    <section id="technology" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Stack</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Built on modern, scalable technologies to ensure reliability, performance, and security at every level.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {technologies.map((tech, index) => (
            <div key={index} className="group bg-gray-50 hover:bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:shadow-2xl transition-all duration-500 border hover:border-purple-200 transform hover:scale-105">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                {tech.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{tech.name}</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">{tech.description}</p>
              <div className={`w-full h-1.5 sm:h-2 bg-gradient-to-r ${tech.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;