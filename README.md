# Inventory Management System

Live Demo:
👉 https://inventory-bup2vtpw3-noraphutbuathong18s-projects.vercel.app

## Default Login
Username: admin  
Password: admin123

Full-stack admin panel for product inventory management.

## Tech Stack
- **Frontend**: React 18 + Vite + CSS
- **Backend**: Node.js + Express
- **Database**: MySQL
- **Auth**: JWT + bcryptjs

## Deployment
- Frontend: Vercel
- Backend: Render
- Database: MySQL

## Project Structure
```
Inventory Management System/
├── backend/          # Node.js + Express API
│   ├── config/       # DB connection
│   ├── controllers/  # Auth + Product logic
│   ├── middleware/   # JWT auth middleware
│   ├── routes/       # API routes
│   ├── database/     # schema.sql + seed data
│   ├── .env          # environment variables
│   └── server.js
└── frontend/         # React + Vite app
    └── src/
        ├── components/
        ├── context/
        ├── pages/
        └── services/
```

## Setup Instructions

### Step 1 — MongoDB Atlas
```bash
# Create a MongoDB Atlas cluster and copy your connection string
```

### Step 2 — Backend
```bash
cd backend
npm install
# Edit .env and set your MySQL password in DB_PASSWORD
npm run dev
# API running at http://localhost:5000
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
```

### Step 3 — Frontend
```bash
cd frontend
npm install
npm run dev
# App running at http://localhost:5173
```
### Deployment Architecture
User (Browser)
     ↓
Vercel (React Frontend)
     ↓
Render (Express API)
     ↓
MongoDB Atlas (Database)

## Default Login
| Field    | Value         |
|----------|---------------|
| Username | `admin`       |
| Password | `admin123`    |

## API Endpoints
| Method | Endpoint                  | Auth | Description         |
|--------|---------------------------|------|---------------------|
| POST   | `/api/auth/login`         | No   | Login               |
| GET    | `/api/products`           | Yes  | List/Search         |
| POST   | `/api/products`           | Yes  | Create product      |
| PUT    | `/api/products/:id`       | Yes  | Update product      |
| DELETE | `/api/products/:id`       | Yes  | Delete product      |
| GET    | `/api/products/stats`     | Yes  | Dashboard stats     |

## Features
- ✅ JWT Authentication (Login / Logout)
- ✅ Product CRUD (Add / Edit / Delete)
- ✅ Search by name, description, SKU
- ✅ Filter by category
- ✅ Pagination
- ✅ Dashboard stats cards
- ✅ Low-stock indicators
- ✅ Responsive design (mobile + desktop)
- ✅ Toast notifications