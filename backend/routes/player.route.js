// routes/playerRoutes.js
import express from "express";
import {
  registerPlayer,
  joinRoom,
  removePlayer,
} from "../controllers/PlayerController.js";

const router = express.Router();

// Route to register a new player
router.post("/register", registerPlayer);

// Route for a player to join a room
router.post("/join", joinRoom);

// Route for a player to leave a room
router.post("/leave", removePlayer);

export default router;
