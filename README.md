🏥 Medilytics — AI-Powered Medicine, Report & Prescription Analyzer

AI-powered healthcare system that analyzes medicines, lab reports, prescriptions, and documents using Google Gemini API.
Fully integrated with a modern frontend, secure backend, and document storage.

🔗 Live Demo

🌐 Live Website:
👉 https://medilytics.vercel.app

🚀 Features
📁 Upload & Manage Medical Documents

Upload lab reports, prescriptions, and more

View titles, dates, and descriptions

🧠 AI-Powered Report Analysis

Extracts and analyzes key health indicators from PDFs

Suggests possible health issues & recommended specialists

Powered by OpenAI / Gemini API

💊 Medicine & Prescription Analysis

Reads prescriptions and extracts medicine information

Explains usage, purpose, and dosage meaning

🌐 User Dashboard

Fully responsive UI

Built with React + Tailwind CSS

Interactive views & animations

🛠️ Tech Stack
Frontend

- React.js

- Tailwind CSS

- Framer Motion

- Axios

Backend

Spring Boot

REST APIs

MySQL

Gemini / OpenAI Integration

Other Tools

Apache PDFBox

Tesseract OCR

JWT Authentication

Git & GitHub Version Control

File Uploader

📁 Folder Structure
Medilytics/
│
├── Backend/
│   ├── controller/
│   ├── service/
│   ├── model/
│   ├── repository/
│   ├── config/
│   ├── storage/
│   ├── resources/application.properties
│   └── pom.xml
│
└── Frontend/
    ├── src/
    ├── public/
    └── package.json

⚙️ Backend Setup
1. Configure Database & Gemini Key
spring.datasource.url=jdbc:mysql://localhost:3306/medilytics
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update

gemini.api.key=YOUR_GEMINI_API_KEY
file.upload-dir=uploads/

2. Build
mvn clean package -DskipTests

3. Run Backend
java -jar target/Medilytics-0.0.1-SNAPSHOT.jar


Backend URL:
👉 http://localhost:8080
