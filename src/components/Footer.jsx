// filepath: c:\Users\Asus\OneDrive\Desktop\Dristi 1.0\dristi\src\components\Footer.jsx
function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-lg text-white">SafeTour</span>
          </div>
          <p className="text-xs">A powered solution for smart tourist safety monitoring and analytics.</p>
        </div>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>
      </div>
      <div className="text-center text-xs mt-4">© 2024 SafeTour. All rights reserved.</div>
    </footer>
  );
}
export default Footer;