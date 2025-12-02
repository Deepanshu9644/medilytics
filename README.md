🏥 Medilytics — AI-Powered Medicine, Report & Prescription Analyzer

AI-powered healthcare analysis system that analyzes medicines, medical reports, doctor prescriptions, and documents using Google Gemini API.
Fully integrated with a modern frontend + secure backend + document storage.

🔗 Live Demo
🌐 Live Website

👉 medilytics.vercel.app

🚀 Core Features
🔍 1. Medicine Analysis (AI Powered)

Purpose

Dosage

Interactions

Side effects

Warnings

🩺 2. Medical Report Analysis

Blood reports

Pathology

Scans

AI summary + critical markers

📝 3. Prescription Analysis

Handwritten / printed

Extracted medicines

Dosage

Doctor instructions

📄 4. Document Upload & Storage

Upload PDFs, images

Store securely

Re-analyze anytime

🛠 Tech Stack
Backend (Java Spring Boot)

Spring Boot

MySQL

Gemini API

Lombok

File Storage

Maven

Frontend (React / Next.js)

React / Next.js

Tailwind CSS

Axios

File uploader

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
1. Configure database & Gemini key
spring.datasource.url=jdbc:mysql://localhost:3306/medilytics
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update

gemini.api.key=YOUR_GEMINI_API_KEY
file.upload-dir=uploads/

2. Build
mvn clean package -DskipTests



4. Run
java -jar target/Medilytics-0.0.1-SNAPSHOT.jar


Backend:
👉 http://localhost:8080

![Uploading Screenshot 2025-12-02 212656.png…]()


