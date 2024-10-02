import React from "react";

function ScoreSystem({ score }) {
  return (
    <div className="w-[600px]  py-4 bg-gradient-to-r bg-gray-600 shadow-xl rounded-xl text-center mx-auto my-40">
      <h2 className="text-2xl font-bold text-white mb-4">Score System</h2>
      <div
        className={`text-4xl ${score >= 0 ? "text-green-500" : "text-red-500"}`}
      >
        {score}
      </div>
      <p className="mt-2 text-white">
        Earn 5 points for correct answers, lose 2 for incorrect ones.
      </p>
    </div>
  );
}

export default ScoreSystem;
