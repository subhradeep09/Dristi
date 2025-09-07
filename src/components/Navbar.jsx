// filepath: c:\Users\Asus\OneDrive\Desktop\Dristi 1.0\dristi\src\components\Navbar.jsx
function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white/10 backdrop-blur-md rounded-b-2xl shadow-lg mx-4 mt-4">
      <span className="font-extralight text-2xl tracking-widest text-cyan-400">SafeTour</span>
      <div className="space-x-4">
        <button className="px-4 py-2 rounded-full bg-transparent text-cyan-300 hover:bg-cyan-900/20 transition">Admin Login</button>
        <button className="px-4 py-2 rounded-full bg-cyan-400 text-gray-900 hover:bg-cyan-300 transition font-semibold shadow">Register Tourist</button>
      </div>
    </nav>
  );
}
export default Navbar;