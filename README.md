# Chattify 💬

A modern real-time chat application with custom JWT authentication, powered by a robust tech stack.

**🌐 Deployed Link:** [https://chattify-oojz7.sevalla.app/](https://chattify-oojz7.sevalla.app/)

---

## ✨ Features

- 🔐 **Custom JWT Authentication**: Secure user authentication without third-party services
- ⚡ **Real-time Messaging**: Instant messaging powered by Socket.io
- 🟢 **Online/Offline Presence Indicators**: Real-time user status updates
- 🔔 **Notification & Typing Sounds**: Audio feedback with toggle functionality
- 📨 **Welcome Emails on Signup**: Automated emails sent via Resend
- 🗂️ **Image Uploads**: Seamless image uploads using Cloudinary
- 🧰 **REST API**: Built with Node.js and Express for efficient communication
- 🧱 **MongoDB**: Persistent data storage for users and messages
- 🚦 **API Rate-Limiting**: Powered by Arcjet for secure API usage
- 🎨 **Beautiful UI**: Crafted with React, Tailwind CSS, and DaisyUI
- 🧠 **State Management**: Managed with Zustand for efficient client-side state handling
- 🧑‍💻 **Git & GitHub Workflow**: Organized development with branches, PRs, and merges

---

## 🛠️ Tech Stack

### Frontend
- **React** - Component-based UI library
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS components
- **Zustand** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **Socket.io** - Real-time bidirectional event-based communication

### Database & Services
- **MongoDB** - NoSQL database
- **Cloudinary** - Image and video management
- **Resend** - Email delivery service
- **Arcjet** - Rate limiting and security

### Authentication & Security
- **Custom JWT** - JSON Web Tokens for authentication
- **Rate Limiting** - API protection

### Version Control
- **Git & GitHub** - Version control and collaboration

---

## 🚀 Setup Instructions

### Prerequisites

Make sure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account
- Resend account
- Arcjet account

### Environment Variables

Create a `.env` file in the `/backend` directory with the following variables:

```env
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
```

### Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm run dev
   ```

### Running the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

---

## 📱 Usage

1. Open your browser and navigate to `http://localhost:5173` (or the deployed link)
2. Sign up to create an account and receive a welcome email
3. Log in to start chatting, upload images, and experience real-time messaging with presence indicators and notification sounds

---

## 🎯 Key Functionalities

### Authentication
- Secure signup and login with JWT tokens
- Email verification on registration
- Protected routes and API endpoints

### Real-time Communication
- Instant messaging with Socket.io
- Online/offline status indicators
- Typing indicators
- Message delivery status

### Media & Files
- Image upload and sharing via Cloudinary
- File preview and download

### User Experience
- Responsive design for all devices
- Sound notifications with toggle option
- Beautiful UI with smooth animations
- Efficient state management

### Security & Performance
- Rate limiting to prevent abuse
- Input validation and sanitization
- Optimized API calls
- Secure file handling

---

## 🔧 Development Workflow

- **Branching Strategy**: Feature branches with pull requests
- **Code Review**: Peer review before merging
- **Version Control**: Git with meaningful commit messages
- **Deployment**: Continuous deployment pipeline
