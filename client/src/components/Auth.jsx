import { useState } from 'react';
import { X } from 'lucide-react';

export default function Auth({ onClose }) {
  const [role, setRole] = useState('patient');
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4">
      <div className="bg-[#101a17] w-full max-w-md rounded-2xl shadow-xl p-8 relative text-white border border-[#00C89644]">
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition">
          <X size={22} />
        </button>

        {!isLogin && (<h2 className="text-2xl font-bold text-center mb-2">
          {isLogin ? 'Login as' : 'Register as'} <span className="text-[#00C896] capitalize">{role}</span>
        </h2>)}

        {isLogin && (<h2 className="text-2xl font-bold text-center mb-2"> Login </h2>)}

        {/* Role Selector (Only shown in Register mode) */}
        {!isLogin && (
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setRole('patient')}
              className={`px-4 py-1 rounded-full text-sm font-semibold border transition ${
                role === 'patient' ? 'bg-[#00C896] text-black' : 'border-[#00C896] text-white'
              }`}
            >
              Patient
            </button>
            <button
              onClick={() => setRole('doctor')}
              className={`px-4 py-1 rounded-full text-sm font-semibold border transition ${
                role === 'doctor' ? 'bg-[#00C896] text-black' : 'border-[#00C896] text-white'
              }`}
            >
              Doctor
            </button>
          </div>
        )}

        <form className="space-y-4">
          {/* Only show these fields in Register mode */}
          {!isLogin && (
            <>
              <input
                type="name"
                placeholder="Name"
                className="w-full px-4 py-2 rounded-md bg-[#181e1c] border border-[#00C89644] placeholder-gray-400 text-white focus:outline-none"
              />
              <input
                type="phoneNumber"
                placeholder="Phone Number"
                className="w-full px-4 py-2 rounded-md bg-[#181e1c] border border-[#00C89644] placeholder-gray-400 text-white focus:outline-none"
              />
              {role === 'doctor' && (
                <input
                  type="specialization"
                  placeholder="Specialization"
                  className="w-full px-4 py-2 rounded-md bg-[#181e1c] border border-[#00C89644] placeholder-gray-400 text-white focus:outline-none"
                />
              )}
              {role === 'patient' && (
                <>
                  <input
                    type="surgeryDetails"
                    placeholder="Surgery Details"
                    className="w-full px-4 py-2 rounded-md bg-[#181e1c] border border-[#00C89644] placeholder-gray-400 text-white focus:outline-none"
                  />
                  <input
                    type="recoveryTimeDays"
                    placeholder="Recovery Time (Days)"
                    className="w-full px-4 py-2 rounded-md bg-[#181e1c] border border-[#00C89644] placeholder-gray-400 text-white focus:outline-none"
                  />
                  <input
                    type="assignedDoctor"
                    placeholder="Assigned Doctor"
                    className="w-full px-4 py-2 rounded-md bg-[#181e1c] border border-[#00C89644] placeholder-gray-400 text-white focus:outline-none"
                  />
                  <input
                    type="startDate"
                    placeholder="Start Date"
                    className="w-full px-4 py-2 rounded-md bg-[#181e1c] border border-[#00C89644] placeholder-gray-400 text-white focus:outline-none"
                  />
                </>
              )}
            </>
          )}

          {/* Always show email and password */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-md bg-[#181e1c] border border-[#00C89644] placeholder-gray-400 text-white focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md bg-[#181e1c] border border-[#00C89644] placeholder-gray-400 text-white focus:outline-none"
          />

          <button type="submit" className="w-full py-2 bg-[#00C896] text-black font-semibold rounded-md">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-[#00C896] hover:underline">
            {isLogin ? 'Register instead' : 'Login instead'}
          </button>
        </p>
      </div>
    </div>
  );
}
