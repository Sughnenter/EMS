import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
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
        // Temporary — we’ll switch to /api/me/ later
        setProfile(res.data[0]);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-lg">
        Loading Profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-lg">
        Profile not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <nav className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
        <h1
          onClick={() => navigate("/home")}
          className="text-2xl font-bold text-blue-400 cursor-pointer"
        >
          Employee Management System
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

      <div className="max-w-4xl mx-auto bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-400">My Profile</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-400 text-sm mb-1">Full Name</p>
            <p className="text-xl font-semibold">{profile.full_name}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-1">Email</p>
            <p className="text-xl font-semibold">{profile.email}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-1">Employee ID</p>
            <p className="text-xl font-semibold">{profile.employee_id}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-1">Position</p>
            <p className="text-xl font-semibold">{profile.position || "Not Assigned"}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-1">Date Joined</p>
            <p className="text-xl font-semibold">
              {new Date(profile.date_joined).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-1">Department</p>
            <p className="text-xl font-semibold">{profile.department || "N/A"}</p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/home")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
