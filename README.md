# 📝 Task Manager | MERN Stack Application

**Efficiently organize and complete your tasks.**

[](https://task-manager-front-azure-beta.vercel.app/)

A high-performance, full-stack Task Management system. This application provides a seamless user experience for managing daily workflows, featuring secure authentication and a responsive dashboard.

## 🔗 Quick Links

- **Live Demo:** [task-manager.com](https://task-manager-front-azure-beta.vercel.app/)
- **Backend Repository:** [GitHub Link](https://www.google.com/search?q=https://github.com/KUSHANcharuka/Task-Manager)

## 🌟 Key Features

- **Secure Authentication:** User registration and login powered by **JSON Web Tokens (JWT)** and password hashing via Bcrypt.
- **Full CRUD Functionality:** Create, Read, Update, and Delete tasks with real-time UI updates.
- **Dynamic Dashboard:** View tasks in real time.
- **Responsive UI:** Fully optimized for mobile, tablet, and desktop views.
- **Protected Routes:** Frontend and backend security to ensure only authorized users access their data.

## 🚀 Technical Architecture

- **Frontend:** React.js, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Authentication:** JSON Web Tokens (JWT) & Bcrypt password hashing
- **Database:** MongoDB Atlas
- **Deployment:** Vercel (Full Stack)

## 🛠️ Installation & Setup

- Clone:

```bash
git clone https://github.com/KUSHANcharuka/Task-Manager.git
cd Task-Manager
```

- Run backend (from `task-manager-backend`):

```bash
cd task-manager-backend
npm install
# create .env with MONGO_URI and JWT_SECRET
node server.js
```

- Run frontend (from `task-manager-app`):

```bash
cd task-manager-app
npm install
npm run dev
```

## 📂 Project Structure

```text
README.md
task-manager-app/                  # Frontend (React + Vite)
  ├── index.html
  ├── package.json
  ├── vite.config.js
  ├── public/
  └── src/
     ├── main.jsx
     ├── index.css
     ├── App.jsx
     ├── App.css
     ├── assets/
     ├── Components/
     │  ├── AddTask.jsx
     │  ├── Calendar.jsx
     │  ├── Login.jsx
     │  ├── SignUp.jsx
     │  ├── TaskManager.jsx
     │  └── TaskResults.jsx
     └── config/
        └── api.js

task-manager-backend/              # Backend (Express + Mongoose)
  ├── package.json
  ├── server.js
  ├── db.js
  ├── vercel.json
  ├── middleware/
  │   └── authMiddleware.js
  ├── models/
  │   ├── Task.js
  │   └── User.js
  ├── routes/
  │   ├── auth.js
  │   └── taskRoutes.js
  └── task_controller/
      └── task_control.js

```

## Notes

- Authentication: JWT + bcrypt (see `task-manager-backend` dependencies).
- Database: MongoDB (configure `MONGO_URI` in backend `.env`).
- Frontend: built with React, Vite and Tailwind/vanilla CSS; run with `npm run dev`.

## 📧 Contact

**K.A. Kushan Charuka Kumarasiri** Computer Science Student @ Saegis Campus  
[GitHub](https://github.com/KUSHANcharuka) | [LinkedIn](https://www.linkedin.com/in/kushan-charuka/)

---
