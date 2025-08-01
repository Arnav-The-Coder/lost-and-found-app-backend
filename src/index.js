import express from "express";
import cors from "cors";
import "dotenv/config";
import job from "../src/lib/cron.js";

import authRoutes from "./routes/authRoutes.js";
import lostRoutes from "./routes/lostRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

import connectDB from "./lib/db.js";

const app = express();
const PORT = process.env.PORT;

job.start();
app.use(cors());
// Need this so Express knows how to parse the raw JSON string coming from fetch calls.
app.use(express.json());

/*
  This line tells the Express app to use the 'authRoutes' for any requests
  that start with '/api/auth'. It helps organize the routes for better
  modularity, ensuring all authentication-related endpoints are handled
  by 'authRoutes'.
*/
app.use("/api/auth", authRoutes);
app.use("/api/lost", lostRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  connectDB();
});
