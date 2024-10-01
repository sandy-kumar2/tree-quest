import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import Modal from "./Modal"; 

const Home = () => {
  const [isMakeRoomOpen, setIsMakeRoomOpen] = useState(false);
  const [isJoinRoomOpen, setIsJoinRoomOpen] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  const handleCreateRoom = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/room/make",
        {
          roomId,
          email,
        }
      );
      if (response.data.success) {
        // Redirect to visualizer page after successful room creation
        navigate("/visualizer"); // Use navigate instead of history.push
      }
    } catch (error) {
      console.error("Error creating room:", error);
      alert(error.response?.data?.message || "An error occurred"); // Show error message
    }
  };

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/room/entry",
        {
          roomId,
          email,
        }
      );
      if (response.data.success) {
        // Redirect to visualizer page after successful room creation
        navigate("/visualizer"); // Use navigate instead of history.push
      }
    } catch (error) {
      console.error("Error creating room:", error);
      alert(error.response?.data?.message || "An error occurred"); // Show error message
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-r from-blue-500 to-purple-500">
      <h1 className="text-5xl font-bold text-white mb-4">
        The Binary Search Tree (BST) Game is an interactive educational game
        designed to help users learn and understand the properties and traversal
        methods of binary search trees. Below is a breakdown of the key
        features, functionalities, and overall structure of the project:
      </h1>
      <p className="text-xl text-white mb-6">
        Navigate using the links above to access different sections of the app.
      </p>
      <button
        onClick={() => setIsMakeRoomOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Make Room
      </button>
      <button
        onClick={() => setIsJoinRoomOpen(true)}
        className="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Join Room
      </button>

      {/* Modal for Making Room */}
      <Modal
        isOpen={isMakeRoomOpen}
        onClose={() => setIsMakeRoomOpen(false)}
        title="Create Room"
        onSubmit={handleCreateRoom}
      >
        <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="border rounded w-full px-3 py-2 mb-4"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="border rounded w-full px-3 py-2 mb-4"
        />
      </Modal>

      {/* Modal for Joining Room */}
      <Modal
        isOpen={isJoinRoomOpen}
        onClose={() => setIsJoinRoomOpen(false)}
        title="Join Room"
        onSubmit={handleJoinRoom}
      >
        <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="border rounded w-full px-3 py-2 mb-4"
        />
        <input
          type="text"
          placeholder="Your Name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="border rounded w-full px-3 py-2 mb-4"
        />
      </Modal>
    </div>
  );
};

export default Home;
