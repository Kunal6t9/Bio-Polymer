require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// CORS - allow frontend origin
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL, // set this in Render env vars
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("PolyVision API is running!");
});

// Routes
app.use("/api/polymers", require("./routes/polymer.routes.js"));
app.use("/api/auth", require("./routes/auth.routes.js"));
app.use("/api/submissions", require("./routes/submission.routes.js"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
