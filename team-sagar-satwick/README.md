# Team Sagar & Satwick — Student Team Members Management Application

> **Course:** 21CSS301T — Full Stack Development  
> **Assessment:** CLAT-2 (Online Assessment)  
> **Date:** 21-04-2025 to 24-04-2025  
> **Team Members:** Sagar Raj (RA2311056010314) & Satwick (RA2311056010332)  
> **Institution:** SRM Institute of Science and Technology, Kattankulathur

---

## Project Description

A full-stack web application to manage student team members. Users can add members with profile photos, view all members, and see detailed information for each member. Built with React.js on the frontend and Node.js + Express + MongoDB on the backend.

<img width="1907" height="747" alt="image" src="https://github.com/user-attachments/assets/f87d3e11-77fa-49d1-8740-af37e149ad5c" />
<img width="1910" height="588" alt="image" src="https://github.com/user-attachments/assets/d7abe0f4-004f-4f06-81d3-cf57dd27226e" />
<img width="1906" height="647" alt="image" src="https://github.com/user-attachments/assets/7246f162-5608-4169-b0b1-65627df71915" />


---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React.js 18, React Router v6, Axios |
| Backend    | Node.js, Express.js               |
| Database   | MongoDB with Mongoose ODM         |
| File Upload| Multer                            |
| Styling    | Custom CSS                        |
| Dev Tool   | Nodemon                           |

---

## Project Structure

```
team-sagar-satwick/
├── backend/
│   ├── models/
│   │   └── Member.js          ← MongoDB schema
│   ├── routes/
│   │   └── members.js         ← API routes (GET, POST, DELETE)
│   ├── uploads/               ← Uploaded profile images
│   ├── server.js              ← Express server entry point
│   ├── .env                   ← Environment variables
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js      ← Navigation bar
│   │   ├── pages/
│   │   │   ├── Home.js        ← Landing page (10 marks)
│   │   │   ├── AddMember.js   ← Add member form (10 marks)
│   │   │   ├── ViewMembers.js ← Members list (5 marks)
│   │   │   └── MemberDetails.js ← Single member (5 marks)
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.js             ← Routes defined here
│   │   └── index.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Installation & Setup

### Prerequisites
- Node.js (v16 or above) — https://nodejs.org
- MongoDB (local) — https://www.mongodb.com/try/download/community
- Git — https://git-scm.com

### Step 1 — Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/team-sagar-satwick.git
cd team-sagar-satwick
```

### Step 2 — Setup Backend
```bash
cd backend
npm install
```

Create `.env` file in the backend folder:
```env
MONGO_URI=mongodb://localhost:27017/team_sagar_satwick
PORT=5000
CLIENT_URL=http://localhost:3000
```

### Step 3 — Setup Frontend
```bash
cd ../frontend
npm install
```

### Step 4 — Start MongoDB
```bash
# Windows (run as Admin)
net start MongoDB

# macOS
brew services start mongodb-community
```

### Step 5 — Run the Application

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```
You should see:
```
✅ MongoDB Connected — team_sagar_satwick database
🚀 Server running on http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm start
```
Browser opens at **http://localhost:3000**

---

## API Endpoints

| Method | Endpoint            | Description                          | Auth |
|--------|---------------------|--------------------------------------|------|
| POST   | /api/members        | Add a new team member (with image)   | No   |
| GET    | /api/members        | Get all team members                 | No   |
| GET    | /api/members/:id    | Get a single member by ID            | No   |
| DELETE | /api/members/:id    | Delete a member by ID                | No   |

### Test in Browser (GET requests)
- All members: http://localhost:5000/api/members
- Single member: http://localhost:5000/api/members/MEMBER_ID

### Test POST with Postman
- URL: `POST http://localhost:5000/api/members`
- Body: `form-data`
  - `name` → Sagar Raj
  - `role` → Full Stack Developer
  - `email` → sagar@srm.edu.in
  - `phone` → 9876543210
  - `department` → Computer Science & Engineering
  - `bio` → Student at SRM
  - `image` → (select a file)

---

## Pages Overview

| Page           | Route          | Marks | Description                              |
|----------------|----------------|-------|------------------------------------------|
| Home           | `/`            | 10    | Landing page with team intro & nav links |
| Add Member     | `/add`         | 10    | Form with image upload, validation       |
| View Members   | `/members`     | 5     | Cards grid with search, fetched via GET  |
| Member Details | `/members/:id` | 5     | Full details with JSON API response view |
| API in Browser | Browser URL    | 10    | GET /api/members & GET /api/members/:id  |
| GitHub Repo    | GitHub         | 10    | Public repo with all files & README      |

---

## Member Schema (MongoDB)

```javascript
{
  name:       String  (required),
  role:       String  (required),
  email:      String  (required),
  phone:      String,
  department: String,
  bio:        String,
  image:      String,   // filename saved in uploads/
  createdAt:  Date
}
```

---

## Team Members

| Name      | Register Number    | Role                  |
|-----------|--------------------|-----------------------|
| Sagar Raj | RA2311056010314    | Full Stack Developer  |
| Satwick   | RA2311056010332    | Full Stack Developer  |

---

## Submission

- **GitHub Repository:** [team-sagar-satwick](https://github.com/YOUR_USERNAME/team-sagar-satwick)
- **Deadline:** 1-5-2025, 12:00 PM
- Submit GitHub link via the Google Form shared by the faculty.
