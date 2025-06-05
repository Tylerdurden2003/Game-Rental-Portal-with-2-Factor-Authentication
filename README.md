
# 🎮 Game Rental Portal (MERN Stack + 2FA)

A full-stack web application where users can register, browse games, add them to a cart, and rent them based on hourly, daily, or monthly plans. It includes secure login and **email-based Two-Factor Authentication (2FA)** using OTP for added security.

---

## 🚀 Features

- ✅ User Registration & Login (bcrypt + JWT)
- 🔐 Two-Factor Authentication (2FA) via Email OTP
- 🎮 Browse Game Listings with Details
- 🛒 Add to Cart & Checkout System
- 📅 Rental Options: Hourly, Daily, Monthly
- 📦 RESTful APIs with Node.js & Express
- 🌐 Responsive React Frontend (Tailwind CSS)
- 📧 Email notifications via Nodemailer

---

## 🛠️ Tech Stack

| Frontend        | Backend            | Database  | Auth & Security |
|----------------|--------------------|-----------|-----------------|
| React (Vite)   | Node.js + Express  | MongoDB   | JWT, Bcrypt     |
| Tailwind CSS   | RESTful API        | Mongoose  | OTP via Email   |

---

## 📁 Project Structure

```
game-rental-portal/
│
├── client/                 # React Frontend
│   ├── pages/              # All frontend pages
│   └── components/         # Navbar, Cards, etc.
│
├── server/                 # Express Backend
│   ├── controllers/        # Auth and game controllers
│   ├── routes/             # API route definitions
│   ├── models/             # MongoDB models
│   └── .env                # Environment variables
│
└── README.md               # This file
```

---

## 🔐 How OTP-Based 2FA Works

1. 🔓 User enters email and password → validated via backend.
2. 📩 Backend generates a 6-digit OTP and sends it to user's email via Nodemailer.
3. 🔐 User is redirected to an OTP input screen.
4. ⏱️ OTP is valid for 5 minutes and stored in memory.
5. ✅ On correct entry, user is logged in; otherwise, retry or resend OTP.

---

## 🧪 How to Run Locally

### 1. Clone this Repository

```bash
git clone https://github.com/yourusername/game-rental-portal.git
cd game-rental-portal
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside `/server` directory with the following:

```env
MONGO_URI=mongodb://localhost:27017/gamerental
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
JWT_SECRET=your_super_secret_key
```

Start the backend server:

```bash
npm start
```

### 3. Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

Frontend will run on: `http://localhost:3000`  
Backend runs on: `http://localhost:5000`

---

## 📡 API Endpoints

| Endpoint                        | Method | Description                  |
|---------------------------------|--------|------------------------------|
| `/api/auth/register`           | POST   | Register a new user          |
| `/api/auth/login`              | POST   | Login with email & password  |
| `/api/auth/generateAndSendOtp` | POST   | Send OTP to email            |
| `/api/auth/verifyOtp`          | POST   | Verify the OTP               |
| `/api/games`                   | GET    | Fetch all games              |

---

## ✅ Future Enhancements

- [ ] Admin dashboard for managing game catalog
- [ ] Persistent OTP storage in MongoDB
- [ ] Payment gateway (Stripe or Razorpay)
- [ ] Email confirmation + SMS-based OTP
- [ ] Game reviews and user ratings

---

## 👨‍💻 Built By

**Abhinav Gopal P**  

---

## 🧾 License

This project is licensed under the MIT License.
