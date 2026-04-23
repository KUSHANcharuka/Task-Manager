# 📝 Task Manager | MERN Stack Application

**Efficiently organize and complete your tasks.**

[](https://task-manager-front-azure-beta.vercel.app/)

A high-performance, full-stack Task Management system. This application provides a seamless user experience for managing daily workflows, featuring secure authentication and a responsive dashboard.

## 🔗 Quick Links

  * **Live Demo:** [task-manager.com](https://task-manager-front-azure-beta.vercel.app/)
  * **Backend Repository:** [GitHub Link](https://www.google.com/search?q=https://github.com/KUSHANcharuka/Task-Manager)

## 🌟 Key Features

  * **Secure Authentication:** User registration and login powered by **JSON Web Tokens (JWT)** and password hashing via Bcrypt.
  * **Full CRUD Functionality:** Create, Read, Update, and Delete tasks with real-time UI updates.
  * **Dynamic Dashboard:** View task progress and categorize items by status (To-Do, In Progress, Done).
  * **Responsive UI:** Fully optimized for mobile, tablet, and desktop views.
  * **Protected Routes:** Frontend and backend security to ensure only authorized users access their data.

## 🚀 Technical Architecture

  * **Frontend:** React.js, Tailwind CSS, Axios
  * **Backend:** Node.js, Express.js
  * **Authentication:** JSON Web Tokens (JWT) & Bcrypt password hashing
  * **Database:** MongoDB Atlas
  * **Deployment:** Vercel (Full Stack)


## 🛠️ Installation & Setup

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/KUSHANcharuka/Task-Manager.git
    cd Task-Manager
    ```

2.  **Setup Backend:**

      * Navigate to `/backend`, run `npm install`.
      * Create a `.env` file:
        ```env
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_secret_key
        ```
      * Run `npm start`.

3.  **Setup Frontend:**

      * Navigate to `/frontend`, run `npm install`.
      * Run `npm start`.

## 📂 Project Structure

```text
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
```
## 📧 Contact

**K.A. Kushan Charuka Kumarasiri** Computer Science Student @ Saegis Campus  
[GitHub](https://github.com/KUSHANcharuka) | [LinkedIn](https://www.linkedin.com/in/kushan-charuka/)

-----
