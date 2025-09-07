// filepath: c:\Users\Asus\OneDrive\Desktop\Dristi 1.0\dristi\src\components\HeroSection.jsx
function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-5xl md:text-7xl font-extralight tracking-tight mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Smart Tourist Safety
      </h1>
      <p className="max-w-xl text-center text-lg text-white/70 mb-10">
        AI-powered monitoring system with blockchain security, real-time tracking, and instant emergency response for tourist safety.
      </p>
      <div className="flex gap-4">
        <button className="px-8 py-3 rounded-full bg-cyan-400 text-gray-900 font-semibold shadow hover:bg-cyan-300 transition">Register as Tourist</button>
        <button className="px-8 py-3 rounded-full bg-white/10 text-cyan-200 hover:bg-white/20 transition">Admin Dashboard</button>
      </div>
    </section>
  );
}
export default HeroSection;