Chattify
A modern real-time chat application with custom JWT authentication, powered by a robust tech stack.
[Deployed Link](https://chattify-oojz7.sevalla.app/)
Features

🔐 Custom JWT Authentication: Secure user authentication without third-party services.
⚡ Real-time Messaging: Instant messaging powered by Socket.io.
🟢 Online/Offline Presence Indicators: Real-time user status updates.
🔔 Notification & Typing Sounds: Audio feedback with toggle functionality.
📨 Welcome Emails on Signup: Automated emails sent via Resend.
🗂️ Image Uploads: Seamless image uploads using Cloudinary.
🧰 REST API: Built with Node.js and Express for efficient communication.
🧱 MongoDB: Persistent data storage for users and messages.
🚦 API Rate-Limiting: Powered by Arcjet for secure API usage.
🎨 Beautiful UI: Crafted with React, Tailwind CSS, and DaisyUI.
🧠 State Management: Managed with Zustand for efficient client-side state handling.
🧑‍💻 Git & GitHub Workflow: Organized development with branches, PRs, and merges.

Tech Stack

Frontend: React, Tailwind CSS, DaisyUI, Zustand
Backend: Node.js, Express, Socket.io
Database: MongoDB
Authentication: Custom JWT
File Storage: Cloudinary
Email Service: Resend
Rate Limiting: Arcjet
Version Control: Git & GitHub

Setup Instructions
Prerequisites

Node.js (v16 or higher)
MongoDB (local or cloud instance)
Cloudinary account
Resend account
Arcjet account

Environment Variables
Create a .env file in the /backend directory with the following variables:
PORT=3000
MONGO_URI=your_mongo_uri_here
NODE_ENV=development
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_email_from_address
EMAIL_FROM_NAME=your_email_from_name
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development

Running the Backend

Navigate to the backend directory:cd backend


Install dependencies:npm install


Start the backend server:npm run dev



Running the Frontend

Navigate to the frontend directory:cd frontend


Install dependencies:npm install


Start the frontend development server:npm run dev



Usage

Open your browser and navigate to http://localhost:5173 (or the deployed link).
Sign up to create an account and receive a welcome email.
Log in to start chatting, upload images, and experience real-time messaging with presence indicators and notification sounds.
