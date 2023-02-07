import express from "express";
import connectDB from "../config/db.js";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();

connectDB();

import urlsRouter from "./routes/urls.js";

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", urlsRouter);

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
