import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
        email,
        password,
      });

      // Save JWT tokens in localStorage (temporary)
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      alert("Login successful!");
      // Redirect logic goes here
    } catch (err) {
      console.error(err);
      setError("Invalid credentials or server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-gray-900/70 backdrop-blur-md border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-semibold text-white mb-6 text-center">
          Employee Management System
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded-lg font-medium text-white"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
