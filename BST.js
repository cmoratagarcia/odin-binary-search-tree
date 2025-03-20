// Build a Node class/factory. It should have an attribute for the data it stores as well as its left and right children.

function Node(data, left = null, right = null) {
  return {
    data,
    left,
    right,
  };
}

// Build a Tree class/factory which accepts an array when initialized. The Tree class should have a root attribute, which uses the return value of buildTree which you’ll write next.
function Tree(array) {
  let root = buildTree();
  return {
    root,
  };
}

// Write a buildTree(array) function that takes an array of data and turns it into a balanced binary tree
function buildTree(array) {
  let l = array.length;
  let sortedArr = array.sort((a, b) => a - b);
  //Empty array
  if (l === 0) {
    return null;
  }
  return sortedArr;
  //The buildTree function should return the level-0 root node.
}

