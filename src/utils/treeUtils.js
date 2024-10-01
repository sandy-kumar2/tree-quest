// utils/treeUtils.js

export const getHeight = (node) => {
  if (!node) return 0;
  return 1 + Math.max(getHeight(node.left), getHeight(node.right));
};

export const getMinElement = (node) => {
  if (!node) return null;
  while (node.left) node = node.left;
  return node.value;
};

export const getMaxElement = (node) => {
  if (!node) return null;
  while (node.right) node = node.right;
  return node.value;
};

export const getDiameter = (node) => {
  const heightDiameter = (node) => {
    if (!node) return { height: 0, diameter: 0 };
    const left = heightDiameter(node.left);
    const right = heightDiameter(node.right);
    const height = 1 + Math.max(left.height, right.height);
    const diameter = Math.max(
      left.diameter,
      right.diameter,
      left.height + right.height
    );
    return { height, diameter };
  };
  return heightDiameter(node).diameter;
};

export const inorderTraversal = (node, result = []) => {
  if (!node) return result;
  inorderTraversal(node.left, result);
  result.push(node.value);
  inorderTraversal(node.right, result);
  return result;
};

export const preorderTraversal = (node, result = []) => {
  if (!node) return result;
  result.push(node.value);
  preorderTraversal(node.left, result);
  preorderTraversal(node.right, result);
  return result;
};

export const postorderTraversal = (node, result = []) => {
  if (!node) return result;
  postorderTraversal(node.left, result);
  postorderTraversal(node.right, result);
  result.push(node.value);
  return result;
};

export const levelOrderTraversal = (root) => {
  let result = [];
  if (!root) return result;
  let queue = [root];
  while (queue.length > 0) {
    let current = queue.shift();
    result.push(current.value);
    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }
  return result;
};

export const findPredecessor = (root, value) => {
  let current = root;
  let predecessor = null;
  while (current) {
    if (value > current.value) {
      predecessor = current;
      current = current.right;
    } else {
      current = current.left;
    }
  }
  return predecessor ? predecessor.value : null;
};

// Function to find the successor of a node
export const findSuccessor = (root, value) => {
  let current = root;
  let successor = null;
  while (current) {
    if (value < current.value) {
      successor = current;
      current = current.left;
    } else {
      current = current.right;
    }
  }
  return successor ? successor.value : null;
};
