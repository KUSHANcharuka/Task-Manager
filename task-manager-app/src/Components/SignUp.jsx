import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SignUp = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const goToLogIn = () => {
    navigate("/");
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => navigate("/"), 2000);
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FBFB] p-6 font-sans">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-12">
        <div className="flex items-center gap-2">
          <div className="w-2 h-8 bg-[#00E0FF] rounded-full"></div>
          <h1 className="text-2xl font-bold text-[#0D323E]">Task Manager</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-7xl font-black text-[#0D323E] leading-none">
            Join
          </h2>
          <div className="flex items-center gap-4 mt-2">
            <h2 className="text-5xl font-bold text-[#00E0FF]">Us</h2>
            <div className="h-1 w-20 bg-gray-200"></div>
          </div>
          <p className="text-gray-400 mt-4 text-lg">
            Create an account to manage your tasks.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-[#0D323E] mb-6">Sign Up</h3>

          {error && (
            <p className="mb-4 text-red-500 text-sm bg-red-50 p-2 rounded">
              {error}
            </p>
          )}
          {success && (
            <p className="mb-4 text-green-500 text-sm bg-green-50 p-2 rounded">
              Registraion Successful!...
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full px-6 py-3 rounded-full bg-gray-50 border border-transparent focus:border-[#00E0FF] outline-none transition"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-6 py-3 rounded-full bg-gray-50 border border-transparent focus:border-[#00E0FF] outline-none transition"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-6 py-3 rounded-full bg-gray-50 border border-transparent focus:border-[#00E0FF] outline-none transition"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00E0FF] hover:bg-[#00c6e0] text-white font-bold py-3 rounded-2xl shadow-lg shadow-cyan-100 transition flex justify-center items-center"
            >
              {loading ? "Processing..." : "+ Create Account"}
            </button>
          </form>

          <button
            onClick={onSwitchToLogin}
            className="w-full mt-6 text-sm text-gray-500 hover:text-[#0D323E] transition"
          >
            Already have an account?{" "}
            <span className="font-bold text-[#00E0FF]" onClick={goToLogIn}>
              Login
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
