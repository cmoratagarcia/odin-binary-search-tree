import Node from "./Node.js";

// Build a Tree class/factory which accepts an array when initialized. The Tree class should have a root attribute, which uses the return value of buildTree which you’ll write next.
export default function Tree(array) {
  let root;
  // Remove duplicates and sort the array
  let sortedArr = array.sort((a, b) => a - b);
  let cleanArr = [...new Set(sortedArr)];
  root = buildTree(cleanArr, 0, cleanArr.length - 1);

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

  function insert(value, compNode = root) {
    //Use find function to see if duplicate and do nothing
    if (find(value)) {
      return;
    }
    //If smaller, go left
    if (value < compNode.data) {
      if (compNode.left) {
        insert(value, compNode.left);
      } else {
        compNode.left = Node(value); //When no children, create new node and make it parent's LH or RH child
      }
      //If bigger, go right
    } else if (value > compNode.data) {
      if (compNode.right) {
        insert(value, compNode.right);
      } else {
        compNode.right = Node(value);
      }
    }
  }

  function deleteItem(value, compNode = root) {
    if (compNode === null) return null;

    if (value < compNode.data) {
      compNode.left = deleteItem(value, compNode.left);
    } else if (value > compNode.data) {
      compNode.right = deleteItem(value, compNode.right);
    } else {
      // Case 1: No children
      if (compNode.left === null && compNode.right === null) {
        return null;
      }
      // Case 2: One child
      if (compNode.left === null) return compNode.right;
      if (compNode.right === null) return compNode.left;

      // Case 3: Two children
      let successor = compNode.right;
      while (successor.left !== null) {
        successor = successor.left;
      }
      compNode.data = successor.data;
      compNode.right = deleteItem(successor.data, compNode.right);
    }

    return compNode;
  }

  //find(value) function that returns the node with the given value.
  function find(value, compNode = root) {
    // Base case: if we've reached a null node, value is not in tree
    if (compNode === null) {
      return null;
    }
    // Found the value
    if (value === compNode.data) {
      return compNode;
    }
    if (value < compNode.data) {
      return find(value, compNode.left);
    }
    if (value > compNode.data) {
      return find(value, compNode.right);
    }
  }
  //levelOrder(callback) function that accepts a callback function as its parameter. levelOrder should traverse the tree in breadth-first level order and call the callback on each node as it traverses

  //Write inOrder(callback), preOrder(callback), and postOrder(callback) functions that also accept a callback as a parameter.
  function traverseTree(order, callback) {
    if (typeof callback !== "function") {
      //If no callback function is provided, throw an Error
      throw new Error("A callback function is required.");
    }

    function inOrder(node) {
      if (node === null) return;
      inOrder(node.left);
      callback(node);
      inOrder(node.right);
    }

    function preOrder(node) {
      if (node === null) return;
      callback(node);
      preOrder(node.left);
      preOrder(node.right);
    }

    function postOrder(node) {
      if (node === null) return;
      postOrder(node.left);
      postOrder(node.right);
      callback(node);
    }

    function levelOrder(queue = [root]) {
      //array to keep track
      if (queue.length === 0) return;
      const node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      levelOrder(queue); // recurse with updated queue
    }

    switch (order) {
      case "in":
        inOrder(root);
        break;
      case "pre":
        preOrder(root);
        break;
      case "post":
        postOrder(root);
        break;
      case "level":
        levelOrder();
        break;
      default:
        throw new Error(
          "Traversal order must be 'in', 'pre', 'post', or 'level'."
        );
    }
  }
  //Write a height(value) function that returns the height of the node containing the given value
  function height(value) {
    const node = find(value); //Search using find function
    if (!node) return null;

    function calcHeight(current) {
      if (!current) return -1; // Base case: null node has height -1
      const leftHeight = calcHeight(current.left);
      const rightHeight = calcHeight(current.right);
      return 1 + Math.max(leftHeight, rightHeight); //Height = 1 + taller subtree
    }

    return calcHeight(node);
  }
  //Write a depth(value) function that returns the depth of the node containing the given value
  function depth(value) {
    function findDepth(node, currentDepth = 0) {
      if (!node) return null;
      if (node.data === value) return currentDepth;

      if (value < node.data) {
        return findDepth(node.left, currentDepth + 1);
      } else if (value > node.data) {
        return findDepth(node.right, currentDepth + 1);
      }
    }

    return findDepth(root);
  }
  //Write an isBalanced function that checks if the tree is balanced.
  function isBalanced() {
    function checkBalance(node) {
      if (!node) return true; //if the current node is null, treat it as balanced

      const leftHeight = node.left ? height(node.left.data) : -1;
      const rightHeight = node.right ? height(node.right.data) : -1;

      const heightDiff = Math.abs(leftHeight - rightHeight); //return a non-negative number

      // If the difference is more than 1 or any subtree is unbalanced
      if (heightDiff > 1) return false;

      return checkBalance(node.left) && checkBalance(node.right);
    }

    return checkBalance(root);
  }

  //Write a rebalance function that rebalances an unbalanced tree
  function rebalance() {
    const values = [];

    traverseTree("in", (node) => values.push(node.data));

    // Rebuild the balanced tree from current values
    root = buildTree(values, 0, values.length - 1);
  }

  // Pretty print function for visualization. Provided by the OP.
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
    insert,
    deleteItem: (value) => {
      //Wrapper so it always starts from root and updates root if needed
      root = deleteItem(value, root);
    },
    find,
    traverseTree,
    height,
    depth,
    isBalanced,
    rebalance,
    prettyPrint: () => prettyPrint(root), //Wrapper so it is always called with the correct root node
  };
}
