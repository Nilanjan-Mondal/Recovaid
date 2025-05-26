export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Recovaid</h1>
            <p className="text-lg text-gray-600 mb-8">Recovary at its best</p>
            <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                Find doctors
            </button>
        </div>
    );
}