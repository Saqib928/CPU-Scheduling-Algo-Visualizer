# 🚀 OS Scheduling Algorithms Visualizer

> An interactive, production-grade educational platform designed to help students and developers visualize and understand Operating System CPU Scheduling Algorithms.

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-purple.svg)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-success.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-gray.svg)](LICENSE)

## 📖 Overview

The **OS Scheduling Algorithms Visualizer** bridges the gap between theoretical OS concepts and practical understanding. By providing real-time, step-by-step graphical visualizations of process execution, accompanied by integrated learning materials and quizzes, this platform serves as a comprehensive educational suite.

### ✨ Key Features

*   **Interactive Visualizer:** Watch algorithms like FCFS, SJF, Round Robin, and Priority Scheduling execute in real-time with dynamic Gantt charts and performance metrics.
*   **Learning Notebook:** Integrated educational content that breaks down the math and theory behind each scheduling algorithm.
*   **Quiz Arena:** Gamified knowledge assessments to test user comprehension and track learning progress.
*   **User Authentication:** Secure JWT-based authentication to save progress, unlock new algorithms, and maintain a personalized dashboard.
*   **Secure & Performant Backend:** Hardened Express API featuring Rate Limiting, NoSQL Injection protection, and secure HTTP headers.

---

## 🏗️ Architecture & Tech Stack

This project is structured as a modern decoupled full-stack application.

**Frontend (Client)**
*   **Framework:** React 18 + Vite
*   **Styling:** Tailwind CSS + Framer Motion (Animations)
*   **Data Visualization:** Recharts
*   **State Management:** React Context API

**Backend (API)**
*   **Runtime:** Node.js + Express
*   **Database:** MongoDB (Mongoose ODM)
*   **Authentication:** JWT (JSON Web Tokens) & bcryptjs
*   **Security:** Helmet, Express-Mongo-Sanitize, Express-Rate-Limit

---

## 🚀 Getting Started (Local Development)

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/os-algo-visualizer.git
cd os-algo-visualizer
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory based on `.env.example`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/os-algo
JWT_SECRET=your_super_secret_jwt_key_here
CLIENT_URL=http://localhost:5173
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```
Start the Vite development server:
```bash
npm run dev
```

---

## 🔒 Security Posture

This application is built with security in mind:
- **Helmet.js** protects against XSS, clickjacking, and mime-sniffing.
- **Express-Rate-Limit** prevents brute-force and DDoS attacks on the API.
- **Express-Mongo-Sanitize** stops NoSQL injection attempts by sanitizing user input.
- **Fail-Safe Startup:** The server refuses to start if cryptographic secrets (`JWT_SECRET`) are missing.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
