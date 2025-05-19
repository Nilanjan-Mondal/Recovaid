<div align=center>

# Recovaid - Surgery Recovery Monitoring System

A **fullstack health monitoring web app** for post-surgical recovery, enabling real-time tracking, doctor-patient interaction, symptom monitoring, and AI-powered alerts for critical cases.

</div>


>  **Currently in development: Backend (Node.js + Express + MongoDB)**  
>  **Frontend (React) coming soon**

---

##  Project Overview

This system connects **patients** and **doctors** to manage post-surgical recovery efficiently. Patients can report daily health updates, which are analyzed for symptom severity. Doctors can respond and prioritize critical cases.

---
>[!NOTE]
>##  Features
>###  For Doctors
>- Sign up and log in
>- View daily patient status reports
>- See most critical cases first
>- Add comments or instructions to patient logs
>- Get alerted for critical symptoms
>###  For Patients
>- Sign up and log in
>- Select surgery type and assigned doctor
>- Receive daily email reminders to submit status
>- Submit symptoms and optional image daily
>- AI summarizes symptoms for the doctor
>- View charts showing recovery over time
>- Get feedback from doctors

---

## Tech Stack

| Layer     | Technology                     |
|-----------|--------------------------------|
| Frontend  | React (Planned)                |
| Backend   | Node.js, Express               |
| Database  | MongoDB + Mongoose             |
| Auth      | JWT or Sessions (Planned)      |
| Email     | Nodemailer (Planned)           |
| AI Logic  | Custom criticality detection (Planned) |

---

## Folder Structure (Backend)

```bash
.
├── controllers/       # Request handlers (e.g., userController.js)
├── services/          # Business logic layer
├── repository/        # DB interaction layer
├── models/            # Mongoose schemas
├── routes/            # Express route handlers
├── utils/             # Helpers and validations
├── index.js           # App entry point
├── .env               # Environment config
├── package.json       # Project metadata
