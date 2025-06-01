import recovaidPng from "../assets/recovaidPng.png";

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white px-6 py-20 mt-10 md:pb-20">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <header className="flex items-center space-x-4 mb-12">
          <img src={recovaidPng} alt="Recovaid Logo" className="h-12" />
          <h1 className="text-3xl font-bold text-[#00C896]">About Recovaid</h1>
        </header>

        {/* Intro */}
        <section className="mb-10 text-gray-300 leading-relaxed text-lg">
          <p>
            <strong>Recovaid</strong> was born out of a simple yet powerful idea: recovery after surgery shouldn't feel uncertain, disconnected, or overwhelming. We set out to build a digital companion that empowers patients to heal smarter, stay connected with their doctors, and feel supported at every stage of their journey.
          </p>
        </section>

        {/* Our Vision */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#00C896] mb-4">Our Vision</h2>
          <p className="text-gray-300 leading-relaxed">
            Our mission is to transform post-surgery recovery into a more informed, interactive, and reassuring experience. By combining smart health tracking with seamless communication tools, Recovaid helps users monitor their progress, flag concerns early, and stay on top of their recovery timeline without stress. We believe that healing isn't just physical—it's emotional and mental too. That’s why Recovaid focuses on delivering clarity, reducing anxiety, and enabling peace of mind through personalized insights and AI-powered assistance.
          </p>
        </section>

        {/* Our Team */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#00C896] mb-4">Our Team</h2>
          <p className="text-gray-300 leading-relaxed">
            Recovaid is created by a passionate team of developers, healthcare enthusiasts, and AI experts dedicated to improving recovery experiences. We are committed to continuous innovation, privacy, and building tools that genuinely make a difference.
          </p>
        </section>

      </div>
    </main>
  );
}
