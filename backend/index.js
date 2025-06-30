import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import https from "https";
import ticketRoutes from "./routes/tickets.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

const keyPath = process.env.SSL_KEY;
const certPath = process.env.SSL_CERT;

if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
  console.error("❌ SSL cert or key file not found! Check .env paths.");
  process.exit(1);
}

const sslOptions = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};

app.use(cors());
app.use(express.json());

app.use("/api/tickets", ticketRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    https.createServer(sslOptions, app).listen(port, host, () => {
      console.log(`🚀 Express HTTPS server running at https://${host}:${port}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
