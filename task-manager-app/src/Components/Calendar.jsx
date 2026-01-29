import React, { useState, useEffect } from "react";

const formatDateISO = (date) => {
  const d = new Date(date);
  const offset = d.getTimezoneOffset();
  const adjustedDate = new Date(d.getTime() - offset * 60 * 1000);
  return adjustedDate.toISOString().split("T")[0];
};

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const subDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

const Calendar = ({ isDark }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(formatDateISO(new Date()));
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editFields, setEditFields] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch Tasks
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Backend offline, using mock data.");
        setTasks([
          {
            _id: "1",
            task: "Design Review",
            description: "Review new dashboard",
            date: formatDateISO(new Date()),
            startTime: "09:00",
            endTime: "10:30",
          },
          {
            _id: "2",
            task: "Team Sync",
            description: "Daily Standup",
            date: formatDateISO(new Date()),
            startTime: "11:00",
            endTime: "11:30",
          },
        ]);
        setLoading(false);
      });
  }, []);

  const getWeekDates = () =>
    Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  const handlePrev = () => setStartDate((prev) => subDays(prev, 7));
  const handleNext = () => setStartDate((prev) => addDays(prev, 7));

  const filteredTasks = tasks.filter((task) => task.date === selectedDate);

  const handleDelete = (id) => {
    const previousTasks = [...tasks];
    setTasks((prev) => prev.filter((t) => t._id !== id));
    fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" }).catch(
      (err) => setTasks(previousTasks)
    );
  };

  const handleUpdate = (id) => {
    const previousTasks = [...tasks];
    const updatedTask = { ...tasks.find((t) => t._id === id), ...editFields };

    setTasks((prev) => prev.map((t) => (t._id === id ? updatedTask : t)));
    setEditTaskId(null);
    setEditFields({});

    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editFields),
    }).catch((err) => setTasks(previousTasks));
  };

  // Theme Classes
  const textMain = isDark ? "text-white" : "text-slate-800";
  const textSub = isDark ? "text-slate-400" : "text-slate-500";
  const cardBg = isDark
    ? "bg-slate-800 border-slate-700"
    : "bg-white border-slate-100 shadow-sm";
  const inputClass = `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D4FF] transition-all text-sm ${
    isDark
      ? "bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-600"
      : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
  }`;

  return (
    <div className="w-full">
      {/* Navigation Header */}
      <div className="flex justify-between items-center mb-6 px-2">
        <button
          onClick={handlePrev}
          className={`p-2 rounded-full transition-colors hover:scale-110 active:scale-95 ${
            isDark
              ? "hover:bg-slate-800 text-slate-400"
              : "hover:bg-slate-100 text-slate-500"
          }`}
        >
          <i className="fi fi-rr-angle-left text-xl"></i>
        </button>

        <h2 className={`text-lg md:text-xl font-bold ${textMain}`}>
          Week of{" "}
          {startDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </h2>

        <button
          onClick={handleNext}
          className={`p-2 rounded-full transition-colors hover:scale-110 active:scale-95 ${
            isDark
              ? "hover:bg-slate-800 text-slate-400"
              : "hover:bg-slate-100 text-slate-500"
          }`}
        >
          <i className="fi fi-rr-angle-right text-xl"></i>
        </button>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-7 gap-2 mb-8">
        {getWeekDates().map((date, idx) => {
          const dateStr = formatDateISO(date);
          const isSelected = selectedDate === dateStr;
          const isToday = formatDateISO(new Date()) === dateStr;

          return (
            <div
              key={idx}
              onClick={() => setSelectedDate(dateStr)}
              className={`relative cursor-pointer rounded-2xl py-3 md:py-4 flex flex-col items-center justify-center transition-all duration-200 border ${
                isSelected
                  ? "bg-[#00D4FF] border-[#00D4FF] text-white shadow-lg shadow-cyan-200/50 dark:shadow-none transform -translate-y-1"
                  : isDark
                  ? "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700"
                  : "bg-slate-50 border-slate-100 text-slate-500 hover:bg-white hover:shadow-md"
              }`}
            >
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider opacity-70 mb-1">
                {date.toLocaleDateString("en-US", { weekday: "short" })}
              </span>
              <span className="text-lg md:text-2xl font-bold">
                {date.getDate()}
              </span>
              {isToday && !isSelected && (
                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[#00D4FF]"></span>
              )}
            </div>
          );
        })}
      </div>

      {/* Task List Section */}
      <div className="animate-fade-in min-h-[200px]">
        <h3
          className={`text-lg font-bold mb-4 flex items-center gap-2 ${textSub}`}
        >
          <i className="fi fi-rr-list-check"></i>
          <span>
            Tasks for{" "}
            {new Date(selectedDate).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </span>
        </h3>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin h-8 w-8 border-4 border-[#00D4FF] border-t-transparent rounded-full"></div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div
            className={`flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-3xl ${
              isDark
                ? "border-slate-800 text-slate-600"
                : "border-slate-200 text-slate-400"
            }`}
          >
            <i className="fi fi-rr-calendar-clock text-4xl mb-3 opacity-50"></i>
            <p className="font-medium">No tasks scheduled</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className={`p-5 rounded-2xl border transition-all group hover:shadow-md ${cardBg}`}
              >
                {editTaskId === task._id ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold uppercase text-[#00D4FF] tracking-wider">
                        Editing Task
                      </span>
                    </div>
                    <input
                      type="text"
                      value={editFields.task || ""}
                      onChange={(e) =>
                        setEditFields({ ...editFields, task: e.target.value })
                      }
                      placeholder="Task Name"
                      className={inputClass}
                      autoFocus
                    />
                    <textarea
                      value={editFields.description || ""}
                      onChange={(e) =>
                        setEditFields({
                          ...editFields,
                          description: e.target.value,
                        })
                      }
                      placeholder="Description"
                      rows="2"
                      className={`${inputClass} resize-none`}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label
                          className={`text-[10px] font-bold uppercase ${textSub}`}
                        >
                          Start
                        </label>
                        <input
                          type="time"
                          value={editFields.startTime || ""}
                          onChange={(e) =>
                            setEditFields({
                              ...editFields,
                              startTime: e.target.value,
                            })
                          }
                          className={`${inputClass} ${
                            isDark ? "[color-scheme:dark]" : ""
                          }`}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          className={`text-[10px] font-bold uppercase ${textSub}`}
                        >
                          End
                        </label>
                        <input
                          type="time"
                          value={editFields.endTime || ""}
                          onChange={(e) =>
                            setEditFields({
                              ...editFields,
                              endTime: e.target.value,
                            })
                          }
                          className={`${inputClass} ${
                            isDark ? "[color-scheme:dark]" : ""
                          }`}
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 pt-3 justify-end border-t border-slate-100 dark:border-slate-700 mt-2">
                      <button
                        onClick={() => setEditTaskId(null)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                          isDark
                            ? "text-slate-400 hover:bg-slate-700"
                            : "text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleUpdate(task._id)}
                        className="px-4 py-2 rounded-lg bg-[#00D4FF] hover:bg-[#00bce3] text-white text-sm font-bold shadow-lg shadow-cyan-200/30 transition-all"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`text-lg font-bold ${textMain}`}>
                          {task.task}
                        </h4>
                        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></span>
                      </div>
                      <p className={`text-sm leading-relaxed ${textSub}`}>
                        {task.description}
                      </p>
                      <div className="flex items-center gap-2 mt-3 text-xs font-bold uppercase tracking-wider text-[#00D4FF] bg-cyan-50 dark:bg-cyan-900/20 py-1 px-2 rounded-md w-fit">
                        <i className="fi fi-rr-clock"></i>
                        {task.startTime} - {task.endTime}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-center opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setEditTaskId(task._id);
                          setEditFields(task);
                        }}
                        className={`h-10 w-10 flex items-center justify-center rounded-xl transition-all ${
                          isDark
                            ? "text-slate-400 hover:text-white hover:bg-slate-700"
                            : "text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                        }`}
                        title="Edit Task"
                      >
                        <i className="fi fi-rr-edit text-lg"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className={`h-10 w-10 flex items-center justify-center rounded-xl transition-all ${
                          isDark
                            ? "text-slate-400 hover:text-red-400 hover:bg-red-900/30"
                            : "text-slate-400 hover:text-red-600 hover:bg-red-50"
                        }`}
                        title="Delete Task"
                      >
                        <i className="fi fi-rr-trash text-lg"></i>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
