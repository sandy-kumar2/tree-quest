// controllers/PlayerController.js
import { Player } from "../models/player.model.js";
import { Room } from "../models/room.model.js";

// Register a new player
export const registerPlayer = async (req, res) => {
  const { name, email } = req.body; 

  try {
    const newPlayer = new Player({ name, email });
    await newPlayer.save();
    return res
      .status(201)
      .json({ message: "Player registered successfully", player: newPlayer });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Join a player to the room
export const joinRoom = async (req, res) => {
  const { roomId, socketId } = req.body; 
  const playerName = req.body.name; 

  try {
    const room = await Room.findOne({ roomId });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Check if the room is full
    if (room.players.length >= room.maxPlayers) {
      return res.status(400).json({ message: "Room is full" });
    }

    // Create or update the player in the Player model
    let player = await Player.findOne({ socketId });
    if (!player) {
      player = new Player({ socketId, name: playerName });
      await player.save(); // Save the new player
    } else {
      player.name = playerName; // Update the player's name if necessary
      await player.save();
    }

    // Add the player's ObjectId to the room's players array
    room.players.push(player._id);
    await room.save();

    return res
      .status(200)
      .json({ message: "Player joined successfully", room });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Remove a player from the room
export const removePlayer = async (req, res) => {
  const { socketId } = req.body; // Extract socketId from request body

  try {
    const player = await Player.findOne({ socketId });
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    const room = await Room.findOne({ players: player._id });
    if (room) {
      room.players = room.players.filter(
        (playerId) => !playerId.equals(player._id)
      ); // Remove by ObjectId
      await room.save();
      return res
        .status(200)
        .json({ message: "Player removed successfully", room });
    }
    return res
      .status(404)
      .json({ message: "Player was not found in any room" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
