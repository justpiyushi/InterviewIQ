<div align="center">

# 🚀 InterviewIQ

### AI-Powered Interview Preparation Platform

**InterviewIQ** leverages **Google Gemini AI** to analyze resumes, understand job descriptions, and generate personalized interview reports to help candidates prepare for technical interviews.

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Google-Gemini-4285F4?logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Authentication-black" />
</p>

</div>

---

# 📖 Overview

InterviewIQ is a full-stack AI-powered web application built using the **MERN Stack** and **Google Gemini AI**.

The platform helps job seekers prepare for interviews by:

* 📄 Analyzing resumes
* 💼 Understanding job descriptions
* 🤖 Generating personalized interview reports
* 📊 Identifying strengths and improvement areas

The application aims to simulate an AI interview coach that provides actionable feedback based on the candidate's profile and target role.

---

# ✨ Features

* 📄 Upload resumes in PDF format
* 🧠 AI-powered resume analysis
* 💼 Job description matching
* 🤖 Personalized interview report generation
* 📊 Candidate strengths & weaknesses analysis
* 💡 AI-generated improvement suggestions
* 🔐 Secure JWT authentication
* 📱 Responsive and modern user interface

---

# 🛠 Tech Stack

| Category       | Technologies                           |
| -------------- | -------------------------------------- |
| Frontend       | React, React Router, Axios, SCSS, Vite |
| Backend        | Node.js, Express.js                    |
| Database       | MongoDB, Mongoose                      |
| Authentication | JWT                                    |
| AI             | Google Gemini API                      |
| Resume Parsing | pdf-parse                              |
| File Upload    | Multer                                 |
| Environment    | dotenv                                 |

---

# 🏗️ System Architecture

```text
                 +----------------------+
                 |     React Client     |
                 +----------+-----------+
                            |
                     REST API Requests
                            |
                            ▼
                 +----------------------+
                 |   Express Backend    |
                 +----------+-----------+
                            |
            +---------------+----------------+
            |                                |
            ▼                                ▼
      Google Gemini AI                 MongoDB Database
            |
            ▼
  AI Interview Report Generation
```

---

# 📂 Project Structure

```text
InterviewIQ
│
├── Frontend
│   ├── public
│   └── src
│       ├── assets
│       ├── features
│       │   ├── auth
│       │   └── interview
│       ├── routes
│       ├── style
│       ├── App.jsx
│       └── main.jsx
│
├── Backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   └── utils
│
└── README.md
```

---

## 🧩 Frontend Architecture

The frontend follows a **feature-based architecture**, where each feature encapsulates its own:

* Components
* Pages
* Hooks
* Services
* Context
* Styles

This modular approach improves scalability, maintainability, and separation of concerns, making it easier to extend the application with new features.

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/justpiyushi/InterviewIQ.git

cd InterviewIQ
```

---

## Backend Setup

```bash
cd Backend

npm install
```

Create a `.env` file:

```env
PORT=4000

MONGO_URI=your_mongodb_uri

DB_NAME=your_db_name

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

```

Start the backend server:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd Frontend

npm install
```

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5173
```

Run the frontend:

```bash
npm run dev
```

---

# 🚀 Usage

1. Register or Login
2. Upload your resume (PDF)
3. Enter the target job description
4. Generate the AI interview report
5. Review strengths, weaknesses, and suggestions
6. Improve your interview preparation

---

# 🔮 Future Improvements

* 🎤 AI Voice Interview Simulation
* 🎥 Live Video Interview Practice
* 📄 ATS Resume Scoring
* 🧠 Company-specific Interview Questions
* 📊 Interview Performance Analytics
* 🌍 Multi-language Support
* 📥 Export Reports as PDF
* 📝 Interview History Dashboard

---

# 🤝 Contributing

Contributions are welcome!

```bash
# Fork the repository

# Create a new branch
git checkout -b feature-name

# Commit changes
git commit -m "Add new feature"

# Push changes
git push origin feature-name
```

Finally, open a Pull Request.

---

# 👨‍💻 Author

**Piyush Kumar**

GitHub: https://github.com/justpiyushi

---

# ⭐ Show Your Support

If you found this project useful, consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates future development.

---

## 📜 License

This project is licensed under the MIT License.
