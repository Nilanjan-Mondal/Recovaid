import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import { BaseUrl } from '../configs/ClientConfig';

export default function Auth({ onClose }) {
  const [role, setRole] = useState('patient');
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    specialization: '',
    surgeryDetails: '',
    recoveryTimeDays: '',
    assignedDoctor: '',
    startDate: '',
    email: '',
    password: ''
  });
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        if (role === 'patient') {
          const res = await axios.get(`${BaseUrl}/api/users/doctors`);
          setDoctors(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    fetchDoctors();
  }, [role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? `${BaseUrl}/api/auth/login/`
      : `${BaseUrl}/api/users/signup/`;

    try {
      const payload = {
        ...formData,
        role
      };

      const response = await axios.post(url, payload, {
        withCredentials: true
      });

      console.log("Response:", response.data);
      alert('Success!');
      onClose(); // close modal
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4">
      <div className="bg-[#101a17] w-full max-w-md rounded-2xl shadow-xl p-8 relative text-white border border-[#00C89644]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={22} />
        </button>

        {!isLogin && (
          <h2 className="text-2xl font-bold text-center mb-2">
            {isLogin ? 'Login as' : 'Register as'}{' '}
            <span className="text-[#00C896] capitalize">{role}</span>
          </h2>
        )}

        {isLogin && <h2 className="text-2xl font-bold text-center mb-2"> Login </h2>}

        {/* Role Selector */}
        {!isLogin && (
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setRole('patient')}
              className={`px-4 py-1 rounded-full text-sm font-semibold border transition ${
                role === 'patient'
                  ? 'bg-[#00C896] text-black'
                  : 'border-[#00C896] text-white'
              }`}
            >
              Patient
            </button>
            <button
              onClick={() => setRole('doctor')}
              className={`px-4 py-1 rounded-full text-sm font-semibold border transition ${
                role === 'doctor'
                  ? 'bg-[#00C896] text-black'
                  : 'border-[#00C896] text-white'
              }`}
            >
              Doctor
            </button>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-[#181e1c] border border-[#00C89644] placeholder-gray-400 text-white focus:outline-none"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-[#181e1c] border border-[#00C89644] placeholder-gray-400 text-white focus:outline-none"
              />
              {role === 'doctor' && (
                <input
                  type="text"
                  name="specialization"
                  placeholder="Specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-[#181e1c] border border-[#00C89644] placeholder-gray-400 text-white focus:outline-none"
                />
              )}
              {role === 'patient' && (
                <>
                  <input
                    type="text"
                    name="surgeryDetails"
                    placeholder="Surgery Details"
                    value={formData.surgeryDetails}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-[#181e1c] border border-[#00C89644] placeholder-gray-400 text-white focus:outline-none"
                  />
                  <input
                    type="text"
                    name="recoveryTimeDays"
                    placeholder="Recovery Time (Days)"
                    value={formData.recoveryTimeDays}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-[#181e1c] border border-[#00C89644] placeholder-gray-400 text-white focus:outline-none"
                  />

                  <select
                    name="assignedDoctor"
                    value={formData.assignedDoctor}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-[#181e1c] border border-[#00C89644] placeholder-gray-400 text-white focus:outline-none appearance-none pr-8"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg fill='white' height='20' viewBox='0 0 20 20' width='20' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M7 7l3 3 3-3' stroke='%23ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      backgroundSize: '1rem'
                    }}
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doc) => (
                      <option key={doc._id} value={doc._id}>
                        {doc.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    name="startDate"
                    placeholder="Start Date (YYYY-MM-DD)"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-[#181e1c] border border-[#00C89644] placeholder-gray-400 text-white focus:outline-none"
                  />
                </>
              )}
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-[#181e1c] border border-[#00C89644] placeholder-gray-400 text-white focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-[#181e1c] border border-[#00C89644] placeholder-gray-400 text-white focus:outline-none"
          />

          <button
            type="submit"
            className="w-full py-2 bg-[#00C896] text-black font-semibold rounded-md"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#00C896] hover:underline"
          >
            {isLogin ? 'Register instead' : 'Login instead'}
          </button>
        </p>
      </div>
    </div>
  );
}
