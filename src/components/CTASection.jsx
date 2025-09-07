// filepath: c:\Users\Asus\OneDrive\Desktop\Dristi 1.0\dristi\src\components\CTASection.jsx
function CTASection() {
  return (
    <section className="py-16 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4 text-cyan-300">Ready to Transform Tourist Safety?</h2>
      <p className="mb-8 text-white/70 text-center max-w-md">
        Join the future of intelligent tourist safety monitoring. Get started with our comprehensive platform designed for the Northeast region and beyond.
      </p>
      <div className="flex justify-center gap-4 mb-8">
        <button className="px-6 py-2 rounded-full bg-cyan-400 text-gray-900 font-semibold shadow hover:bg-cyan-300 transition">Register Tourist Account</button>
        <button className="px-6 py-2 rounded-full bg-white/10 text-cyan-200 hover:bg-white/20 transition">Access Admin Portal</button>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-12">
        <div>
          <div className="text-xl font-bold text-cyan-200">Free</div>
          <div className="text-sm text-white/60">Tourist Registration</div>
        </div>
        <div>
          <div className="text-xl font-bold text-cyan-200">24/7</div>
          <div className="text-sm text-white/60">Support Available</div>
        </div>
        <div>
          <div className="text-xl font-bold text-cyan-200">Instant</div>
          <div className="text-sm text-white/60">Setup & Activation</div>
        </div>
      </div>
    </section>
  );
}
export default CTASection;