import recovaidPng from '../assets/recovaidPng.png';

export default function Navbar({ onRegisterClick }) {
    return (
        <nav className="bg-[#0f0f0f] backdrop-blur-md shadow-md fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-6 flex justify-between items-center h-16">
                {/* Left: Logo */}
                <div className="flex items-center h-16">
                    <img 
                        src={recovaidPng} 
                        alt="Recovaid Logo" 
                        className="h-10 object-contain"
                    />
                    <span className="ml-2 text-2xl font-semibold text-white tracking-wide">Recovaid</span>
                </div>

                {/* Center: Navigation Links */}
                <ul className="absolute left-1/2 top-0 transform -translate-x-1/2 hidden md:flex space-x-8 items-center h-16">
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

                {/* Right: Professional Sign Up Button */}
                <div className="flex items-center h-16">
                    <button className="bg-gradient-to-r from-[#00C896] to-[#00A582] text-black font-semibold px-5 py-2 rounded-[10px] shadow-lg shadow-[#00C896]/30 hover:from-[#00b287] hover:to-[#009c75] transition-all duration-300"
                        onClick={onRegisterClick}
                    >
                        Register Now
                    </button>
                </div>
            </div>
        </nav>
    );
}
