import recovaidPng from "../assets/recovaidPng.png";
import { Mail, Phone, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer 
        id="footer"
    className="bg-[#0f0f0f] border-t border-[#00C89633] text-white px-6 py-6">

      {/* Mobile Layout */}
      <div className="md:hidden max-w-7xl mx-auto flex flex-col">
        {/* Recovaid on top, centered */}
        <div className="flex flex-col items-center mb-8 text-center">
          <img src={recovaidPng} alt="Recovaid Logo" className="h-8 mb-3" />
          <span className="text-xl font-bold">Recovaid</span>
          <p className="text-gray-400 text-xs leading-snug max-w-xs mt-2">
            Your intelligent recovery companion. Track, connect, and recover with confidence using AI-powered health tools.
          </p>
        </div>

        {/* Bottom: Contact left, Follow right */}
        <div className="flex justify-between">
          {/* Contact */}
          <div className="flex flex-col items-start text-left text-xs space-y-1">
            <h3 className="text-md font-semibold text-[#00C896]">Contact Us</h3>
            <div className="flex items-center space-x-2 text-gray-300">
              <Mail size={16} className="text-[#00C896]" />
              <span>support@recovaid.com</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Phone size={16} className="text-[#00C896]" />
              <span>+1 (234) 567-8901</span>
            </div>
          </div>

          {/* Follow */}
          <div className="flex flex-col items-end text-right text-xs space-y-1">
            <h3 className="text-md font-semibold text-[#00C896]">Follow Us</h3>
            <div className="flex space-x-4 text-gray-300">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00C896] transition" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00C896] transition" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex max-w-7xl mx-auto flex-row justify-between items-center md:items-start space-y-0">
        {/* Left: Logo & Description */}
        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-4 max-w-md text-center md:text-left">
          <img src={recovaidPng} alt="Recovaid Logo" className="h-8 mb-3 md:mb-0" />
          <div>
            <span className="text-xl font-bold block">Recovaid</span>
            <p className="text-gray-400 text-xs leading-snug max-w-xs">
              Your intelligent recovery companion. Track, connect, and recover with confidence using AI-powered health tools.
            </p>
          </div>
        </div>

        {/* Center: Contact Info */}
        <div className="flex flex-col items-center space-y-1 text-center md:text-left md:items-start">
          <h3 className="text-md font-semibold text-[#00C896]">Contact Us</h3>
          <div className="flex items-center space-x-2 text-gray-300 text-xs">
            <Mail size={16} className="text-[#00C896]" />
            <span>recovaidofficial@gmail.com</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300 text-xs">
            <Phone size={16} className="text-[#00C896]" />
            <span>+1 (234) 567-8901</span>
          </div>
        </div>

        {/* Right: Socials */}
        <div className="flex flex-col items-center space-y-1 text-center md:text-right md:items-end">
          <h3 className="text-md font-semibold text-[#00C896]">Follow Us</h3>
          <div className="flex space-x-4 text-gray-300">
            <a href="https://github.com/Nilanjan-Mondal" target="_blank" rel="noopener noreferrer" className="hover:text-[#00C896] transition" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/nilanjan-mondal0505/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00C896] transition" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-800" />

      <div className="text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Recovaid. All rights reserved. &nbsp;|&nbsp; Made by JSON Brewer
      </div>
    </footer>
  );
}
