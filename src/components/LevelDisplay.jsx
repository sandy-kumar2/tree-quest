import React from "react";

const LevelDisplay = ({ level }) => {
  return (
    <div className="text-center mb-4">
      <h1 className="text-3xl font-bold text-green-400">{`Level: ${level}`}</h1>
    </div>
  );
};

export default LevelDisplay;
