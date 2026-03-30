import React, { useState } from "react";
import TaskManager from "./Components/TaskManager";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<TaskManager />} />
      </Routes>
    </Router>
  );
};

export default App;
