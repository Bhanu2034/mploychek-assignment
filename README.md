# MPloyChek - Background Verification SPA

A full-stack Single Page Application built as part of the Software Intern 
code challenge for MPloyChek (NSQTech Private Limited).

## Tech Stack

**Frontend:** Angular 12, TypeScript, SCSS, Reactive Forms, RxJS  
**Backend:** Node.js, TypeScript, Express.js, JWT Authentication

## Features

### Authentication
- Login with User ID, Password and Role selection (General User / Admin)
- JWT-based authentication with 8-hour token expiry
- Route guards protecting all authenticated pages
- HTTP Interceptor to auto-attach token to all API requests

### General User Dashboard
- User profile card showing name, email, role and member details
- Role-filtered records table (users see only their own records)
- Configurable API delay parameter to demonstrate async processing
- Animated loading indicator during API calls

### Admin Panel
- Full user management — Create, Read, Update, Delete users
- View all verification records across all users
- Role-based access control (Admin menu hidden from General Users)

## Project Structure

mploychek-assignment/
├── mploychek-frontend/     # Angular 12 SPA
│   ├── src/app/
│   │   ├── components/     # login, dashboard, admin, navbar
│   │   ├── services/       # auth, user, records
│   │   ├── guards/         # auth, admin route guards
│   │   └── interceptors/   # JWT auth interceptor
└── mploychek-backend/      # Node.js + TypeScript REST API
    └── src/
        ├── routes/         # auth, users, records
        ├── middleware/      # JWT verification
        └── data/           # in-memory store with dummy data

## Setup & Running

### Backend
cd mploychek-backend
npm install
npm run dev
# Runs on http://localhost:3000

### Frontend
cd mploychek-frontend
npm install
$env:NODE_OPTIONS="--openssl-legacy-provider"
ng serve
# Runs on http://localhost:4200

## Demo Credentials

| Role         | User ID  | Password  |
|--------------|----------|-----------|
| Admin        | admin01  | admin123  |
| General User | user01   | user123   |
| General User | user02   | user123   |

## API Endpoints

| Method | Endpoint              | Description                    | Auth     |
|--------|-----------------------|--------------------------------|----------|
| POST   | /api/auth/login       | Login and get JWT token        | None     |
| GET    | /api/records?delay=N  | Get role-filtered records      | Required |
| GET    | /api/users            | Get all users                  | Admin    |
| POST   | /api/users            | Create new user                | Admin    |
| PUT    | /api/users/:id        | Update user                    | Admin    |
| DELETE | /api/users/:id        | Delete user                    | Admin    |
```



