import CountUp from "react-countup";
import heroImg from "../assets/heroImg.png";

export default function Home({ onRegisterClick, isLoggedIn, onDashboard }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#101a17]">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-16 lg:px-24 py-20">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full max-w-7xl gap-16">
          {/* Text Section */}
          <div className="lg:w-1/2 text-center sm:text-left space-y-6">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white">
              Recovaid
            </h1>

            <div className="flex items-center justify-center sm:justify-start gap-3 flex-wrap">
              <h2 className="text-lg sm:text-xl text-[#00C896] font-semibold tracking-wide uppercase">
                Track
              </h2>
              <span className="text-white text-xl">⟶</span>
              <h2 className="text-lg sm:text-xl text-[#00C896] font-semibold tracking-wide uppercase">
                Connect
              </h2>
              <span className="text-white text-xl">⟶</span>
              <h2 className="text-lg sm:text-xl text-[#00C896] font-semibold tracking-wide uppercase">
                Recover
              </h2>
            </div>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Your complete companion for post-surgery recovery. Track your
              progress effortlessly, communicate seamlessly with your doctor,
              and gain peace of mind every step of the way. We're here to help
              you get back to your best, faster and more confidently.
            </p>

            {/* Animated Stats */}
            <div className="pt-6 grid grid-cols-2 md:grid-cols-3 gap-6 text-white text-center">
              <div>
                <h3 className="text-3xl font-bold text-[#00C896]">
                  <CountUp end={152} duration={3} />+
                </h3>
                <p className="text-sm text-gray-400 mt-1">Expert Doctors</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[#00C896]">
                  <CountUp end={80} duration={3} />+
                </h3>
                <p className="text-sm text-gray-400 mt-1">Patients Served</p>
              </div>

              <div className="col-span-2 md:col-span-1 md:col-start-auto mx-auto">
                <h3 className="text-3xl font-bold text-[#00C896]">
                  <CountUp end={100} duration={3} />+
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Surgeries Monitored
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-10 flex flex-wrap justify-center sm:justify-start gap-4">
              {!isLoggedIn ? (
                <button
                  className="bg-gradient-to-r from-[#00C896] to-[#00A582] text-black font-semibold px-6 py-3 rounded-[10px] shadow-2xl shadow-[#00C896]/30 hover:from-[#00b287] hover:to-[#009c75] transition-all duration-300"
                  onClick={onRegisterClick}
                >
                  Explore Now
                </button>
              ) : (
                <button
                  className="bg-gradient-to-r from-[#00C896] to-[#00A582] text-black font-semibold px-6 py-3 rounded-[10px] shadow-2xl shadow-[#00C896]/30 hover:from-[#00b287] hover:to-[#009c75] transition-all duration-300"
                  onClick={onDashboard}
                >
                  View Dashboard
                </button>
              )}
              <button
                className="bg-gradient-to-r from-[#00C896] to-[#00A582] text-black font-semibold px-6 py-3 rounded-[10px] shadow-2xl shadow-[#00C896]/30 hover:from-[#00b287] hover:to-[#009c75] transition-all duration-300"
                onClick={() => scrollToSection("footer")}
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={heroImg}
              alt="Hero Illustration"
              className="w-full max-w-xs sm:max-w-md lg:max-w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="max-w-[90%] md:max-w-[80%] mx-auto rounded-[20px] border-2 border-[#00C896] bg-gradient-to-b from-[#101a17] via-[#1a1a1a] to-[#0f0f0f] py-24 px-4 sm:px-6 md:px-16 lg:px-24 text-white"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-6">
            Key Features
          </h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
            Everything you need for a smooth and stress-free recovery journey.
          </p>

          <div className="grid gap-10 sm:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Cards */}
            {[
              {
                icon: "🩺",
                title: "Doctor-Patient Connect",
                desc: "Seamlessly stay in touch with your healthcare providers through real-time messaging and updates.",
              },
              {
                icon: "📊",
                title: "Recovery Tracking",
                desc: "Monitor symptoms, progress, medications, and healing with smart daily logs and progress charts.",
              },
              {
                icon: "🔔",
                title: "Smart Reminders",
                desc: "Recovaid automatically your doctor when a high-risk health status is detected—ensuring quick response when it matters most.",
              },
              {
                icon: "📁",
                title: "Digital Records",
                desc: "Securely store and access all your medical records in one place, anytime, anywhere.",
              },
              {
                icon: "🤖",
                title: "AI Health Assistant",
                desc: "Our AI analyzes your daily inputs to generate a summary and criticality score, helping track risk and recovery at a glance.",
              },
              {
                icon: "🔒",
                title: "Privacy First",
                desc: "We use top-level encryption and privacy practices to keep your health data secure.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-[#111111] border border-[#00C89633] rounded-2xl p-6 shadow-[0_10px_25px_rgba(0,200,150,0.2)] hover:shadow-[0_20px_50px_rgba(0,200,150,0.4)] transition-transform duration-200 hover:-translate-y-2"
              >
                <div className="text-[#00C896] text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:py-[180px] py-24 text-white"
      >
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12 text-lg">
          Got questions? We’re here to help you through every step of your
          recovery journey.
        </p>

        <div className="space-y-5">
          {[
            {
              q: "What is Recovaid ?",
              a: "Recovaid is a comprehensive post-surgery recovery platform designed to help patients track their health status, communicate with their doctors, and manage their recovery journey effectively. It uses AI to analyze health data and provide personalized insights.",
            },
            {
              q: "What happens if my health status is critical?",
              a: "If your criticality score is high (based on AI analysis), Recovaid automatically sends an alert email to your assigned doctor, prompting them to review your case immediately.",
            },
            {
              q: "Can I track my and recovery progress?",
              a: "Yes, you can log daily symptoms, and view progress through interactive charts and insights based on your daily statuses over time, helping you track your recovery journey visually.",
            },
            {
              q: "Is my personal health data safe?",
              a: "Yes. Recovaid uses secure authentication and encrypted storage to protect your personal and health information. Only you and your assigned doctor have access to your data.",
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="group border border-[#00C89633] rounded-xl bg-[#101a17] transition-all duration-300"
            >
              <summary className="flex justify-between items-center p-4 cursor-pointer list-none">
                <span className="text-lg font-semibold text-white">
                  {faq.q}
                </span>
                <span className="text-[#00C896] text-2xl transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-4 pt-0 pb-4 text-sm text-gray-400">
                {faq.a}
              </div>
            </details>
          ))}

          {/* Imp points on <details>, <summary>, and Tailwind's 'group' utility:

                1. <details>:
                    - A native HTML element used to create a disclosure widget.
                    - It can be toggled open or closed by clicking the <summary>.
                    - The content inside <details> is hidden when closed and shown when opened.

                2. <summary>:
                    - Must be the first child of <details>.
                    - Acts as the clickable heading that toggles the open/closed state of <details>.
                    - Always visible even when <details> is closed.
                    - Cannot replicate toggle behavior with <div> or other elements without JS.

                3. Tailwind 'group' utility:
                    - Allows styling child elements based on the state of a parent.
                    - When used with <details>, the 'group-open' variant lets you style children differently when <details> is open.
                    - This works because browsers automatically add an 'open' attribute to <details> when toggled.
                    - 'group-open' does NOT work with arbitrary parent elements; it specifically leverages the native <details> open state. */}
        </div>
      </section>
    </div>
  );
}
