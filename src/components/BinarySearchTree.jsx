import React, { useState, useEffect, useRef } from "react";
import TreeRender from "./TreeRender";
import GameStart from "./GameStart"; // Import the GameStart component
import LevelDisplay from "./LevelDisplay"; // Import the LevelDisplay component
import {
  getHeight,
  getMinElement,
  getMaxElement,
  getDiameter,
  inorderTraversal,
  postorderTraversal,
  preorderTraversal,
  levelOrderTraversal,
  findSuccessor
} from "../utils/treeUtils";
import ScoreSystem from "./ScoreSystem";

function BinarySearchTree({ updateScore }) {
  class BinaryTreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }

  const questions = [
    {
      question: "What is the height of the tree?",
      answerFunc: (root) => getHeight(root),
      answerType: "single",
    },
    {
      question: "What is the minimum element in the tree?",
      answerFunc: (root) => getMinElement(root),
      answerType: "single",
    },
    {
      question: "What is the maximum element in the tree?",
      answerFunc: (root) => getMaxElement(root),
      answerType: "single",
    },
    {
      question: "What is the diameter of the tree?",
      answerFunc: (root) => getDiameter(root),
      answerType: "single",
    },
    {
      question: "What is the Inorder Traversal of the given tree?",
      answerFunc: (root) => inorderTraversal(root),
      answerType: "array",
    },
    {
      question: "What is the Postorder Traversal of the given tree?",
      answerFunc: (root) => postorderTraversal(root),
      answerType: "array",
    },
    {
      question: "What is the Preorder Traversal of the given tree?",
      answerFunc: (root) => preorderTraversal(root),
      answerType: "array",
    },
    {
      question: "What is the Levelorder Traversal of the given tree?",
      answerFunc: (root) => levelOrderTraversal(root),
      answerType: "array",
    },
    {
      question: "What is the successor of the node with value {value}?",
      answerFunc: (root, value) =>findSuccessor(root, getNodeByValue(root, value)),
      answerType: "single",
      valueNeeded: true, // Indicate this question needs a value
    },
  ];

  const [root, setRoot] = useState(null);
  const [treeNodes, setTreeNodes] = useState([]);
  const [nodeCount, setNodeCount] = useState(4);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timer, setTimer] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [level, setLevel] = useState(0); // Start level at 0
  const [isGameStarted, setIsGameStarted] = useState(false); 
  const timerRef = useRef(null);

  const insertNode = (root, value) => {
    if (!root) return new BinaryTreeNode(value);
    if (value < root.value) {
      root.left = insertNode(root.left, value);
    } else if (value > root.value) {
      root.right = insertNode(root.right, value);
    }
    return root;
  };

  const buildTree = (newNodeCount) => {
    let numbers = Array.from({ length: newNodeCount }, () =>
      Math.floor(Math.random() * 30)
    );

    let newRoot = null;

    numbers.forEach((num) => {
      newRoot = insertNode(newRoot, num);
    });

    setRoot(newRoot);
    setTreeNodes(numbers);
    selectRandomQuestion();
    setUserAnswer("");
    setFeedback("");
    setTimer(30);
    setIsSubmitDisabled(false);
    setShowTryAgain(false);
  };

  // Use useEffect to handle the game start and level display timing
  useEffect(() => {
    if (!isGameStarted) {
      const startGame = () => {
        setIsGameStarted(true); // Set game started
        setTimeout(() => {
          setLevel(1); // Set level to 1 after 5 seconds
          buildTree(nodeCount); // Generate the tree after level is set
          setNodeCount(nodeCount + 3); // Increment node count for next level
        }, 5000); // Wait for 5 seconds before generating the tree
      };

      startGame();
    }
  }, [isGameStarted, nodeCount]);

  // Start the timer when the level is set to 1 or higher
  useEffect(() => {
    if (level > 0) {
      setTimer(30); // Reset timer to 30 seconds
      setIsTimerActive(true); // Activate timer
    }
  }, [level]);

//  const collectValues = (node, values) => {
//    if (!node) return; // Stop if the node is null (base case).

//    collectValues(node.left, values); // Recursively process the left subtree.
//    values.push(node.value); // Visit the current node and add its value to the array.
//    collectValues(node.right, values); // Recursively process the right subtree.
//  };

