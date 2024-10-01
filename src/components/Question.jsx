import React, { useState } from "react";
import {
  getHeight,
  getMinElement,
  getMaxElement,
  inorderTraversal,
  postorderTraversal,
  preorderTraversal,
  levelOrderTraversal,
  findSuccessor
} from "../utils/treeUtils";

function Question({ root, highlightedNodeValue }) {
  const [questionResult, setQuestionResult] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswering, setIsAnswering] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  // Function to get the current node based on highlighted value
  const getCurrentNode = (node, value) => {
    if (!node) return null;
    if (node.value === value) return node;
    return (
      getCurrentNode(node.left, value) || getCurrentNode(node.right, value)
    );
  };

  const currentNode = getCurrentNode(root, highlightedNodeValue);

  const handleQuestion = (question) => {
    let correctAnswer;
    switch (question) {
      case "height":
        correctAnswer = getHeight(root);
        break;
      case "min":
        correctAnswer = getMinElement(root);
        break;
      case "max":
        correctAnswer = getMaxElement(root);
        break;
      case "diameter":
        correctAnswer = getDiameter(root);
        break;
      case "inorder":
        correctAnswer = inorderTraversal(root);
        break;
      case "postorder":
        correctAnswer = postorderTraversal(root);
        break;
      case "preorder":
        correctAnswer = preorderTraversal(root);
        break;
      case "levelorder":
        correctAnswer = levelOrderTraversal(root);
        break;
      case "successor":
        correctAnswer = findSuccessor(root);
        break;
      default:
        correctAnswer = null;
    }

    setQuestionResult(correctAnswer);
    setIsAnswering(false);
    return correctAnswer; // Return the correct answer for validation
  };

  const checkAnswer = () => {
    const correctAnswers = handleQuestion(selectedQuestion);
    const userAnswerArray = userAnswer
      .split(",")
      .map((answer) => answer.trim());

    // Check if all user answers are correct
    const allCorrect = userAnswerArray.every(
      (answer) =>
        correctAnswers.includes(answer) ||
        parseInt(answer) === correctAnswers[0]
    );

    if (allCorrect) {
      setFeedback("Correct answer!");
      setIsCorrect(true);
    } else {
      setFeedback(`Incorrect! Correct answer: ${correctAnswers.join(", ")}`);
      setIsCorrect(false);
    }
  };

  return (
    <div>
      <div className="mt-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-red-400 mb-4 text-center">
          Answer Questions
        </h2>
        {currentNode && (
          <h3 className="text-lg mb-4">
            Question for Node: {currentNode.value}
          </h3>
        )}

        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Your answer"
          className="border p-2 text-gray-800 rounded mt-2 w-full"
        />
        <button
          onClick={checkAnswer}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-2"
        >
          Submit Answer
        </button>

        {feedback && (
          <p
            className={`mt-2 font-bold ${
              isCorrect ? "text-green-500" : "text-red-500"
            }`}
          >
            {feedback}
          </p>
        )}
      </div>
    </div>
  );
}

export default Question;
