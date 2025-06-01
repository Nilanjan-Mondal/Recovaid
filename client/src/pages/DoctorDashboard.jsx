import {
  FaUser,
  FaSyringe,
  FaCalendarAlt,
  FaHeartbeat,
  FaTemperatureHigh,
  FaComments,
} from "react-icons/fa"; // add this at the top of your file
import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../configs/ClientConfig";

export default function DoctorDashboard() {
  const [statuses, setStatuses] = useState([]);
  const [users, setUsers] = useState({});
  const [responseInputs, setResponseInputs] = useState({});
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("criticality");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetchStatuses();
  }, []);

  const fetchUserById = async (id) => {
    try {
      const res = await axios.get(`${BaseUrl}/api/users/${id}`, {
        withCredentials: true,
      });
      return res.data?.data || null;
    } catch (err) {
      console.error(`Failed to fetch user ${id}:`, err);
      return null;
    }
  };

  const fetchStatuses = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/api/status/doctor`, {
        withCredentials: true,
      });
      const statusesData = res.data?.data || [];
      setStatuses(statusesData);

      // Correct patient ID key here:
      const uniquePatientIds = [...new Set(statusesData.map((s) => s.patient))];
      const usersData = {};
      await Promise.all(
        uniquePatientIds.map(async (id) => {
          const user = await fetchUserById(id);
          if (user) usersData[id] = user;
        })
      );
      setUsers(usersData);
    } catch (err) {
      console.error("Failed to fetch statuses:", err);
    }
  };

  const handleInputChange = (id, value) => {
    setResponseInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleRespond = async (statusId) => {
    const response = responseInputs[statusId];
    if (!response) return alert("Please enter a response.");
    try {
      await axios.post(
        `${BaseUrl}/api/status/respond/${statusId}`,
        { response },
        { withCredentials: true }
      );
      alert("Response submitted.");
      setResponseInputs((prev) => ({ ...prev, [statusId]: "" }));
      fetchStatuses();
    } catch (err) {
      console.error("Failed to send response:", err);
      alert("Failed to send response.");
    }
  };

  const sortStatuses = (list) => {
    return list.sort((a, b) => {
      if (sortBy === "criticality") {
        return sortOrder === "asc"
          ? a.criticalityScore - b.criticalityScore
          : b.criticalityScore - a.criticalityScore;
      } else {
        const dateA = new Date(a.date || a.createdAt);
        const dateB = new Date(b.date || b.createdAt);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }
    });
  };

  const filteredStatuses = statuses.filter((s) => {
    if (statusFilter === "read") return s.read === true;
    if (statusFilter === "unread") return s.read === false;
    return true;
  });

  const read = sortStatuses(filteredStatuses.filter((s) => s.read));
  const unread = sortStatuses(filteredStatuses.filter((s) => !s.read));

  const renderStatusCard = (status) => {
    const patientId = status.patient;
    const user = users[patientId];

    return (
      <div
        key={status._id}
        className={`group relative p-8 rounded-2xl mb-14 bg-gradient-to-br ${
          status.read
            ? "from-[#1f2c27] via-[#1f2c27cc] to-[#1f2c27] border border-[#00C896cc] shadow-inner"
            : "from-[#0f1a14] via-[#0f1a14cc] to-[#0f1a14] border border-[#00C896ff] shadow-lg shadow-[#00C89688]"
        }`}
        style={{ lineHeight: 1.6 }}
      >
        {/* Header: Name + Surgery */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h3 className="flex items-center text-[#00C896] font-extrabold text-lg sm:text-xl">
            <FaUser className="mr-2" /> {user?.name || "Unknown Patient"}
          </h3>
          <p className="flex items-center text-[#00C896cc] mt-2 sm:mt-0 text-sm sm:text-base font-semibold">
            <FaSyringe className="mr-2" />{" "}
            {user?.surgeryDetails || "No surgery details"}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 text-sm sm:text-base">
          <div>
            <p className="flex items-center text-[#00C896cc] font-semibold mb-1">
              <FaCalendarAlt className="mr-2" /> Date
            </p>
            <p className="text-white">
              {new Date(status.date || status.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="flex items-center text-[#00C896cc] font-semibold mb-1">
              <FaHeartbeat className="mr-2" /> Criticality Score
            </p>
            <p className="text-white">{status.criticalityScore}</p>
          </div>

          <div className="sm:col-span-2">
            <p className="flex items-center text-[#00C896cc] font-semibold mb-1">
              🩺 Symptoms
            </p>
            <p className="text-white whitespace-pre-line">{status.symptoms}</p>
          </div>

          <div className="sm:col-span-2">
            <p className="flex items-center text-[#00C896cc] font-semibold mb-1">
              🤖 AI Summary
            </p>
            <p className="text-white whitespace-pre-line">{status.aiSummary}</p>
          </div>

          <div>
            <p className="flex items-center text-[#00C896cc] font-semibold mb-1">
              <FaTemperatureHigh className="mr-2" /> Temperature
            </p>
            <p className="text-white">{status.temperature} °C</p>
          </div>

          {status.imageUrl && (
            <div className="sm:col-span-2 flex justify-center mt-4">
              <img
                src={status.imageUrl}
                alt="Surgical area"
                className="rounded-xl border-4 border-[#00C89644] max-w-full max-h-72 object-cover shadow-lg"
              />
            </div>
          )}
        </div>

        {/* Doctor Response or Input */}
        {status.doctorResponse ? (
          <div className="mt-6 bg-[#111a18] border-l-8 border-[#00C896] p-5 rounded-xl shadow-inner">
            <p className="flex items-center font-bold text-[#00C896] mb-2 text-lg">
              <FaComments className="mr-2" /> Your Response
            </p>
            <p className="text-white whitespace-pre-line">
              {status.doctorResponse}
            </p>
          </div>
        ) : (
          <div className="mt-6">
            <textarea
              rows={4}
              placeholder="Write your response here..."
              value={responseInputs[status._id] || ""}
              onChange={(e) => handleInputChange(status._id, e.target.value)}
              className="w-full px-5 py-3 bg-[#101a17] text-white rounded-xl border border-[#00C89644] focus:outline-none focus:ring-2 focus:ring-[#00C896] resize-none transition"
            />
            <button
              onClick={() => handleRespond(status._id)}
              className="mt-4 w-full sm:w-auto bg-gradient-to-r from-[#00C896] to-[#00A582] text-black font-bold px-6 py-3 rounded-xl hover:from-[#00b287] hover:to-[#009c75] transition"
            >
              Submit Response
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="pt-16 min-h-screen w-full overflow-x-hidden flex flex-col lg:flex-row bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#101a17] text-white">
      {/* Sidebar */}
      <div className="w-full lg:w-64 lg:fixed lg:top-16 lg:left-0 lg:h-screen bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#101a17] border-b lg:border-b-0 lg:border-r border-[#00C89644] py-6 px-4 lg:py-10 lg:px-6 z-20">
        <h2 className="text-2xl font-bold text-[#00C896] mb-6 lg:mb-10">
          Doctor Dashboard
        </h2>
        <p className="text-sm text-gray-400">
          View and respond to patient statuses
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 lg:ml-64 p-6 sm:p-8 lg:p-10 overflow-y-auto z-0">
        <div className="max-w-5xl mx-auto">
          {/* Filters and Tags */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
            <h2 className="text-3xl font-bold text-[#00C896]">
              Patient Daily Reports
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full sm:w-auto">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="flex flex-col">
                  <label className="block text-xs text-green-400 mb-1">
                    Status Filter
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-[#101a17] border border-[#00C89644] px-3 py-2 rounded text-white text-sm"
                  >
                    <option value="all">All</option>
                    <option value="unread">Unread Only</option>
                    <option value="read">Read Only</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="block text-xs text-green-400 mb-1">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#101a17] border border-[#00C89644] px-3 py-2 rounded text-white text-sm"
                  >
                    <option value="criticality">Criticality Score</option>
                    <option value="date">Date</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="block text-xs text-green-400 mb-1">
                    Order
                  </label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="bg-[#101a17] border border-[#00C89644] px-3 py-2 rounded text-white text-sm"
                  >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Grouped Statuses */}
          {statusFilter === "unread" && (
            <>
              <h3 className="text-xl font-semibold mb-4 text-red-400">
                🔴 Unread Statuses
              </h3>
              {unread.length > 0 ? (
                unread.map((s) => renderStatusCard(s))
              ) : (
                <p className="text-gray-400">No unread statuses.</p>
              )}
            </>
          )}

          {statusFilter === "read" && (
            <>
              <h3 className="text-xl font-semibold mb-4 text-green-400">
                ✅ Read Statuses
              </h3>
              {read.length > 0 ? (
                read.map((s) => renderStatusCard(s))
              ) : (
                <p className="text-gray-400">No read statuses.</p>
              )}
            </>
          )}

          {statusFilter === "all" && (
            <>
              {unread.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold mb-4 text-red-400">
                    🔴 Unread Statuses
                  </h3>
                  {unread.map((s) => renderStatusCard(s))}
                </>
              )}
              {read.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold mb-4 text-green-400">
                    ✅ Read Statuses
                  </h3>
                  {read.map((s) => renderStatusCard(s))}
                </>
              )}
              {statuses.length === 0 && (
                <p className="text-gray-400">No statuses to show.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
