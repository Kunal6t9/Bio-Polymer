# PolyVision - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js installed
- MongoDB installed and running
- Git (optional)

---

## Step 1: Start MongoDB

```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongod
```

---

## Step 2: Start Backend Server

```bash
cd server
npm install
node server.js
```

You should see:
```
Server is running on port 5001
MongoDB connected successfully.
```

---

## Step 3: Start Frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

You should see:
```
VITE ready in XXX ms
Local: http://localhost:5173/
```

---

## Step 4: Open Browser

Navigate to: `http://localhost:5173/`

---

## Step 5: Create Admin User

1. Click "Register" (or go to `/register`)
2. Fill in:
   - Name: Admin User
   - Email: admin@polyvision.com
   - Password: admin123
   - Role: Guest (we'll change this)
3. Click "Create Account"

4. Open MongoDB and update role:
```bash
mongosh
use polymer
db.users.updateOne(
  { email: "admin@polyvision.com" },
  { $set: { role: "admin" } }
)
```

5. Logout and login again

---

## Step 6: Create Test Contributor

1. Register another user:
   - Name: John Contributor
   - Email: contributor@polyvision.com
   - Password: contrib123
   - Role: Contributor

---

## Step 7: Add Sample Polymer (as Admin)

1. Login as admin
2. Go to Admin Dashboard
3. Click "+ Add New Polymer"
4. Fill in:
   - Name: Polyethylene Terephthalate
   - Abbreviation: PET
   - Type: Non-Biodegradable
   - Common Uses: Bottles, Packaging, Textiles
   - Degradation Times: 
     ```json
     {"Ocean": "450 years", "Landfill": "500 years", "Industrial Compost": "Not applicable", "Soil": "1000 years"}
     ```
   - Notes: Commonly used in beverage bottles and food packaging.
5. Click "Create Polymer"

---

## Step 8: Test the Simulator

1. Go to Simulator page
2. Select "Polyethylene Terephthalate (PET)"
3. Choose "Ocean" environment
4. Adjust parameters:
   - Temperature: 30°C
   - pH: 8.5
   - Moisture: 100%
5. Click "🧪 Run Simulation"
6. See adjusted degradation time!

---

## Step 9: Test Contributor Workflow

1. Logout and login as contributor
2. Go to Contributor Dashboard
3. Click "Submit New Polymer"
4. Fill in polymer details
5. Submit
6. See "Pending" status

7. Logout and login as admin
8. Go to Admin Dashboard
9. Click "Pending Submissions" tab
10. Click "Review" on the submission
11. Add review notes
12. Click "Approve & Publish"
13. Polymer is now in database!

---

## 🎉 You're All Set!

### What to Explore:

**As Guest:**
- Browse polymers in Explorer
- Compare multiple polymers
- View polymer details
- Use basic simulator

**As Contributor:**
- Submit new polymer data
- Track submission status
- View review feedback

**As Admin:**
- Manage polymer database
- Review pending submissions
- Approve/reject with notes
- Full CRUD operations

---

## 📁 Project Structure

```
polyvision/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Auth context
│   │   └── main.jsx       # Entry point
│   └── package.json
│
├── server/                # Node.js backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Auth middleware
│   └── server.js         # Entry point
│
└── Documentation files
```

---

## 🔧 Common Issues

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution:** Make sure MongoDB is running

### Port Already in Use
```
Error: Port 5001 is already in use
```
**Solution:** Kill the process or change port in `.env`

### CORS Error
```
Access to XMLHttpRequest blocked by CORS
```
**Solution:** Make sure backend is running on port 5001

---

## 📚 Key URLs

- Frontend: `http://localhost:5173/`
- Backend API: `http://localhost:5001/`
- MongoDB: `mongodb://localhost:27017/polymer`

---

## 🎓 For Presentation

### Demo Flow:
1. Show homepage (explain problem statement)
2. Browse polymers (show database)
3. Compare 2-3 polymers (show comparison)
4. Use simulator with parameters (THE STAR FEATURE!)
5. Login as contributor (show submission)
6. Login as admin (show moderation)
7. Approve submission (show workflow)

### Key Points to Mention:
- Multi-role authentication
- Parameter-driven simulation
- Mathematical degradation model
- Moderation workflow
- MERN stack implementation
- RESTful API design

---

## 📞 Need Help?

Check these files:
- `IMPLEMENTATION_COMPLETE.md` - Phase 1 details
- `PHASE2_COMPLETE.md` - Phase 2 details
- Code comments in files

---

**Happy Coding!** 🚀
