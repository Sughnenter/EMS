import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    position: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/register/", {
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
        position: formData.position,
      });

      // Save tokens for now (we’ll switch to HttpOnly cookies later)
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-gray-900/70 backdrop-blur-md border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-semibold text-white mb-6 text-center">
          Create Your Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Software Engineer"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          {success && <p className="text-green-400 text-sm text-center">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded-lg font-medium text-white"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
