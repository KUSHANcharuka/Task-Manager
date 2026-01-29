import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async (query = "") => {
    try {
      const response = await axios.get(`/api/tasks/search?title=${query}`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks(); // Fetch all tasks on initial load
  }, []);

  const handleSearch = (query) => {
    fetchTasks(query); // Fetch tasks based on search query
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