const collectValues = (node, values=[]) => {
  if (!node) return;
  collectValues(node.left, values);
  values.push(node.value);
  collectValues(node.right, values);
  return values;
};

 const getRandomValueFromBST = (root) => {
   const values = [];
   collectValues(root, values); // Collect all values from the BST
   console.log("Collected values from BST:", values); // Log the array after values are collected

   // Check if the array has values to avoid errors
   if (values.length === 0) {
     console.log("The BST is empty.");
     return null;
   }

   const randomIndex = Math.floor(Math.random() * values.length); // Get a random index
   return values[randomIndex]; // Return the value at the random index
 };

  
  const getNodeByValue = (node, value) => {
    if (!node) return null;
    if (value < node.value) {
      return getNodeByValue(node.left, value);
    } else if (value > node.value) {
      return getNodeByValue(node.right, value);
    } else {
      return node;
    }
  };

  const selectRandomQuestion = (node) => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const selectedQuestion = questions[randomIndex];

    // If the selected question requires a value, get a random value from the BST
    if (selectedQuestion.valueNeeded) {
      const randomValue = getRandomValueFromBST(root);
      setCurrentQuestion({
        ...selectedQuestion,
        question: selectedQuestion.question.replace("{value}", randomValue),
        value: randomValue,
      });
    } else {
      setCurrentQuestion(selectedQuestion);
    }
  };


  const checkAnswer = () => {
    let correctAnswers = currentQuestion.answerFunc(root);

    // Ensure correctAnswers is an array if the answerType is "array"
    if (currentQuestion.answerType === "array" && !Array.isArray(correctAnswers)) {
      correctAnswers = [correctAnswers]; // Convert to an array if not already
    }

    const userAnswerArray = userAnswer.split(",").map(answer => answer.trim());

    // Check if the question expects an array of answers
    if (currentQuestion.answerType === "array") {
      const allCorrect = userAnswerArray.every(
        (answer) =>
          correctAnswers.includes(answer) ||
          parseInt(answer) === correctAnswers[0]
      );

      if (allCorrect) {
        setFeedback("Correct answer!");
        updateScore(true);
        setLevel((prevLevel) => prevLevel + 1);
        buildTree(nodeCount + 1);
        setIsSubmitDisabled(false);
      } else {
        setFeedback(`Incorrect Answer! The Correct Answers are ${correctAnswers.join(", ")}`);
        updateScore(false);
        setIsSubmitDisabled(true);
        setShowTryAgain(true);
      }
    } else {
      // Handle single answer case
      if (parseInt(userAnswer) === correctAnswers) {
        setFeedback("Correct answer!");
        updateScore(true);
        setLevel((prevLevel) => prevLevel + 1);
        buildTree(nodeCount + 1);
        setIsSubmitDisabled(false);
      } else {
        setFeedback(`Incorrect Answer! The Correct Answer is ${correctAnswers}`);
        updateScore(false);
        setIsSubmitDisabled(true);
        setShowTryAgain(true);
      }
    }
    setIsTimerActive(false);
  };

  const handleTryAgain = () => {
    setUserAnswer("");
    setFeedback("");
    setIsSubmitDisabled(false);
    setTimer(30);
    setIsTimerActive(true);
    setShowTryAgain(false);
  };

  useEffect(() => {
    if (isTimerActive && timer > 0) {
      timerRef.current = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
      setFeedback("Time's up! Try again.");
      setIsSubmitDisabled(true);
      setShowTryAgain(true);
    }
    return () => clearTimeout(timerRef.current);
  }, [isTimerActive, timer]);

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center text-white">
      <div className="grid grid-cols-2 gap-8 p-8 rounded-lg shadow-lg text-center w-full">
        {/* Left column */}
        <div>
          
          {level === 0 ? (
            <GameStart /> // Display GameStart when level is 0
          ) : (
            <div>
            <LevelDisplay level={level} />
            </div> // Display LevelDisplay when level is > 0
          )}
          {treeNodes.length > 0 ? (
            <div className="text-center">
              <h2 className="text-purple-300">
                Tree Nodes: {treeNodes.join(", ")}
              </h2>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-purple-300">There is nothing to show!</h2>
            </div>
          )}
          <div className="border border-gray-600 p-4 mt-4 rounded bg-gray-700">
            <h3 className="text-yellow-400">Question:</h3>
            <p className="text-white">
              {currentQuestion.question || "Select a node to see the question!"}
            </p>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Your answer"
              className="border p-2 text-gray-800 rounded mt-2 w-full"
              disabled={isSubmitDisabled}
            />
            <button
              onClick={checkAnswer}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-2"
              disabled={isSubmitDisabled}
            >
              Submit Answer
            </button>
            {feedback && <p className="text-red-400 mt-2">{feedback}</p>}
            {showTryAgain && (
              <button
                onClick={handleTryAgain}
                className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded mt-4"
              >
                Try Again
              </button>
            )}
            <p className="text-yellow-500 mt-4">Time left: {timer}s</p>
          </div>
          <ScoreSystem />
        </div>

        {/* Right column */}
        <TreeRender root={root} onNodeClick={selectRandomQuestion} />
      </div>
    </div>
  );
}

export default BinarySearchTree;
