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

  function insert(value, compNode = root) {
    console.log(compNode);
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
  //function deleteItem(value)

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
    find,
    prettyPrint: () => prettyPrint(root), //Wrapper so it is always called with the correct root node
  };
}
const tree2 = Tree([1, 2, 3, 4, 6, 7, 10]);
// const tree2 = Tree([7, 2, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree2.insert(5);
tree2.prettyPrint();
