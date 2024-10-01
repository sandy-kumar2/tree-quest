import React from "react";

function ScoreSystem({ score }) {
  return (
    <div className="w-1/4 p-6 bg-white shadow-lg rounded-lg text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Score System</h2>
      <div
        className={`text-4xl ${score >= 0 ? "text-green-500" : "text-red-500"}`}
      >
        {score}
      </div>
      <p className="mt-2 text-gray-600">
        Earn 5 points for correct answers, lose 2 for incorrect ones.
      </p>
    </div>
  );
}

export default ScoreSystem;
