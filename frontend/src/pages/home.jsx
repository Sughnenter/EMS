import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("access");

    if (!accessToken) {
      navigate("/login");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/employees/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setUser(res.data[0]); // TEMP: Displaying the first employee (we’ll use /me endpoint later)
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <nav className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
        <h1 className="text-2xl font-bold text-blue-400">Employee Management System</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition"
        >
          Logout
        </button>
      </nav>

      <main>
        <h2 className="text-3xl font-semibold mb-4">Welcome{user ? `, ${user.full_name}` : ""} 👋</h2>
        <p className="text-gray-400 mb-6">
          You’re logged in to the Employee Management System dashboard.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-400">Your Profile</h3>
            <p className="text-gray-300 mb-1">
              <strong>Email:</strong> {user?.email}
            </p>
            <p className="text-gray-300 mb-1">
              <strong>Position:</strong> {user?.position}
            </p>
            <p className="text-gray-300">
              <strong>ID:</strong> {user?.employee_id}
            </p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-green-400">Attendance</h3>
            <p className="text-gray-400">Track and review your attendance records.</p>
            <button
              onClick={() => navigate("/attendance")}
              className="mt-3 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium"
            >
              View Attendance
            </button>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-yellow-400">Tasks</h3>
            <p className="text-gray-400">Check your assigned tasks and their progress.</p>
            <button
              onClick={() => navigate("/tasks")}
              className="mt-3 bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg font-medium"
            >
              View Tasks
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
