# FATAFAT CHAI  
Instant Indian Chai – From Click to Cup

FATAFAT CHAI is a full-stack e-commerce web application developed as a **college DevOps project**, following the given technical instructions strictly.  
The project focuses on building a realistic backend with proper database handling, a clean frontend, and deploying both using modern cloud platforms.

This project demonstrates practical understanding of **REST APIs, database design, ORM usage, deployment, and DevOps fundamentals**.

---

## Project Objectives

- Build a functional e-commerce web application  
- Use SQLite as the database for simplicity and portability  
- Implement Prisma as the ORM layer  
- Create at least one complete CRUD RESTful API  
- Deploy backend and frontend on real hosting platforms  
- Handle CORS issues after deployment  
- Deliver a project suitable for academic evaluation  

---

## Tech Stack

### Frontend
- React.js  
- HTML5  
- CSS3 (plain CSS)  
- JavaScript (ES6)  
- Deployed on Vercel  

### Backend
- Node.js  
- Express.js  
- RESTful APIs  
- Deployed on Render  

### Database
- SQLite3  

### ORM
- Prisma  

### DevOps and Tools
- Git and GitHub  
- Environment variables  
- CORS middleware  

---

## Features

### User Features
- View chai products  
- View product details  
- Add products to cart  
- Basic checkout flow  

### Admin / Backend Features
- Product management using CRUD APIs  
- Database operations handled via Prisma  
- RESTful architecture  

---

## CRUD RESTful API Implementation

At least one **complete CRUD API** is implemented.

### Example: Product API

| Operation | HTTP Method | Endpoint |
|---------|------------|---------|
| Create Product | POST | `/api/products` |
| Read Products | GET | `/api/products` |
| Read Single Product | GET | `/api/products/:id` |
| Update Product | PUT | `/api/products/:id` |
| Delete Product | DELETE | `/api/products/:id` |

All database operations are handled using **Prisma ORM with SQLite**.

---

## Database Setup (SQLite + Prisma)

### Prisma Schema Example
```prisma
model Product {
  id          Int     @id @default(autoincrement())
  name        String
  price       Float
  description String
  createdAt   DateTime @default(now())
}
Prisma Commands
bash
Copy code
npx prisma migrate dev
npx prisma generate
Project Structure
bash
Copy code
FATAFAT-CHAI/
│
├── frontend/              # React frontend (Vercel)
├── backend/               # Node + Express backend (Render)
│   ├── prisma/            # Prisma schema and migrations
│   ├── routes/            # API routes
│   ├── controllers/       # Business logic
│   └── index.js
│
├── .env
└── README.md
Installation and Local Setup
1. Clone the Repository
bash
Copy code
git clone https://github.com/your-username/fatafat-chai.git
cd fatafat-chai
2. Backend Setup
bash
Copy code
cd backend
npm install
Create a .env file:

env
Copy code
PORT=5000
DATABASE_URL="file:./dev.db"
Run Prisma migration:

bash
Copy code
npx prisma migrate dev
Start backend:

bash
Copy code
npm start
3. Frontend Setup
bash
Copy code
cd frontend
npm install
npm start
Deployment Details
Backend Deployment (Render)
Backend is deployed on Render

SQLite database is managed locally through Prisma

Environment variables configured in Render dashboard

Frontend Deployment (Vercel)
React frontend deployed on Vercel

Backend API URL configured using environment variables

CORS Configuration
CORS issues are handled using Express middleware.

Example:

js
Copy code
const cors = require("cors");

app.use(cors({
  origin: "https://your-frontend.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
This ensures smooth communication between frontend (Vercel) and backend (Render).

College Project Information
Project Type: Full Stack with DevOps concepts

Backend Hosting: Render

Frontend Hosting: Vercel

Database: SQLite3

ORM: Prisma

API Style: RESTful

Purpose: Academic submission

Future Enhancements
Authentication and authorization

Payment gateway integration

Order management system

Docker-based deployment

CI/CD pipeline integration

Developer
Name: Kumar Gautam
Role: Full Stack and DevOps Developer

License
This project is developed strictly for educational and academic purposes.

markdown
Copy code

If you want, next I can:
- Align this **exactly with your college rubric**
- Add **API request/response examples**
- Simplify language even more for viva explanation
