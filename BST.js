// Build a Node class/factory. It should have an attribute for the data it stores as well as its left and right children.
function Node(data) {
  return {
    data,
    left: null,
    right: null,
  };
}

// Build a Tree class/factory which accepts an array when initialized. The Tree class should have a root attribute, which uses the return value of buildTree which you’ll write next.
function Tree(array) {
  // Remove duplicates and sort the array
  let sortedArr = array.sort((a, b) => a - b);
  let cleanArr = [...new Set(sortedArr)];
  let root = buildTree(cleanArr, 0, cleanArr.length - 1);

  // Write a buildTree(array) function that takes an array of data and turns it into a balanced binary tree
  function buildTree(arr, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = Node(arr[mid]);

    node.left = buildTree(arr, start, mid - 1);
    node.right = buildTree(arr, mid + 1, end);
    //The buildTree function should return the level-0 root node.
    return node;
  }
  // Pretty print function for visualization
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  return {
    root,
    prettyPrint: () => prettyPrint(root),
  };
}
const tree = Tree([25, 3, 5, 200, 5]);
console.log(tree.prettyPrint());
