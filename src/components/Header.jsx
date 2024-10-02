import React from "react";
import { Link } from "react-router-dom"; // For navigation

const Header = () => {
  return (
    <nav className="bg-gray-800 w-screen fixed top-0 left-0 h-20 z-10">
      <div className="flex justify-between items-center h-full mx-20">
        <div className="text-center ">
          <img src="tree.svg" alt="" className="w-20 h-12 mx-auto" />
          <p className="text-white text-center text-xs">Tree Quest</p>
        </div>
        <div >
        <ul className="flex gap-20">
          {/* Added h-full and items-center to vertically center the text */}
          <li>
            <Link
              to="/"
              className="text-white text-xl px-4 py-2 hover:bg-gray-700 rounded"
            >
              {" "}
              {/* Increased text size and added padding */}
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="text-white text-xl px-4 py-2 hover:bg-gray-700 rounded"
            >
              {" "}
              {/* Increased text size and added padding */}
              Register
            </Link>
          </li>
          <li>
            <Link
              to="/visualizer"
              className="text-white text-xl px-4 py-2 hover:bg-gray-700 rounded"
            >
              {" "}
              {/* Increased text size and added padding */}
              Visualizer
            </Link>
          </li>
          {/* <li>
            <Link
              to="/score"
              className="text-white text-xl px-4 py-2 hover:bg-gray-700 rounded"
            >
              Score System
            </Link>
          </li> */}
        </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
