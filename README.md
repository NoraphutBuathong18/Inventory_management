# Inventory Management System

Full-stack admin panel for product inventory management.

## Tech Stack
- **Frontend**: React 18 + Vite + CSS
- **Backend**: Node.js + Express
- **Database**: MySQL
- **Auth**: JWT + bcryptjs

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

### Step 1 — MySQL Database
Open MySQL Workbench or MySQL CLI and run:
```sql
CREATE DATABASE inventory_db;
USE inventory_db;
SOURCE path/to/backend/database/schema.sql;
```

### Step 2 — Backend
```bash
cd backend
npm install
# Edit .env and set your MySQL password in DB_PASSWORD
npm run dev
# API running at http://localhost:5000
```

### Step 3 — Frontend
```bash
cd frontend
npm install
npm run dev
# App running at http://localhost:5173
```

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
