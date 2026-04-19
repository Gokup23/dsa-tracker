# 📊 DSA Progress Tracker

A full-stack web application to track my Data Structures & Algorithms (DSA) learning journey based on the Striver A2Z DSA Course and SDE Sheet from TakeUForward.

## 🚀 Live Demo
dsa-tracker-blush.vercel.app

---

## 🎯 Project Goal

- Track my DSA progress in a structured way
- Follow a proper learning workflow:
  > Learn → Apply → Analyze → Improve → Revise → Advance
- Make progress **publicly viewable**
- Allow **only me** to update data securely

---

## ✨ Features

- 📚 Topic-wise progress tracking (Arrays, Recursion, Linked List, etc.)
- ✅ Mark lectures as completed
- 🔢 Track number of problems solved
- 📌 Status system:
  - Not Started
  - In Progress
  - Done
- 🔐 Authentication system (login required to edit)
- 🛡️ Row Level Security (RLS) to protect database
- 🌐 Live deployment

---

## 🧱 Tech Stack

### Frontend
- HTML
- CSS
- JavaScript (Vanilla)

### Backend
- Supabase (Database + Auth + RLS)

### Deployment
- Vercel

---

## 🔐 Security

- Public users can **only view** data
- Only authenticated user (me) can:
  - Update progress
- Enforced using **Supabase Row Level Security (RLS)**

---

## 📂 Database Schema

Table: `progress`

| Column          | Type      | Description                |
|----------------|----------|----------------------------|
| id             | int      | Primary key                |
| created_at     | timestamp| Auto-generated             |
| topic          | text     | Topic name                 |
| lectureDone    | boolean  | Lecture completion status  |
| problemsSolved | int      | Number of problems solved  |
| status         | text     | Learning status            |

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/dsa-tracker.git
cd dsa-tracker
