// filepath: c:\Users\Asus\OneDrive\Desktop\Dristi 1.0\dristi\src\components\TechnologyStack.jsx
function TechnologyStack() {
  const stack = [
    { icon: "🔒", title: "Blockchain Security", desc: "Immutable digital identity records with end-to-end encryption." },
    { icon: "🤖", title: "AI/ML Analytics", desc: "Predictive behavior analytics and anomaly detection algorithms." },
    { icon: "🗺️", title: "Geo-Fencing", desc: "Real-time location boundaries with instant alerts." },
    { icon: "⌚", title: "IoT Integration", desc: "Smart wearables and sensors for continuous monitoring." },
    { icon: "☁️", title: "Cloud Infrastructure", desc: "Scalable and secure cloud-based data processing." },
    { icon: "📱", title: "Mobile SDK", desc: "Customizable mobile application development framework." },
  ];
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-2 text-cyan-300">Technology Stack</h2>
      <p className="text-center mb-8 text-white/70">Built on cutting edge technologies to deliver reliable, secure, and scalable tourist safety solutions.</p>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {stack.map((s, i) => (
          <div key={i} className="bg-white/10 rounded-xl p-6 shadow text-center backdrop-blur-md">
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="font-bold mb-1 text-cyan-200">{s.title}</div>
            <div className="text-white/70">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default TechnologyStack;