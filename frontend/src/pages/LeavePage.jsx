import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LeavePage() {
  const [leaves, setLeaves] = useState([]);
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    reason: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("access");

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/leaves/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => setLeaves(res.data))
      .catch(() => setError("Failed to fetch leave records"))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    axios
      .post("http://127.0.0.1:8000/api/leaves/", formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => {
        setMessage("Leave request submitted successfully!");
        setFormData({ start_date: "", end_date: "", reason: "" });
        return axios.get("http://127.0.0.1:8000/api/leaves/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      })
      .then((res) => setLeaves(res.data))
      .catch(() => setError("Failed to submit leave request"));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-lg">
        Loading leave data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      {/* Navbar */}
      <nav className="flex justify-between items-center mb-10 border-b border-gray-700 pb-4">
        <h1
          onClick={() => navigate("/home")}
          className="text-2xl font-bold text-blue-400 cursor-pointer"
        >
          EMS Leave Portal
        </h1>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition"
        >
          Logout
        </button>
      </nav>

      {/* Form */}
      <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-400">
          Apply for Leave
        </h2>

        {error && (
          <div className="mb-4 text-red-400 text-sm bg-gray-900 p-2 rounded">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-4 text-green-400 text-sm bg-gray-900 p-2 rounded">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-300">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">End Date</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              rows="3"
              placeholder="State your reason for leave..."
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium transition"
          >
            Submit Request
          </button>
        </form>
      </div>

      {/* Leave History */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-2xl border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-blue-400 text-center">
          My Leave Requests
        </h2>

        {leaves.length === 0 ? (
          <p className="text-center text-gray-400">No leave requests found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-700 text-sm md:text-base">
              <thead>
                <tr className="bg-gray-700 text-blue-300">
                  <th className="p-3 border border-gray-600">Start Date</th>
                  <th className="p-3 border border-gray-600">End Date</th>
                  <th className="p-3 border border-gray-600">Reason</th>
                  <th className="p-3 border border-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr
                    key={leave.id}
                    className="hover:bg-gray-900 transition border-t border-gray-700"
                  >
                    <td className="p-3 border border-gray-700">
                      {new Date(leave.start_date).toLocaleDateString()}
                    </td>
                    <td className="p-3 border border-gray-700">
                      {new Date(leave.end_date).toLocaleDateString()}
                    </td>
                    <td className="p-3 border border-gray-700">{leave.reason}</td>
                    <td
                      className={`p-3 border border-gray-700 font-medium ${
                        leave.status === "Approved"
                          ? "text-green-400"
                          : leave.status === "Pending"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {leave.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
