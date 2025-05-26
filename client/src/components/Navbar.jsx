export default function Navbar() {
    return (
        <nav>
            <div className="bg-black bg-opacity-80 backdrop-blur-lg p-4 shadow-md relative z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <ul className="hidden md:flex space-x-6">
                        <button className="text-white hover:text-red-500">Home</button>
                        <button className="text-white hover:text-yellow-400">About Us</button>
                        <button className="text-white hover:text-orange-400">Doc</button>
                    </ul>
                </div>
            </div>
        </nav>
    );
}