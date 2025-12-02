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

5. Screenshots

   ![Cover Page](https://github.com/user-attachments/assets/4001d228-f825-44c5-b685-fec0e3d767b7)
   ![login Page](https://github.com/user-attachments/assets/9b650b8b-2788-4baa-bbd9-df41b320d17f)
   ![Dashboard](https://github.com/user-attachments/assets/6b72f0a8-cd0a-4066-807a-1a32494a6ddb)
   ![D2](https://github.com/user-attachments/assets/35c4087a-0350-4f32-8f74-28a6fde218d0)
   ![Medicine](https://github.com/user-attachments/assets/03bab686-da29-4d50-9d1e-8857d0bb12bc)
   ![Report](https://github.com/user-attachments/assets/bb59bbee-6b1a-45ec-a43f-cf88b5cc09be)
   ![R2](https://github.com/user-attachments/assets/cfc9fff3-dea6-48f4-bb91-3c5c8321c2e5)
   ![R3](https://github.com/user-attachments/assets/fd361c49-565c-4a1f-a70d-236e4bdc33f5)
   ![recent](https://github.com/user-attachments/assets/37b99c78-adbc-4dfc-ba49-3359db170e22)
   ![upload](https://github.com/user-attachments/assets/62897258-f74f-4499-b03a-a0f3dce8f9f4)


