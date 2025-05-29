import Tree from "./BST.js";

// Helper function to create array of random integers
function randomArray(size = 15, max = 100) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

// Create a binary search tree from an array of random numbers < 100
const randomNumbers = randomArray();
const tree = Tree(randomNumbers);

console.log("Initial tree:");
tree.prettyPrint();

// Confirm the tree is balanced
console.log("Is the tree balanced?", tree.isBalanced());

// Print out all elements in level, pre, post, and in order
console.log("Level order:");
tree.traverseTree("level", (node) => console.log(node.data));

console.log("Preorder:");
tree.traverseTree("pre", (node) => console.log(node.data));

console.log("Postorder:");
tree.traverseTree("post", (node) => console.log(node.data));

console.log("Inorder:");
tree.traverseTree("in", (node) => console.log(node.data));

// Unbalance the tree by adding several numbers > 100
tree.insert(101);
tree.insert(150);
tree.insert(120);
tree.insert(130);
tree.insert(110);
tree.insert(140);

console.log("Tree after unbalancing:");
tree.prettyPrint();

// Confirm the tree is unbalanced
console.log("Is the tree balanced?", tree.isBalanced());

// Balance the tree
tree.rebalance();

console.log("Tree after rebalancing:");
tree.prettyPrint();

// Confirm the tree is balanced
console.log("Is the tree balanced?", tree.isBalanced());

// Reprint out all elements in level, pre, post, and in order.
console.log("Level order after rebalancing:");
tree.traverseTree("level", (node) => console.log(node.data));

console.log("Preorder after rebalancing:");
tree.traverseTree("pre", (node) => console.log(node.data));

console.log("Postorder after rebalancing:");
tree.traverseTree("post", (node) => console.log(node.data));

console.log("Inorder after rebalancing:");
tree.traverseTree("in", (node) => console.log(node.data));
