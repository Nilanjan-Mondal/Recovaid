<div align="center">

![github](https://img.shields.io/badge/GitHub-181717.svg?style=for-the-badge&logo=GitHub&logoColor=white)
![markdown](https://img.shields.io/badge/Markdown-181717.svg?style=for-the-badge&logo=Markdown&logoColor=white)
![vercel](https://img.shields.io/badge/Vercel-181717?style=for-the-badge&logo=vercel&logoColor=white)

# Recovaid – Surgery Recovery Monitoring System
A **fullstack health monitoring web app** for post-surgical recovery, enabling real-time tracking, doctor-patient interaction, symptom monitoring, and AI-powered alerts for critical cases.

</div>

---

##  Project Overview

This system connects **patients** and **doctors** to manage post-surgical recovery efficiently. Patients can report daily health updates, which are analyzed for symptom severity. Doctors can respond and prioritize critical cases.

---

>[!NOTE]
>## Features
>### 👨‍⚕️ For Doctors
>- Secure sign-up/login  
>- View patients' daily health reports  
>- Prioritized list of critical cases  
>- Comment on patient logs and suggest actions  
>- Get immediate alerts via email for high-risk symptoms  
>
>### 🧑‍💻 For Patients
>- Secure sign-up/login  
>- Select surgery type and assigned doctor    
>- Submit symptoms and optional image  
>- Get AI summaries of symptoms for easy doctor review  
>- Visual recovery progress charts  
>- Receive direct feedback from doctors  

---

<div align="center">

| Layer      | Tech Used |
|------------|-----------|
|Frontend|![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)|
|Backend|![Node.js](https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)|
|Database|![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logoColor=white)|
|Authentication |![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)|
|Email Service |![Nodemailer](https://img.shields.io/badge/Nodemailer-EA4335?style=for-the-badge&logo=maildotru&logoColor=white)|
|AI Logic |![Gemini](https://img.shields.io/badge/Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)|

</div>

---

## Directory Structure

```bash


Recovaid/
│
├── client/
│   ├── public/                   # Static assets
│   ├── src/                      # React source files
│   │   ├── assets/               # Images, fonts, etc.
│   │   ├── configs/              # config file for environment vars
│   │   ├── components/           # Reusable UI components
│   │   ├── pages/                # Page-level components
│   │   ├── App.js
│   │   └── index.js
│   │
│   ├── .env                      # Environment variables
│   ├── package.json              # client meta data
│   ├── package-lock.json         # dependency tree
│   ├── eslint.config.js        
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── vercel.json               # Vercel deployment config
│
│
├── server/                       # Express backend
│   ├── src/
│   │   ├── configs/              # Config file for environment vars
│   │   ├── controllers/          # Route controllers (handle req/res)
│   │   ├── services/             # Business logic layer
│   │   ├── repositories/         # Data access logic (DB queries)
│   │   ├── validations/          # JOI / custom validation logic
│   │   ├── schemas/              # Mongoose schemas/models
│   │   ├── routes/               # Route definitions
│   │   ├── utils/                # Misc utilities (e.g., nodemailer)
│   │   └── index.js              # App entry point
│   │
│   ├── .env                      # Environment variables
│   ├── package.json              # Server meta data
│   ├── package-lock.json         # dependency tree
│   └── vercel.json               # Vercel deployment config
│
│
├── README.md                     # Project documentation
└── LICENSE                       # License file

```
---
<br>
<p align="center"><a href="https://github.com/Nilanjan-Mondal/Recovaid/blob/main/LICENSE"><img src="https://img.shields.io/static/v1.svg?style=for-the-badge&label=License&message=BSD&logoColor=d9e0ee&colorA=363a4f&colorB=b7bdf8"/></a></p>
