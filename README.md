# MERN CRUD

A simple **MERN CRUD** (MongoDB, Express, React, Node.js) project demonstrating fundamental CRUD operations. The frontend is built with **Vite, TailwindCSS, and DaisyUI**, while the backend is built with **Express and MongoDB Atlas**. The project is deployed on **Render**.

---

## 🛠 Tech Stack

### **Frontend:**

- React (Vite)
- Tailwind CSS + DaisyUI
- React Hot Toast (for notifications)

### **Backend:**

- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- Mongoose (ODM)
- CORS & dotenv
- Morgan

### **Deployment:**

- Backend: [Render](https://render.com/)
- Frontend: Render (Static Site) or served from Express
- Database: MongoDB Atlas

---

## 📂 Project Structure

```plaintext
mern-crud/
├── backend/            # Backend (Node.js, Express, MongoDB)
│   ├── config/         # Configuration files (DB, environment, etc.)
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── controllers/    # Route controllers
│   ├── middlewares/    # Custom middlewares (auth, error handling, etc.)
│   ├── server.js       # Main server file
├── frontend/           # Frontend (React, Vite, TailwindCSS, DaisyUI)
│   ├── src/            # React components
│   ├── public/         # Static assets
│   ├── index.html      # Main HTML file
│   ├── vite.config.js  # Vite configuration
├── .env                # Environment variables (not committed)
├── .gitignore          # Git ignore file (to exclude .env, node_modules, etc.)
├── package.json        # Dependencies and scripts
├── README.md           # Project documentation
```

---

## 🚀 Getting Started

### 1️⃣ **Clone the Repository**

```bash
git clone https://github.com/your-username/mern-crud.git
cd mern-crud
```

### 2️⃣ **Install Dependencies**

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3️⃣ **Setup Environment Variables**

Create a `.env` file in the **backend** folder and add:

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

---

## 🛠 Development Mode

### **Run Backend & Frontend Separately**

```bash
# Start backend (inside backend/ folder)
npm run dev

# Start frontend (inside frontend/ folder)
npm run dev
```

The backend runs on `http://localhost:5000` and the frontend on `http://localhost:5173`.

---

## 📦 Production Mode

### **Serve Frontend from Backend**

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```
2. **Start the backend (serves frontend as static files)**
   ```bash
   cd backend
   npm run start
   ```
3. The entire app will be available on `http://localhost:5000`.

---

## 🌍 Deployment to Render

### **Backend Deployment**

1. Push code to GitHub.
2. Go to [Render](https://dashboard.render.com/) and create a **Web Service**.
3. Connect the repository and set **Build Command:**
   ```bash
   npm install && npm run build
   ```
4. Set the **Start Command:**
   ```bash
   npm run start
   ```
5. Add **Environment Variables** in Render:
   ```plaintext
   MONGO_URI=your_mongodb_atlas_connection_string
   PORT=10000  # Use Render-assigned port
   ```
6. Deploy and copy the backend URL (e.g., `https://mern-crud-backend.onrender.com`).

### **Frontend Deployment (Static Site on Render)**

1. Go to [Render](https://dashboard.render.com/) and create a **Static Site**.
2. Connect the frontend repo and set **Build Command:**
   ```bash
   npm install && npm run build
   ```
3. Set **Publish Directory:** `frontend/dist`
4. Deploy and copy the frontend URL (e.g., `https://mern-crud.onrender.com`).

### **Alternative: Serve Frontend from Backend**

Modify `server.js` to serve frontend files:

```js
import express from 'express';
import path from 'path';
const app = express();
const __dirname = path.resolve();

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
  });
}
```

---

## 📜 API Endpoints

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| GET    | /api/v1/users     | Get all users     |
| POST   | /api/v1/users     | Create a new user |
| PUT    | /api/v1/users/:id | Update user by ID |
| DELETE | /api/v1/users/:id | Delete user by ID |

---

## 📌 Features

✅ Full CRUD operations (Create, Read, Update, Delete)  
✅ MongoDB Atlas for database  
✅ Tailwind CSS and DaisyUI for styling  
✅ React Hot Toast for notifications  
✅ Render deployment

---

---

## 💡 Credits

Built with ❤️ by [Allester Corton](https://github.com/allestercorton) 🚀
