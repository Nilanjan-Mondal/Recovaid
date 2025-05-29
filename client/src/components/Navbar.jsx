import { useState } from "react";
import recovaidPng from "../assets/recovaidPng.png";
import { X, Menu } from "lucide-react";

export default function Navbar({ onRegisterClick }) {
    
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on link click or outside click (optional: you can add this)
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="bg-[#0f0f0f] backdrop-blur-md shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-6 flex justify-between items-center h-16 relative">
          {/* Left: Logo */}
          <div className="flex items-center h-16">
            <img
              src={recovaidPng}
              alt="Recovaid Logo"
              className="h-10 object-contain"
            />
            <span className="ml-2 text-2xl font-semibold text-white tracking-wide">
              Recovaid
            </span>
          </div>

          {/* Center: Navigation Links (hidden on small screens) */}
          <ul className="absolute left-1/2 top-0 transform -translate-x-1/2 hidden md:flex space-x-12 items-center h-16">
            <li>
              <button className="text-[#00C896] hover:text-[#00C896] transition-colors duration-200">
                Home
              </button>
            </li>
            <li>
              <button className="text-white hover:text-[#00C896] transition-colors duration-200">
                Features
              </button>
            </li>
            <li>
              <button className="text-white hover:text-[#00C896] transition-colors duration-200">
                About Us
              </button>
            </li>
            <li>
              <button className="text-white hover:text-[#00C896] transition-colors duration-200">
                FAQ
              </button>
            </li>
          </ul>

          {/* Right: Register Button & Hamburger for mobile */}
          <div className="flex items-center h-16 space-x-4">
            <button
              className="hidden md:inline bg-gradient-to-r from-[#00C896] to-[#00A582] text-black font-semibold px-5 py-2 rounded-[10px] shadow-lg shadow-[#00C896]/30 hover:from-[#00b287] hover:to-[#009c75] transition-all duration-300"
              onClick={onRegisterClick}
            >
              Register Now
            </button>

            {/* Hamburger menu button for small screens */}
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile sliding menu */}
        
        <div
            className={`fixed top-0 right-0 h-full w-64 bg-[#101a17] shadow-lg z-50 transform transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
            {/* Close button inside the menu */}
            <div className="flex justify-end p-4">
            <button
                className="text-white"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
            >
                <X size={24} />
            </button>
            </div>

            <nav className="flex flex-col space-y-6 px-6">
            <button
                onClick={() => setIsOpen(false)}
                className="text-[#00C896] font-semibold text-lg text-left"
            >
                Home
            </button>
            <button
                onClick={() => setIsOpen(false)}
                className="text-white font-semibold text-lg text-left hover:text-[#00C896] transition"
            >
                Features
            </button>
            <button
                onClick={() => setIsOpen(false)}
                className="text-white font-semibold text-lg text-left hover:text-[#00C896] transition"
            >
                About Us
            </button>
            <button
                onClick={() => setIsOpen(false)}
                className="text-white font-semibold text-lg text-left hover:text-[#00C896] transition"
            >
                FAQ
            </button>

            <button
                onClick={() => {
                setIsOpen(false);
                onRegisterClick();
                }}
                className="mt-auto bg-gradient-to-r from-[#00C896] to-[#00A582] text-black font-semibold py-2 rounded-[10px] shadow-lg shadow-[#00C896]/30 hover:from-[#00b287] hover:to-[#009c75] transition-all duration-300"
            >
                Register Now
            </button>
            </nav>
        </div>
        

      {/* Optional: overlay when menu open to close on click outside */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
        />
      )}
    </>
  );
}
