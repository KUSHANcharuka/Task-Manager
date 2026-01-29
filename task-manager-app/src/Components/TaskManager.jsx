import React, { useState, useEffect } from "react";
import axios from "axios"; // 1. Axios Import කළා
import Calendar from "./Calendar";
import AddTask from "./AddTask";
import SearchBar from "./SearchBar";

const TaskManager = ({ user, onLogout }) => {
  const now = new Date();
  const [addtask, setShowaddtask] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // 2. tasks State එක හැදුවා (නැත්නම් setTasks වැඩ කරන්නේ නෑ)
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  // 3. Theme Object
  const theme = {
    container: darkMode
      ? "bg-slate-950 text-slate-100"
      : "bg-slate-50 text-slate-800",
    headerText: darkMode ? "text-white" : "text-slate-900",
    subText: darkMode ? "text-slate-400" : "text-slate-500",
    card: darkMode
      ? "bg-slate-900 border-slate-800 shadow-black/50"
      : "bg-white border-slate-100 shadow-slate-200/50",
    input: darkMode
      ? "bg-slate-900 border-slate-800 text-slate-200 placeholder-slate-600"
      : "bg-white border-slate-200 text-slate-700",
    dateText: darkMode ? "text-slate-700" : "text-slate-300",
  };

  // 4. Tasks Fetch කරන function එක
  const fetchTasks = async () => {
    try {
      // Backend එක run වෙන්නේ port 5000 න් බව තහවුරු කරගන්න
      const response = await axios.get("http://localhost:5000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // 5. Search Function එක
  const handleSearch = async (query) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/tasks/search?title=${query}`
      );
      setFilteredTasks(res.data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  // 6. මුලින්ම page එක load වෙද්දි tasks ගන්න
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div
      className={`min-h-screen font-sans selection:bg-cyan-100 transition-colors duration-300 ${theme.container}`}
    >
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-2 bg-[#00D4FF] rounded-full shadow-[0_0_15px_#00D4FF]"></div>
            <h1
              className={`text-3xl font-black italic tracking-tight ${theme.headerText}`}
            >
              Task Manager
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`h-10 w-10 rounded-full border transition-all flex items-center justify-center hover:text-[#00D4FF] hover:shadow-md ${
                darkMode
                  ? "bg-slate-900 border-slate-800 text-slate-400"
                  : "bg-white border-slate-200 text-slate-500"
              }`}
            >
              {darkMode ? (
                <i className="fi fi-rr-sun text-xl"></i>
              ) : (
                <i className="fi fi-rr-moon text-xl"></i>
              )}
            </button>

            <div
              className={`flex items-center gap-4 px-5 py-2 rounded-full shadow-sm border transition-colors ${
                darkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-slate-100"
              }`}
            >
              <div className="text-right hidden sm:block">
                <p
                  className={`text-xs font-semibold uppercase tracking-wider ${theme.subText}`}
                >
                  Welcome back
                </p>
                <h1
                  className={`text-lg font-bold leading-none ${theme.headerText}`}
                >
                  {user || "User"}
                </h1>
              </div>
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  darkMode
                    ? "bg-slate-800 text-[#00D4FF]"
                    : "bg-cyan-50 text-[#00404D]"
                }`}
              >
                <i className="fi fi-rr-circle-user text-2xl"></i>
              </div>
            </div>

            <button
              onClick={onLogout}
              className={`h-10 w-10 rounded-full border transition-all flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 hover:border-red-100 ${
                darkMode
                  ? "bg-slate-900 border-slate-800 hover:bg-red-900/20 hover:border-red-900/50"
                  : "bg-white border-slate-200"
              }`}
              title="Logout"
            >
              <i className="fi fi-rr-sign-out-alt text-xl"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-10">
        <div className="grid lg:grid-cols-3 gap-8 mb-8 items-end">
          <div className="lg:col-span-2">
            <section className="flex flex-col">
              <h2
                className={`text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r tracking-tighter transition-all ${
                  darkMode
                    ? "from-[#00D4FF] to-white"
                    : "from-[#00404D] to-[#00D4FF]"
                }`}
              >
                {now.toLocaleDateString("en-GB", { month: "long" })}
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <span
                  className={`text-4xl font-bold transition-colors ${theme.dateText}`}
                >
                  {now.getFullYear()}
                </span>
                <div
                  className={`h-1 w-12 rounded-full transition-colors ${
                    darkMode ? "bg-slate-800" : "bg-slate-200"
                  }`}
                ></div>
              </div>
            </section>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 lg:justify-end w-full">
            <div className="relative group flex-grow sm:flex-grow-0 sm:w-64">
              {/* SearchBar එකට onSearch function එක pass කළා */}
              <SearchBar isDark={darkMode} onSearch={handleSearch} />
            </div>

            <button
              onClick={() => setShowaddtask(true)}
              className="bg-[#00D4FF] hover:bg-[#00bce3] text-white text-lg font-bold rounded-2xl px-6 py-3 shadow-lg shadow-cyan-200/50 hover:shadow-cyan-300/50 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>+ New Task</span>
            </button>
          </div>
        </div>

        {/* Calendar Container */}
        <div
          className={`rounded-[2rem] shadow-xl border p-4 sm:p-8 relative overflow-hidden transition-all ${theme.card}`}
        >
          <div
            className={`absolute -top-20 -right-20 w-64 h-64 rounded-full filter blur-3xl opacity-50 pointer-events-none transition-all ${
              darkMode
                ? "bg-cyan-900/20 mix-blend-screen"
                : "bg-cyan-100 mix-blend-multiply"
            }`}
          ></div>
          <div className="relative z-10">
            {/* Calendar එකට tasks ටික යවනවා */}
            <Calendar isDark={darkMode} tasks={tasks} />
          </div>
        </div>
      </main>

      {addtask && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${
            darkMode ? "bg-slate-950/60" : "bg-slate-900/20"
          }`}
        >
          {/* AddTask එකෙන් පස්සේ refresh වෙන්න function එක යවනවා */}
          <AddTask
            onClose={() => setShowaddtask(false)}
            isDark={darkMode}
            refreshTasks={fetchTasks}
          />
        </div>
      )}
    </div>
  );
};

export default TaskManager;
