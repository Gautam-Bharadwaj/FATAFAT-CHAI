# FATAFAT CHAI

**Instant Indian Chai – From Click to Cup**

A full-stack e-commerce platform for ordering premium Indian chai online. Built with modern web technologies and deployed on cloud platforms.

FATAFAT CHAI is a **college DevOps project** that demonstrates practical expertise in full-stack development, REST API design, database management, and cloud deployment. The application provides a seamless experience for browsing chai products, managing carts, and processing orders.

---

## Project Overview

**Type:** Full-Stack E-Commerce Application with DevOps Deployment  
**Duration:** College Project  
**Hosting:** Frontend (Vercel) + Backend (Render)

### Key Learning Objectives

- Build a functional, production-ready e-commerce platform
- Design and implement RESTful APIs with proper CRUD operations
- Master database design with SQLite and ORM (Prisma)
- Handle cross-origin requests (CORS) after cloud deployment
- Deploy full-stack applications on real hosting platforms
- Manage environment variables and sensitive data securely
- Implement version control with Git and GitHub

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Vanilla JS, Vite, HTML5, CSS3, Tailwind, GSAP | Animated UI & Interactive Experience |
| **Backend** | Node.js, Express.js, Mongoose | API Server & Business Logic |
| **Database** | MongoDB | Cloud Document Storage |
| **DevOps** | Docker, GitHub Actions, Bash Automation | CI/CD & Infrastructure |
| **Deployment** | Vercel (Frontend), Render (Backend) | Cloud Hosting |

---

## Features

### Customer Features
- **Browse Products** - View all available chai products with descriptions
- **Product Details** - Check detailed information, pricing, and ratings
- **Shopping Cart** - Add/remove items and manage quantities
- **Checkout** - Complete order placement with validation
- **Responsive Design** - Works on desktop, tablet, and mobile

### Admin / Backend Features
- **Product Management** - Full CRUD operations for chai inventory
- **Order Management** - Track and manage customer orders
- **RESTful API** - Well-documented API endpoints for integration
- **Database Operations** - Efficient queries using Prisma ORM
- **Error Handling** - Comprehensive error responses and logging

---

## API Endpoints

### Products CRUD API

| Operation | Method | Endpoint | Description |
|-----------|--------|----------|-------------|
| List All | GET | `/api/products` | Fetch all chai products |
| Get Single | GET | `/api/products/:id` | Get product by ID |
| Create | POST | `/api/products` | Add new product (Admin) |
| Update | PUT | `/api/products/:id` | Update product details |
| Delete | DELETE | `/api/products/:id` | Remove a product |

**All database operations use Prisma ORM with SQLite for data persistence.**

---

## Database Architecture

### Mongoose Schema (User)

```javascript
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  createdAt: { type: Date, default: Date.now }
});
```

---

## Project Structure

```
FATAFAT-CHAI/
│
├── client/                     # React Frontend (Vercel)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.test.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── setupTests.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Node.js Backend (Render)
│   ├── src/
│   │   ├── app.js             # Express configuration
│   │   └── index.js           # Server entry point
│   ├── tests/
│   │   └── app.test.js
│   └── package.json
│
├── .env                        # Environment variables
├── render.yaml                 # Render deployment config
├── Idea.md                     # Project ideation
└── README.md                   # This file
```

---

## Getting Started Locally

### Prerequisites

- Node.js v16+ and npm
- Git
- Code editor (VS Code recommended)

### 1. Clone & Setup

```bash
git clone https://github.com/your-username/FATAFAT-CHAI.git
cd FATAFAT-CHAI
```

### 2. Backend Setup

```bash
cd server
npm install

# Create .env file
echo 'PORT=5001
MONGO_URI=mongodb://localhost:27017/fatafat-chai
NODE_ENV=development' > .env

# Start backend
npm start
# Runs on http://localhost:5001
```

### 3. Frontend Setup

```bash
cd ../client
npm install
npm run dev
# Runs on http://localhost:5173
```

### Verify Everything Works

- Backend API: `http://localhost:5001/api/products`
- Frontend: `http://localhost:5173`
- You should see the chai products loaded!

---

## Production Deployment

### Frontend on Vercel

1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Set build command: `npm run build`
4. Set start command: `npm run dev`
5. Deploy automatically on every push

**Frontend URL:** `https://your-app.vercel.app`

### Backend on Render

1. Create Render account and connect GitHub
2. Create new Web Service
3. Build command: `npm install`
4. Start command: `node src/index.js`
5. Add environment variables in Render dashboard:
   - `DATABASE_URL="file:./dev.db"`
   - `NODE_ENV=production`

**Backend URL:** `https://your-app.onrender.com`

### CORS Configuration

After deployment, update CORS settings in backend:

```javascript
const cors = require("cors");

app.use(cors({
  origin: "https://your-app.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));
```

---

## Testing

### Backend Tests

```bash
cd server
npm test
```

### Frontend Tests

```bash
cd client
npm test
```

---

## Learning Outcomes

This project covers essential full-stack development concepts:

- **REST API Design** - Understanding HTTP methods, status codes, and RESTful principles
- **Database Design** - Schema design, relationships, and data normalization with SQLite
- **ORM Usage** - Type-safe database queries with Prisma
- **React Fundamentals** - Components, hooks, state management, and routing
- **Express.js** - Middleware, routing, error handling, and middleware chaining
- **Authentication Concepts** - Environment variables and secure configuration
- **Cloud Deployment** - Hosting applications on modern platforms
- **CORS & Security** - Cross-origin requests and security best practices
- **Git Workflow** - Version control, branching, and collaboration

---

## Future Enhancements

- User authentication with JWT
- Payment gateway integration (Razorpay/Stripe)
- Order management and tracking
- Product reviews and ratings
- Docker containerization
- CI/CD pipeline with GitHub Actions
- Admin dashboard with analytics
- Email notifications

---

## Developer

**Gautam Kumar Jha**  
Full Stack & DevOps Developer

---

## 🛠️ DevOps & Infrastructure
Is project mein **Fatafat Chai** ki scaling aur deployment ko automate kiya gaya hai.
* **CI/CD:** GitHub Actions / Jenkins
* **Containerization:** Docker & Kubernetes
* **Monitoring:** [Prometheus/Grafana - agar use kiya ho toh]

## ⚖️ License
**Copyright (c) 2026 Gautam Jha.**
This project's automation logic and infrastructure scripts are **Proprietary**. 
Unauthorised use or deployment of this configuration is strictly prohibited. 
For permissions, contact the author.


## New Features
- Interactive Story Journey with Toy Train animation
