// models/room.model.js
import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  playerCount: { type: Number, default: 1 }, // Initialize to 1 for the creator
  maxPlayers: { type: Number, default: 4 }, // Maximum players in the room
});

export const Room = mongoose.model("Room", roomSchema);
