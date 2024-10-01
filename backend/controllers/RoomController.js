import { Room } from "../models/room.model.js";
import { Player } from "../models/player.model.js";

// Create a new room
export const roomCreate = async (req, res) => {
  const { roomId, email } = req.body;

  // Check if roomId and email are provided
  if (!roomId || !email) {
    return res.status(400).json({
      message: "Room ID and Email are required!",
      success: false,
    });
  }

  try {
    // Check if the room already exists
    const existingRoom = await Room.findOne({ roomId });
    if (existingRoom) {
      return res.status(400).json({
        message: "Room with this ID already exists. Try a different ID.",
        success: false,
      });
    }

    // Find the player by email
    const player = await Player.findOne({ email });
    if (!player) {
      return res.status(404).json({
        message: "Player with this email not found.",
        success: false,
      });
    }

    // Manually set playerCount to the number of players in the room
    const newRoom = await Room.create({
      roomId,
      players: [player._id], // Add the player who created the room
      playerCount: 1, // Since there's only one player initially (the creator)
      maxPlayers: 4, // Maximum number of players
    });

    return res.status(201).json({
      message: "Room created successfully and player added",
      room: newRoom,
      success: true,
    });
  } catch (error) {
    // Log the error and return a 500 status
    console.error("Error creating room:", error);
    return res.status(500).json({
      message: "An error occurred while creating the room.",
      error: error.message,
      success: false,
    });
  }
};

// Get a room by ID
export const getRoom = async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findOne({ roomId }).populate("players");
    if (!room) {
      throw new Error("Room not found");
    }
    return res.status(200).json(room);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// Join a room and handle player addition
export const joinRoom = async (req, res) => {
  const { roomId, playerName } = req.body; // Now we're expecting playerName in the body

  try {
    // Find the room by ID
    const room = await Room.findOne({ roomId });
    if (!room) {
      return res.status(404).json({ message: "Room not found." });
    }

    // Check if the room is full
    if (room.playerCount >= room.maxPlayers) {
      return res.status(400).json({ message: "Room is full." });
    }

    // Find the player by name
    const player = await Player.findOne({ name: playerName });
    if (!player) {
      return res.status(404).json({ message: "Player not found." });
    }

    // Add player to the room
    room.players.push(player._id); // Add the player ID to the players array
    room.playerCount += 1; // Increment the player count
    await room.save(); // Save the updated room

    return res.status(200).json({ message: "Joined room successfully", room });
  } catch (error) {
    console.error("Error joining room:", error);
    return res.status(500).json({
      message: "An error occurred while joining the room.",
      error: error.message,
    });
  }
};

// Remove a player from the room (if necessary)
export const removePlayer = async (req, res) => {
  const { playerId } = req.body;

  try {
    // Find the room where the player is present
    const room = await Room.findOne({ players: playerId });

    if (!room) {
      return res.status(404).json({
        message: "Player not found in any room",
        success: false,
      });
    }

    // Check if the player is actually in the room
    const playerIndex = room.players.indexOf(playerId);
    if (playerIndex === -1) {
      return res.status(400).json({
        message: "Player is not in this room",
        success: false,
      });
    }

    // Remove the player from the room
    room.players.pull(playerId);

    // Update the player count
    room.playerCount = room.players.length;

    // Save the updated room
    await room.save();

    return res.status(200).json({
      message: "Player removed successfully",
      room,
      success: true,
    });
  } catch (error) {
    console.error("Error removing player:", error);
    return res.status(500).json({
      message: "An error occurred while removing the player.",
      error: error.message,
      success: false,
    });
  }
};
