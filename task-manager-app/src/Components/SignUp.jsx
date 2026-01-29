import React, { useState } from "react";

const SignUp = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          onSwitchToLogin(); // Redirect to login after 1.5s
        }, 1500);
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Server offline");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden selection:bg-cyan-100">
      {/* Decorative Background Elements */}
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-[#00D4FF]/20 rounded-full blur-3xl mix-blend-multiply animate-pulse"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-400/20 rounded-full blur-3xl mix-blend-multiply animate-pulse delay-700"></div>

      <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black italic text-slate-800 mb-2">
            Create Account
          </h1>
          <p className="text-slate-500">Join us to organize your tasks!</p>
        </div>

        {success ? (
          <div className="p-4 bg-green-100 text-green-700 rounded-xl text-center font-bold animate-pulse">
            ✅ Account Created! Redirecting...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-100 text-red-600 text-sm rounded-lg text-center">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-slate-400 tracking-wider ml-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00D4FF]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-slate-400 tracking-wider ml-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00D4FF]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-slate-400 tracking-wider ml-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00D4FF]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00D4FF] hover:bg-[#00bce3] text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-200 transition-all hover:-translate-y-1"
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-[#00D4FF] font-bold hover:underline"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
