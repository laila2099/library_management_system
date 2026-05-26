# 📚 Library Management System (Backend API)

A Node.js + Express + MongoDB backend system for managing a library including users, materials, loans, reservations, and reviews with automated business rules and cron jobs.

## 🚀 Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- dotenv
- JavaScript (ES6)

## 📁 Project Structure
config/ db.js  
controllers/ basic.controller.js loan.controller.js reservation.controller.js review.controller.js  
models/ User.model.js Material.model.js Loan.model.js Reservation.model.js Review.model.js  
routes/ api.routes.js  
utils/ cron.js reservation.cron.js  
app.js  
.env  

## 🧑‍💻 System Overview
The system manages a library where users can borrow and return materials, reserve unavailable materials, write reviews, track overdue loans automatically, and clean expired reservations automatically.

## 👥 User Roles
- Member → borrows materials, writes reviews, makes reservations  
- Librarian → records loans and manages materials  
- Manager → full system access  

## 📦 Main Collections
User, Material, Loan, Reservation, Review  

## 🔗 API Endpoints

Users:
POST /api/v1/users → Create user  
GET /api/v1/users → Get all users  
PUT /api/v1/users/:id → Update user  

Materials:
POST /api/v1/materials → Add material  
GET /api/v1/materials → Get all materials  
PUT /api/v1/materials/:id → Update material  

Loans:
POST /api/v1/loans → Borrow material  
GET /api/v1/loans → Get all loans  
PUT /api/v1/loans/:id/return → Return material  

Reservations:
POST /api/v1/reservations → Reserve material  
GET /api/v1/reservations → Get all reservations  

Reviews:
POST /api/v1/reviews → Add review  
GET /api/v1/reviews → Get all reviews  

## ⚙️ Business Rules
- Cannot borrow same material twice (active loan check)  
- Borrow only if availableCopies > 0  
- Reserve only if material is unavailable  
- One review per user per material  
- Returning a loan increases availableCopies  
- Overdue loans are updated automatically  
- Expired reservations are deleted automatically  

## ⏱️ Cron Jobs
Loan overdue updater:
Loan.updateMany({ status: "active", dueDate: { $lt: now } }, { $set: { status: "overdue" } })  

Reservation cleanup:
Reservation.deleteMany({ autoCancelAfter: { $lt: now } })  

Both run every hour.

## 🔐 Environment Variables
PORT=3000  
MONGODB_URI=your_mongodb_connection_string  

⚠️ Never expose MongoDB URI in production.

## ▶️ How to Run
npm install  
node app.js  

Server runs on: http://localhost:3000  

## 👨‍💻 Author
Built as a backend project for Library Management System using Node.js + MongoDB.