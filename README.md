

## 📌 Project Overview
This project is a **Discussion Board Web Application** where users can:
- **Sign Up & Log In** using authentication mechanisms.
- **Secure Authentication** using JWT tokens and cookies.
- **Post Comments**, Edit, Delete, and Like other users' posts.
- **Responsive UI** built with Bootstrap.
- **Frontend** developed with EJS (Embedded JavaScript).
- **Backend** powered by Express.js.

---

## 🚀 Tech Stack
- **Frontend:** EJS, Bootstrap
- **Backend:** Express.js
- **Authentication:** JWT & Cookies
- **Database:** MongoDB

---

## 📂 Project Setup
Follow these steps to set up and run the project:

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/shivu1123/lab-2-aWEbappication-.git
cd lab-2-aWEbappication-
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Create a .env File**
```sh
touch .env
```
Add the following environment variables:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### **4️⃣ Start the Server**
```sh
npm start
```

> The app will be running at **http://localhost:3000**

---

## 🔑 Authentication Workflow
1. **User Signup/Login:**
   - Secure authentication with JWT & Cookies.
   - Password hashing for security.

2. **JWT Token Handling:**
   - After login, a JWT token is stored in cookies.
   - Every request is authenticated using this token.

---

## 🎯 Features
✅ User Signup & Login with JWT authentication  
✅ Secure Sessions using Cookies  
✅ Create, Edit, and Delete Posts  
✅ Like Other Users' Posts  
✅ Responsive Design with Bootstrap  
✅ Backend API built with Express.js  

---

## 📌 API Endpoints
| Method | Endpoint          | Description |
|--------|------------------|-------------|
| POST   | /signup          | User registration |
| POST   | /login           | User login |
| GET    | /dashboard       | Get all posts |
| POST   | /post            | Create a new post |
| PUT    | /post/:id        | Edit a post |
| DELETE | /post/:id        | Delete a post |
| POST   | /post/:id/like   | Like a post |

---

## 💡 Future Enhancements
- Adding **user profile management**.
- Implementing **real-time notifications**.
- Integrating **MongoDB** for better data storage.

---

## 🤝 Contributing
Feel free to contribute by creating **pull requests** or reporting **issues**!

---

## 📜 License
This project is licensed under the **MIT License**.

---

