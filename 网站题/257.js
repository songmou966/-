/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
    const paths = [];
    const construct_paths = (root, path) => {
        if (root) {
            path += root.val.toString();
            if (root.left === null && root.right === null) { // 当前节点是叶子节点
                paths.push(path); // 把路径加入到答案中
            } else {
                path += "->"; // 当前节点不是叶子节点，继续递归遍历
                construct_paths(root.left, path);
                construct_paths(root.right, path);
            }
        }
    }
    construct_paths(root, "");
    return paths;
};
