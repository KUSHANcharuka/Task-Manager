import React from "react";

function TaskResults({ tasks, onClose, isDark }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${
        isDark ? "bg-slate-950/60" : "bg-slate-900/20"
      }`}
    >
      <div
        className={`w-full max-w-2xl rounded-2xl shadow-2xl transform transition-all overflow-hidden border flex flex-col max-h-[90vh] ${
          isDark
            ? "bg-slate-800 text-white border-slate-700 shadow-black/60"
            : "bg-white text-black border-slate-200"
        }`}
      >
        <div
          className={`flex justify-between items-center p-6 border-b shrink-0 ${
            isDark
              ? "border-slate-700 bg-slate-900/50"
              : "border-slate-200 bg-slate-50/50"
          }`}
        >
          <h2
            className={`text-2xl font-bold ${
              isDark ? "text-white" : "text-slate-800"
            }`}
          >
            Search Results
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

        <div className="overflow-y-auto p-6 sm:p-8 max-h-[65vh]">
          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task._id}
                className={`rounded-lg p-4 mb-4 border transition-colors ${
                  isDark
                    ? "border-slate-700 bg-slate-900/40"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <h3 className="font-bold text-lg">{task.task}</h3>
                <p>{task.description}</p>
                <p
                  className={`text-sm ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Date: {task.date} | Start: {task.startTime}
                </p>
              </div>
            ))
          ) : (
            <p className={isDark ? "text-slate-400" : "text-slate-600"}>
              No tasks found
            </p>
          )}
        </div>

        <div
          className={`p-6 border-t flex justify-end shrink-0 ${
            isDark
              ? "border-slate-700 bg-slate-900"
              : "border-slate-200 bg-white"
          }`}
        >
          <button
            onClick={onClose}
            className={`px-6 py-3 rounded-xl font-bold transition-colors ${
              isDark
                ? "text-slate-400 hover:bg-slate-800"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskResults;
