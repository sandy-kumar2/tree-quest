import * as RoomController from "../controllers/RoomController.js"; // For named exports

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(`Player connected: ${socket.id}`);

    // Handle player joining a room
    socket.on("joinRoom", async (roomId, playerName) => {
      try {
        const room = await RoomController.joinRoom(
          roomId,
          socket.id,
          playerName
        );
        if (room) {
          socket.join(roomId);
          io.to(roomId).emit("playerJoined", room.players);
        } else {
          socket.emit("roomFull", "The room is full.");
        }
      } catch (error) {
        console.error("Error joining room:", error);
        socket.emit("error", {
          message: "Failed to join the room",
          error: error.message,
        });
      }
    });

    // Handle sending the current question to all players
    socket.on("sendQuestion", async (roomId, question) => {
      try {
        const updatedRoom = await RoomController.addQuestion(roomId, question);
        if (updatedRoom) {
          io.to(roomId).emit("receiveQuestion", question); // Emit question to all players in the room
        }
      } catch (error) {
        console.error("Error sending question:", error);
        socket.emit("error", "Could not send question.");
      }
    });

    // Handle player's answer submission
    socket.on("submitAnswer", (roomId, answer) => {
      io.to(roomId).emit("playerAnswer", { id: socket.id, answer }); // Emit answer to all players in the room
    });

    // Handle player disconnect
    socket.on("disconnect", async () => {
      try {
        const room = await RoomController.removePlayer(socket.id);
        if (room) {
          io.to(room.roomId).emit("playerLeft", socket.id); // Notify others that a player has left
        }
      } catch (error) {
        console.error("Error on player disconnect:", error);
      }
    });
  });
};

export default socketHandler;
