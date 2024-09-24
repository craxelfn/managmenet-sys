const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require('dotenv').config();
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors"); 
const userRoute = require("./Routes/users");
const authRoute = require("./Routes/auth");
const conversationRoute = require("./Routes/conversations");
const messageRoute = require("./Routes/messages");
const adminspaceRoute = require("./Routes/adminspace");
const mytasks = require("./Routes/mytasks");
const teamtask = require("./Routes/teamtask");
const path = require("path");
const requireAuth = require('./middleware/requireauth');
const authorize = require('./middleware/authorizationMiddleware'); 
const reportRoutes = require('./Routes/report');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Middleware
app.use(cors()); 
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use("/api/auth", authRoute);
app.use("/api/users",requireAuth, userRoute);
app.use("/api/conversations",requireAuth,  conversationRoute);
app.use("/api/messages", requireAuth , messageRoute);
app.use("/api/admin-space",requireAuth , adminspaceRoute);
app.use("/api/teamtask", requireAuth,teamtask );
app.use("/api/mytasks", requireAuth, mytasks);
app.use('/api/reports', reportRoutes);
app.use('api/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(8000, () => {
  console.log("Backend server is running!");
});