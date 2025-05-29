// Build a Node class/factory. It should have an attribute for the data it stores as well as its left and right children.
export default function Node(data) {
  return {
    data,
    left: null,
    right: null,
  };
}
