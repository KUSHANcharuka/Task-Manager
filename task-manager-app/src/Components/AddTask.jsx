import React, { useState } from "react";

function AddTask({ onClose, isDark }) {
  const [formData, setFormData] = useState({
    task: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/tasks/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Task added:", data);
        onClose();
      })
      .catch((err) => console.error("Error:", err));
  };

  const inputClass = `w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00D4FF] transition-all ${
    isDark
      ? "bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500 focus:bg-slate-900"
      : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white"
  }`;
  const labelClass = `text-sm font-bold uppercase tracking-wider ${
    isDark ? "text-slate-400" : "text-slate-600"
  }`;

  return (
    <div
      className={`relative w-full max-w-2xl rounded-2xl shadow-2xl transform transition-all overflow-hidden border flex flex-col max-h-[90vh] ${
        isDark
          ? "bg-slate-900 border-slate-800 shadow-black/60"
          : "bg-white border-transparent"
      }`}
    >
      <div
        className={`flex justify-between items-center p-6 border-b shrink-0 ${
          isDark
            ? "border-slate-800 bg-slate-800/50"
            : "border-slate-100 bg-slate-50/50"
        }`}
      >
        <h2
          className={`text-2xl font-bold ${
            isDark ? "text-white" : "text-slate-800"
          }`}
        >
          Create New Task
        </h2>
        <button
          onClick={onClose}
          className={`transition-colors p-1 rounded-full ${
            isDark
              ? "text-slate-400 hover:text-red-500 hover:bg-red-900/20"
              : "text-slate-400 hover:text-red-500 hover:bg-red-50"
          }`}
        >
          <i className="fi fi-rs-circle-xmark text-2xl"></i>
        </button>
      </div>

      <div className="overflow-y-auto p-6 sm:p-8">
        <form id="addTaskForm" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="task" className={labelClass}>
                  Task Name
                </label>
                <input
                  type="text"
                  name="task"
                  value={formData.task}
                  onChange={handleChange}
                  placeholder="e.g., Project Review"
                  required
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className={labelClass}>
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Add details..."
                  required
                  rows="4"
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="date" className={labelClass}>
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className={`${inputClass} cursor-pointer`}
                  style={{ colorScheme: isDark ? "dark" : "light" }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="startTime" className={labelClass}>
                    Start
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                    className={`${inputClass} cursor-pointer`}
                    style={{ colorScheme: isDark ? "dark" : "light" }}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="endTime" className={labelClass}>
                    End
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    required
                    className={`${inputClass} cursor-pointer`}
                    style={{ colorScheme: isDark ? "dark" : "light" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div
        className={`p-6 border-t flex justify-end gap-4 shrink-0 ${
          isDark ? "border-slate-800 bg-slate-900" : "border-slate-100 bg-white"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className={`px-6 py-3 rounded-xl font-bold transition-colors ${
            isDark
              ? "text-slate-400 hover:bg-slate-800"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Cancel
        </button>
        <button
          type="submit"
          form="addTaskForm"
          className="px-8 py-3 rounded-xl bg-[#00D4FF] hover:bg-[#00bce3] text-white font-bold shadow-lg shadow-cyan-200/50 transition-all flex items-center gap-2"
        >
          <i className="fi fi-rr-check-circle text-lg"></i>
          <span>Save Task</span>
        </button>
      </div>
    </div>
  );
}

export default AddTask;
