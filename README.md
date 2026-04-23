📝 Task Manager | MERN Stack Application
A robust, full-stack Task Management system designed to streamline productivity. This application allows users to manage their daily workflows with a secure, responsive, and intuitive interface.

🌟 Key Features
Secure Authentication: User registration and login powered by JSON Web Tokens (JWT) and password hashing.

State Management: Efficient data handling using React Hooks (and/or Redux).

RESTful API: A clean backend architecture for handling Task CRUD operations.

Dynamic UI: Responsive design that scales from mobile devices to desktop monitors.

🚀 Technical Architecture
This project is built using the MERN stack for high performance and scalability:

Frontend: React.js, Axios, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB Atlas (NoSQL)

Security: Bcrypt.js for encryption, JWT for authorization

🛠️ Installation & Setup
To get a local copy up and running, follow these steps:

1. Prerequisites
npm (Node Package Manager)

A MongoDB Atlas account or local MongoDB instance

2. Clone the Repository
Bash
git clone https://github.com/KUSHANcharuka/Task-Manager.git
cd Task-Manager
3. Environment Variables
Create a .env file in the root of the backend directory and add the following:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4. Install Dependencies & Run
For the Backend:

Bash
cd backend
npm install
npm start
For the Frontend:

Bash
cd frontend
npm install
npm start

📂 Project Structure
Plaintext
├── backend/
│   ├── controllers/   # Business logic for routes
│   ├── models/        # MongoDB schemas (User, Task)
│   ├── routes/        # API endpoints
│   └── middleware/    # Auth & Error handling
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # View layouts (Login, Dashboard)
│   │   └── context/    # Global state management
└── README.md

📧 Contact
K.A. Kushan Charuka Kumarasiri GitHub | LinkedIn
