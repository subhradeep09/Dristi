// filepath: c:\Users\Asus\OneDrive\Desktop\Dristi 1.0\dristi\src\components\WhyChoose.jsx
function WhyChoose() {
  const reasons = [
    { icon: "🛡️", title: "Enhanced Safety Coverage", desc: "Comprehensive monitoring in sensitive and high-risk areas where traditional methods fall short." },
    { icon: "🔐", title: "Data Privacy Compliant", desc: "End-to-end encryption with full compliance to data protection regulations." },
    { icon: "⚡", title: "Rapid Response System", desc: "Instant dispatch with automated evidence logging and FIR generation." },
    { icon: "🌍", title: "Universal Accessibility", desc: "Multilingual support with voice and text access for all user demographics." },
  ];
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-2 text-cyan-300">Why Choose SafeTour?</h2>
      <p className="text-center mb-8 text-white/70">Addressing critical challenges in tourist safety with innovative technology solutions.</p>
      <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto items-center">
        <div className="flex-1 space-y-4">
          {reasons.map((r, i) => (
            <div key={i} className="flex items-center gap-4 bg-white/10 rounded-xl p-4 shadow backdrop-blur-md">
              <span className="text-2xl">{r.icon}</span>
              <div>
                <div className="font-bold text-cyan-200">{r.title}</div>
                <div className="text-white/70">{r.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80" alt="Why Choose" className="w-96 rounded-xl shadow" />
      </div>
    </section>
  );
}
export default WhyChoose;