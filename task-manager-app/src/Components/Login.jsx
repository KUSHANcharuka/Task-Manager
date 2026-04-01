import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = ({ onSwitchToSignUp }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const goToSignup = () => {
    navigate("/signup");
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed. Check your credentials.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FBFB] p-6 font-sans text-[#0D323E]">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-12">
        <div className="flex items-center gap-2">
          <div className="w-2 h-8 bg-[#00E0FF] rounded-full shadow-[0_0_10px_rgba(0,224,255,0.5)]"></div>
          <h1 className="text-2xl font-bold">Task Manager</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-7xl font-black leading-none">Hello</h2>
          <div className="flex items-center gap-4 mt-2">
            <h2 className="text-5xl font-bold text-[#00E0FF]">Again</h2>
            <div className="h-1 w-20 bg-gray-200"></div>
          </div>
          <p className="text-gray-400 mt-4 text-lg">
            Enter your details to manage your daily tasks.
          </p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-50">
          <h3 className="text-2xl font-bold mb-2">Login</h3>
          <p className="text-sm text-gray-400 mb-8">Access your workspace</p>

          {error && (
            <p className="mb-4 text-red-500 text-sm bg-red-50 p-3 rounded-xl border border-red-100">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 ml-4">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                className="w-full px-6 py-4 rounded-full bg-[#F8FBFB] border border-transparent focus:border-[#00E0FF] focus:bg-white outline-none transition-all"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 ml-4">
                PASSWORD
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full px-6 py-4 rounded-full bg-[#F8FBFB] border border-transparent focus:border-[#00E0FF] focus:bg-white outline-none transition-all"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00E0FF] hover:bg-[#00c6e0] text-white font-bold py-4 rounded-2xl shadow-lg shadow-cyan-100 transition-all active:scale-[0.98] flex justify-center items-center mt-4"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Logging in...
                </span>
              ) : (
                "Log In →"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={onSwitchToSignUp}
              className="text-sm text-gray-400 hover:text-[#0D323E] transition"
            >
              New here?{" "}
              <span className="font-bold text-[#00E0FF]" onClick={goToSignup}>
                Create an account
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
