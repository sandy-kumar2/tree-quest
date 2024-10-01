import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import playerRoute from "./routes/player.route.js"; // Adjust the path as needed
import roomRoute from "./routes/room.route.js"; // Adjust the path as needed
import socketHandler from "./sockets/socket.js"; // Adjust the path as needed
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Update with your frontend URL in production
    methods: ["GET", "POST"],
  },
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Set up routes
app.use("/api/v1/room", roomRoute); // Prefix routes with /api
app.use("/api/v1/player", playerRoute);

// Initialize socket logic
socketHandler(io); // Pass the socket.io instance to your socket handler

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
