import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    if (!accessToken) {
      navigate("/login");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/tasks/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-lg">
        Loading Tasks...
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

      <div className="max-w-5xl mx-auto bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-400">
          My Tasks
        </h2>

        {tasks.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
            No tasks assigned yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition"
              >
                <h3 className="text-xl font-semibold text-blue-400 mb-2">
                  {task.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {task.description || "No description provided."}
                </p>

                <div className="flex justify-between text-gray-400 text-sm mb-2">
                  <span>📅 Assigned: {new Date(task.assigned_date).toLocaleDateString()}</span>
                  <span>⏰ Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                </div>

                <p
                  className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${
                    task.status === "completed"
                      ? "bg-green-700 text-green-200"
                      : task.status === "in_progress"
                      ? "bg-yellow-700 text-yellow-200"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {task.status.replace("_", " ").toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
