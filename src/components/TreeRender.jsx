import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import TreeNode from "./TreeNode";

function TreeRender({ root }) {
  const [highlightedNodeValue, setHighlightedNodeValue] = useState(
    root ? root.value : null
  );
  const [nodeList, setNodeList] = useState([]);

  useEffect(() => {
    // Function to traverse the tree and build a list of nodes
    const nodeList = [];
    const traverseTree = (node) => {
      if (node) {
        nodeList.push(node);
        traverseTree(node.left);
        traverseTree(node.right);
      }
    };

    traverseTree(root);
    setNodeList(nodeList);
    if (root) {
      setHighlightedNodeValue(root.value); // Initialize with root node value
    }
  }, [root]);

  const handleKeyDown = (event) => {
    setHighlightedNodeValue((prevValue) => {
      // Find the current node based on the highlighted node value
      const findCurrentNode = (node) => {
        if (!node) return null;
        if (node.value === prevValue) return node;
        return findCurrentNode(node.left) || findCurrentNode(node.right);
      };

      const currentNode = findCurrentNode(root);

      if (event.key === "ArrowLeft") {
        // Move to the left child
        if (currentNode && currentNode.left) {
          return currentNode.left.value;
        } else {
          return prevValue; // Stay on the same node if no left child
        }
      } else if (event.key === "ArrowRight") {
        // Move to the right child
        if (currentNode && currentNode.right) {
          return currentNode.right.value;
        } else {
          return prevValue; // Stay on the same node if no right child
        }
      } else if (event.key === "ArrowUp") {
        // Move to the right child
        if (currentNode && !currentNode.left && !currentNode.right) {
          return root.value;
        } else {
          return prevValue; // Stay on the same node if no right child
        }
      }
      return prevValue; // Return the same value if no movement is possible
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nodeList]);

  const renderTree = (node, x, y, depth) => {
    if (!node) return null;

    const horizontalSpacing = 250 / Math.pow(2, depth + 1);
    const verticalSpacing = 100;
    const leftX = x - horizontalSpacing;
    const rightX = x + horizontalSpacing;
    const nextY = y + verticalSpacing;

    return (
      <g key={node.value}>
        {node.left && (
          <>
            <line
              x1={x}
              y1={y}
              x2={leftX}
              y2={nextY}
              stroke="black"
              strokeWidth="2"
            />
            {renderTree(node.left, leftX, nextY, depth + 1)}
          </>
        )}
        {node.right && (
          <>
            <line
              x1={x}
              y1={y}
              x2={rightX}
              y2={nextY}
              stroke="black"
              strokeWidth="2"
            />
            {renderTree(node.right, rightX, nextY, depth + 1)}
          </>
        )}
        <TreeNode
          value={node.value}
          x={x}
          y={y}
          isHighlighted={node.value === highlightedNodeValue} // Highlight based on current value
        />
      </g>
    );
  };

  return (
    <div className="flex items-center justify-center">
      <svg width="600" height="700" className="border border-white">
        {renderTree(root, 250, 40, 0)}
      </svg>
    </div>
  );
}

export default TreeRender;
