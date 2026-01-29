import React, { useState, useEffect } from "react";
import TaskManager from "./Components/TaskManager"; // Make sure this path matches your folder structure

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (username.trim()) {
        onLogin(username);
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden selection:bg-cyan-100">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#00D4FF]/20 rounded-full blur-3xl mix-blend-multiply animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#00404D]/10 rounded-full blur-3xl mix-blend-multiply animate-pulse delay-700"></div>

      {/* Login Card */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-3 bg-[#00D4FF] rounded-full shadow-[0_0_20px_#00D4FF]"></div>
          </div>
          <h1 className="text-3xl font-black italic text-slate-800 mb-2">
            Task Manager
          </h1>
          <p className="text-slate-500">
            Welcome back! Please login to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 tracking-wider ml-1">
              Username
            </label>
            <div className="relative group">
              <i className="fi fi-rr-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#00D4FF] transition-colors"></i>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 tracking-wider ml-1">
              Password
            </label>
            <div className="relative group">
              <i className="fi fi-rr-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#00D4FF] transition-colors"></i>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00D4FF] hover:bg-[#00bce3] text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-200 transition-all hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Sign In</span>
                <i className="fi fi-rr-arrow-small-right text-xl mt-1"></i>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-400">
            Don't have an account?{" "}
            <span className="text-[#00D4FF] font-bold cursor-pointer hover:underline">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
const App = () => {
  const [user, setUser] = useState(null);

  // Check for existing session on load
  useEffect(() => {
    const savedUser = localStorage.getItem("taskManagerUser");
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleLogin = (username) => {
    setUser(username);
    localStorage.setItem("taskManagerUser", username);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("taskManagerUser");
  };

  return (
    <>
      {user ? (
        // Pass user and logout function to TaskManager
        <TaskManager user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
};

export default App;
