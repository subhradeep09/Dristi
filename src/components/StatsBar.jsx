// filepath: c:\Users\Asus\OneDrive\Desktop\Dristi 1.0\dristi\src\components\StatsBar.jsx
function StatsBar() {
  const stats = [
    { value: "99.9%", label: "System Uptime" },
    { value: "24/7", label: "Emergency Response" },
    { value: "10+", label: "Language Support" },
    { value: "< 30s", label: "Alert Response Time" },
  ];
  return (
    <div className="flex flex-col md:flex-row justify-center gap-8 py-8">
      {stats.map((s, i) => (
        <div key={i} className="text-center px-6 py-4 bg-white/10 rounded-2xl shadow-lg backdrop-blur-md">
          <div className="text-3xl text-cyan-300 font-light">{s.value}</div>
          <div className="text-sm text-white/60">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
export default StatsBar;