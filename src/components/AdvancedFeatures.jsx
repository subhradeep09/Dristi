// filepath: c:\Users\Asus\OneDrive\Desktop\Dristi 1.0\dristi\src\components\AdvancedFeatures.jsx
function AdvancedFeatures() {
  const features = [
    {
      title: "Digital Tourist ID Generation",
      desc: "Secure blockchain-based system that issues digital IDs as entry points with KYC verification, trip itinerary, and emergency contacts valid for visit duration.",
      icon: "🆔",
      img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Smart Mobile Application",
      desc: "Auto-responding Tourist Safety Score, geo-fencing alerts for high-risk zones, panic button with live location sharing, and optional real-time tracking features.",
      icon: "📱",
      img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "AI-Based Anomaly Detection",
      desc: "Advanced AI detects sudden location drop-off, prolonged inactivity, route deviations, and flags missing or distress behavior for immediate investigation.",
      icon: "🤖",
      img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Command & Control Dashboard",
      desc: "Real-time tourist ticket visualization, heat maps of high-risk zones, digital ID access, alert history, last known locations, and automated FIR generation.",
      icon: "🖥️",
      img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "IoT Integration",
      desc: "Smart bands & wearables for high-risk zones, providing continuous health and location signals with manual SOS features for caves, forests, and remote locations.",
      icon: "⌚",
      img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Multilingual Support",
      desc: "Platform available in 10+ Indian languages and English with voice and text emergency access for elderly and disabled travelers ensuring universal accessibility.",
      icon: "🌐",
      img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
    },
  ];
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-2 text-cyan-300">Advanced Safety Features</h2>
      <p className="text-center mb-8 text-white/70">Comprehensive technology suite designed to ensure tourist safety through intelligent monitoring and rapid response systems.</p>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <div key={i} className="flex bg-white/10 rounded-xl shadow-lg overflow-hidden backdrop-blur-md">
            <div className="p-6 flex-1">
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="font-bold mb-1 text-cyan-200">{f.title}</div>
              <div className="text-white/70">{f.desc}</div>
            </div>
            <img src={f.img} alt={f.title} className="w-48 object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
export default AdvancedFeatures;