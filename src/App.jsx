import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import BinarySearchTree from "./components/BinarySearchTree";
import ScoreSystem from "./components/ScoreSystem";
import Register from "./components/Register";
import Home from "./components/Home"; 
import Header from "./components/Header"; 

const App = () => {
  const location = useLocation(); 

  // Determine if the Header should be shown
  const showHeader = !["/visualizer", "/register"].includes(location.pathname);

  return (
    <>
      {showHeader && <Header />} {/* Render Header conditionally */}
      {/* Define routes for each component */}
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/visualizer" element={<BinarySearchTree />} />{" "}
        {/* Binary Search Tree Visualizer */}
        {/* <Route path="/score" element={<ScoreSystem />} />  */}
      </Routes>
    </>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
