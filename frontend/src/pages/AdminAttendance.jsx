import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminAttendance() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    if (!accessToken) {
      navigate("/login");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/attendance/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setAttendanceRecords(res.data);
      })
      .catch((err) => {
        console.error("Error fetching attendance:", err);
        setError("You are not authorized to view this page.");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-lg">
        Loading attendance records...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-red-400 text-lg">
        {error}
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      {/* Navbar */}
      <nav className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-400 cursor-pointer"
        >
          EMS Admin Panel
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            navigate("/login");
          }}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition"
        >
          Logout
        </button>
      </nav>

      {/* Table */}
      <div className="max-w-6xl mx-auto bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-400">
          Attendance Records
        </h2>

        {attendanceRecords.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
            No attendance records found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-700 text-sm md:text-base">
              <thead>
                <tr className="bg-gray-700 text-blue-300">
                  <th className="p-3 border border-gray-600">Employee</th>
                  <th className="p-3 border border-gray-600">Date</th>
                  <th className="p-3 border border-gray-600">Check-In</th>
                  <th className="p-3 border border-gray-600">Check-Out</th>
                  <th className="p-3 border border-gray-600">Status</th>
                  <th className="p-3 border border-gray-600">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="hover:bg-gray-900 transition border-t border-gray-700"
                  >
                    <td className="p-3 border border-gray-700">
                      {record.employee?.full_name || "—"}
                    </td>
                    <td className="p-3 border border-gray-700">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="p-3 border border-gray-700">
                      {record.check_in || "—"}
                    </td>
                    <td className="p-3 border border-gray-700">
                      {record.check_out || "—"}
                    </td>
                    <td
                      className={`p-3 border border-gray-700 font-medium ${
                        record.status === "Present"
                          ? "text-green-400"
                          : record.status === "Absent"
                          ? "text-red-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {record.status}
                    </td>
                    <td className="p-3 border border-gray-700">
                      {record.remarks || "—"}
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
