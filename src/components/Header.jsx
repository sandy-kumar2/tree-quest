import React from "react";
import { Link } from "react-router-dom"; // For navigation

const Header = () => {
  return (
    <nav className="bg-gray-800 w-screen fixed top-0 left-0 h-16 z-10">
      <ul className="flex justify-around items-center h-full">
        {" "}
        {/* Added h-full and items-center to vertically center the text */}
        <li>
          <Link
            to="/"
            className="text-white text-2xl px-4 py-2 hover:bg-gray-700 rounded"
          >
            {" "}
            {/* Increased text size and added padding */}
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="text-white text-2xl px-4 py-2 hover:bg-gray-700 rounded"
          >
            {" "}
            {/* Increased text size and added padding */}
            Register
          </Link>
        </li>
        <li>
          <Link
            to="/visualizer"
            className="text-white text-2xl px-4 py-2 hover:bg-gray-700 rounded"
          >
            {" "}
            {/* Increased text size and added padding */}
            Visualizer
          </Link>
        </li>
        <li>
          <Link
            to="/score"
            className="text-white text-2xl px-4 py-2 hover:bg-gray-700 rounded"
          >
            {" "}
            {/* Increased text size and added padding */}
            Score System
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
