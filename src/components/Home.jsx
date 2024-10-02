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
          playerName,
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
    <div className="flex flex-col items-center pt-28 h-screen w-full bg-gradient-to-r from-[#640D5F] to-purple-500">
      <div className="bg-[#2E073F] text-center py-4 mx-20 rounded-xl">
        <h1 className="text-3xl font-semibold text-[#EDDFE0] text-center   mb-4 montserrat mx-20">
          The Binary Search Tree (BST) Game{" "}
        </h1>{" "}
        <p className="text-2xl font-light mx-20 mb-6 text-[#EDDFE0]">
          {" "}
          It is an interactive educational game designed to help users learn and
          understand the properties and traversal methods of binary search
          trees. Below is a breakdown of the key features, functionalities, and
          overall structure of the project:
        </p>
        <p className=" text-[#EDDFE0]  text-lg underline">
          Navigate using the links above to access different sections of the
          app.
        </p>
      </div>
      <div>
        <div className="text-center my-10 bg-[#2E073F] w-72 h-72 rounded-full bg-opacity-70">
          <img src="tree.svg" alt="" className="w-60 h-60 mx-auto mt-2" />
          <p className="text-white text-center text-xl ">Tree Quest</p>
        </div>
      </div>
      <div className="flex gap-4 ">
        <button
          onClick={() => setIsMakeRoomOpen(true)}
          className="bg-green-300 text-green-600 border-2 border-green-500 px-4 py-2 rounded "
        >
          Make Room
        </button>
        <button
          onClick={() => setIsJoinRoomOpen(true)}
          className="bg-yellow-200 text-yellow-500 border-2 border-yellow-500 px-4 py-2 rounded"
        >
          Join Room
        </button>
      </div>

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
          onChange={(e) => setEmail(e.target.value)}
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
