import React from 'react';

const TechnologyStack = () => {
  const technologies = [
    { 
      name: "React.js", 
      description: "Frontend framework for building user interfaces", 
      icon: "⚛️",
      color: "from-blue-400 to-cyan-400"
    },
    { 
      name: "Node.js", 
      description: "Backend runtime for server-side applications", 
      icon: "🟢",
      color: "from-green-400 to-emerald-400"
    },
    { 
      name: "MongoDB", 
      description: "NoSQL database for flexible data storage", 
      icon: "🍃",
      color: "from-green-500 to-teal-500"
    },
    { 
      name: "IoT Integration", 
      description: "Connected devices and sensors network", 
      icon: "📡",
      color: "from-purple-400 to-pink-400"
    },
    { 
      name: "Cloud Infrastructure", 
      description: "Scalable cloud computing services", 
      icon: "☁️",
      color: "from-blue-400 to-indigo-400"
    },
    { 
      name: "Mobile SDK", 
      description: "Native mobile application development", 
      icon: "📱",
      color: "from-orange-400 to-red-400"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Technology Stack</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built on modern, scalable technologies to ensure reliability, performance, and 
            security at every level.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {technologies.map((tech, index) => (
            <div 
              key={index} 
              className="group bg-gray-50 hover:bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 border hover:border-purple-200"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {tech.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{tech.name}</h3>
              <p className="text-gray-600">{tech.description}</p>
              <div className={`w-full h-1 bg-gradient-to-r ${tech.color} rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;