// filepath: c:\Users\Asus\OneDrive\Desktop\Dristi 1.0\dristi\src\components\FeatureHighlights.jsx
function FeatureHighlights() {
  const features = [
    { icon: "🔒", title: "Blockchain Security", desc: "Tamper-proof digital IDs with end-to-end encryption." },
    { icon: "📡", title: "Real-time Tracking", desc: "Live location monitoring with geo-fencing alerts." },
    { icon: "🚨", title: "Emergency Response", desc: "Instant panic button with automated alert dispatch." },
  ];
  return (
    <div className="flex flex-col md:flex-row justify-center gap-8 py-8">
      {features.map((f, i) => (
        <div key={i} className="flex flex-col items-center px-6 py-4 bg-white/10 rounded-2xl shadow-lg backdrop-blur-md">
          <div className="text-4xl mb-2">{f.icon}</div>
          <div className="font-semibold text-cyan-300">{f.title}</div>
          <div className="text-sm text-white/60">{f.desc}</div>
        </div>
      ))}
    </div>
  );
}
export default FeatureHighlights;