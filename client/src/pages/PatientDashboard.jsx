import { useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../configs/ClientConfig";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("upload");
  const [formData, setFormData] = useState({
    symptoms: "",
    temperature: "",
    imageUrl: "",
  });
  const [statusList, setStatusList] = useState([]);
  const [doctorId, setDoctorId] = useState(null);

  const fetchLoggedInUser = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/api/users/me`, {
        withCredentials: true,
      });
      const user = res.data.data;
      if (user && user.assignedDoctor) {
        setDoctorId(user.assignedDoctor);
      }
    } catch (err) {
      console.error("Failed to fetch logged-in user", err);
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, doctorId };
      await axios.post(`${BaseUrl}/api/status/`, payload, {
        withCredentials: true,
      });
      alert("Status uploaded successfully");
      setFormData({ symptoms: "", temperature: "", imageUrl: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to upload status.");
    }
  };

  const fetchStatuses = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/api/status/me`, {
        withCredentials: true,
      });
      setStatusList(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching statuses:", err);
    }
  };

  useEffect(() => {
    if (activeTab === "view" || activeTab === "charts") {
      fetchStatuses();
    }
  }, [activeTab]);

  // Prepare data for charts
  const reversedStatuses = [...statusList].reverse();
  const labels = reversedStatuses.map((status, i) => `Day ${i + 1}`);
  const criticalityData = reversedStatuses.map((s) => s.criticalityScore ?? 0);
  const temperatureData = reversedStatuses.map((s) => s.temperature ?? 0);
  const doctorResponses = reversedStatuses.map((s) =>
    s.doctorResponse ? 1 : 0
  );

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="pt-14 min-h-screen w-full overflow-x-hidden flex flex-col lg:flex-row bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#101a17] text-white">
      {/* Fixed Sidebar on large screens */}

      <div className="w-full lg:w-64 lg:fixed lg:top-16 lg:left-0 lg:h-screen bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#101a17] border-b lg:border-b-0 lg:border-r border-[#00C89644] py-6 px-4 lg:py-10 lg:px-6 z-20">
        <h2 className="text-2xl font-bold text-[#00C896] mb-6 lg:mb-10">
            Patient Dashboard
        </h2>
        <ul className="flex lg:flex-col gap-4 lg:space-y-4">
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded-md font-medium transition break-words text-sm sm:text-base ${
                activeTab === "upload"
                  ? "bg-[#00C896] text-black"
                  : "hover:bg-[#1a1a1a]"
              }`}
              onClick={() => setActiveTab("upload")}
            >
              Upload Daily Status
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded-md font-medium transition break-words text-sm sm:text-base ${
                activeTab === "view"
                  ? "bg-[#00C896] text-black"
                  : "hover:bg-[#1a1a1a]"
              }`}
              onClick={() => setActiveTab("view")}
            >
              View All Status
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded-md font-medium transition break-words text-sm sm:text-base ${
                activeTab === "charts"
                  ? "bg-[#00C896] text-black"
                  : "hover:bg-[#1a1a1a]"
              }`}
              onClick={() => setActiveTab("charts")}
            >
              View Health Charts
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 lg:ml-64 p-4 sm:p-6 lg:p-10 overflow-y-auto z-0">
        {activeTab === "charts" ? (
          <div className="max-w-5xl mx-auto space-y-10">
            <h2 className="text-3xl font-bold text-[#00C896] mb-6">
              Health Trends
            </h2>

            <div className="w-full overflow-x-auto">
              <h3 className="text-xl font-semibold mb-2">Criticality Score</h3>
              <Line
                data={{
                  labels,
                  datasets: [
                    {
                      label: "Criticality Score",
                      data: criticalityData,
                      borderColor: "#00C896",
                      backgroundColor: "#00C89644",
                      tension: 0.3,
                    },
                  ],
                }}
                options={chartOptions}
              />
            </div>

            <div className="w-full overflow-x-auto">
              <h3 className="text-xl font-semibold mb-2">Temperature (°F)</h3>
              <Line
                data={{
                  labels,
                  datasets: [
                    {
                      label: "Temperature",
                      data: temperatureData,
                      borderColor: "#FFA500",
                      backgroundColor: "#FFA50033",
                      tension: 0.3,
                    },
                  ],
                }}
                options={chartOptions}
              />
            </div>

            <div className="w-full overflow-x-auto">
              <h3 className="text-xl font-semibold mb-2">Doctor Responses</h3>
              <Line
                data={{
                  labels,
                  datasets: [
                    {
                      label: "Doctor Responded",
                      data: doctorResponses,
                      borderColor: "#00BFFF",
                      backgroundColor: "#00BFFF33",
                      tension: 0.3,
                    },
                  ],
                }}
                options={chartOptions}
              />
            </div>
          </div>
        ) : activeTab === "upload" ? (
          <div className="max-w-3xl mx-auto border-2 border-[#00C896] bg-gradient-to-b from-[#101a17] via-[#1a1a1a] to-[#0f0f0f] rounded-xl p-6 md:p-16 mt-10">
            <h2 className="text-3xl font-bold mb-6 text-[#00C896]">
              Upload Daily Status
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <textarea
                name="symptoms"
                placeholder="Describe your symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 bg-[#181e1c] border border-[#00C89644] rounded-md focus:outline-none"
              />

              <input
                type="number"
                name="temperature"
                placeholder="Temperature (°C)"
                value={formData.temperature}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-[#181e1c] border border-[#00C89644] rounded-md focus:outline-none"
              />

              {/* Image Upload */}
              <div>
                <label className="block mb-2 font-semibold text-white">
                  Upload Surgical Image
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-full sm:flex-1 relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      required
                      className="w-full text-white file:absolute file:right-0 file:top-2 file:bottom-2
                      file:py-2 file:px-4 file:rounded-md file:border-0
                      file:text-sm file:font-semibold file:bg-[#00C896] file:text-black
                      hover:file:bg-[#00b287] bg-[#181e1c] border border-[#00C89644] rounded-md
                      cursor-pointer py-3"
                    />
                  </div>
                  {formData.imageUrl && (
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full max-w-[6rem] h-auto object-cover rounded-md border border-[#00C89622]"
                    />
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-[#00C896] to-[#00A582] text-black font-semibold px-6 py-3 rounded-md shadow-md hover:from-[#00b287] hover:to-[#009c75] transition"
              >
                Submit Status
              </button>
            </form>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-[#00C896]">
              Your Daily Statuses
            </h2>
            <div className="space-y-6">
              {statusList.length === 0 ? (
                <p className="text-gray-400">No statuses uploaded yet.</p>
              ) : (
                statusList.map((status) => (
                  <div
                    key={status._id}
                    className="p-4 sm:p-6 bg-[#181e1c] rounded-xl border-[0.5px] border-[#00C896] bg-gradient-to-b from-[#101a17] via-[#1a1a1a] to-[#0f0f0f]"
                  >
                    <p className="text-gray-300 mb-2 text-sm">
                      <span className="font-semibold text-white">Date:</span>{" "}
                      {status.date
                        ? new Date(status.date).toLocaleDateString()
                        : new Date(status.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-white mb-2 text-sm">
                      <span className="font-semibold">Symptoms:</span>{" "}
                      {status.symptoms}
                    </p>
                    <p className="text-white mb-2 text-sm">
                      <span className="font-semibold">Temperature:</span>{" "}
                      {status.temperature} °C
                    </p>
                    {status.imageUrl && (
                      <img
                        src={status.imageUrl}
                        alt="Uploaded surgical area"
                        className="w-full max-w-xs mt-4 rounded-lg border border-[#00C89622]"
                      />
                    )}
                    {status.doctorResponse && (
                      <div className="mt-4 bg-[#111a18] border-l-4 border-[#00C896] px-4 py-3 rounded">
                        <p className="font-semibold text-[#00C896] mb-1">
                          Doctor's Response:
                        </p>
                        <p className="text-white text-sm">
                          {status.doctorResponse}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
