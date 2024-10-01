import mongoose from "mongoose";

// Define player schema
const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure that email is unique across players
  },
});

// Create Player model
export const Player = mongoose.model("Player", playerSchema);
