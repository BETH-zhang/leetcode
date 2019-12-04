const args = require('yargs').argv
const i = args.i;

// 二叉树
function BinaryTree() {
  var Node = function (key) {
    this.key = key
    this.left = null
    this.right = null
  }

  // 根节点
  this.root = null

  // 插入节点
  var insertNode = function (node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode
      } else {
        insertNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      } else {
        insertNode(node.right, newNode)
      }
    }
  }

  // 插值
  this.insert = function (key) {
    var newNode = new Node(key)
    if (this.root === null) {
      this.root = newNode
    } else {
      insertNode(this.root, newNode)
    }
  }

  // 遍历节点值： 中序遍历
  var inOrderTraverseNode = function (node, callback) {
    if(node != null) {
      inOrderTraverseNode(node.left, callback)
      callback(node.key)
      inOrderTraverseNode(node.right, callback)
    }
  }

  this.inOrderTraverse = function (callback) { 
    inOrderTraverseNode(this.root, callback)
  }

  // 遍历节点值：前序遍历
  var preOrderTraverseNode = function (node, callback) {  
    if(node != null) {
      callback(node.key)
      preOrderTraverseNode(node.left, callback)
      preOrderTraverseNode(node.right, callback)
    }
  }

  this.preOrderTraverse = function (callback) { 
    preOrderTraverseNode(this.root, callback)
  }

  // 遍历节点值：后序遍历
  var postOrderTraverseNode = function (node, callback) {  
    if(node != null) {
      postOrderTraverseNode(node.left, callback)
      postOrderTraverseNode(node.right, callback)
      callback(node.key)
    }
  }
  
  this.postOrderTraverse = function (callback) { 
    postOrderTraverseNode(this.root, callback)
  }

  // 查找最小值
  var minNode = function (node) {
    if(node) {
      while (node && node.left != null) {
        node = node.left
      }
      return node.key
    }
    return null
  }
  this.min = function () {
    return minNode(this.root)
  }

  // 查找最大值
  var maxNode = function (node) {
    if(node) {
      while (node && node.right != null) {
        node = node.right
      }
      return node.key
    }
    return null
  }
  this.max = function () {
    return maxNode(this.root)
  }

  // 查找节点值
  var searchNode = function (node, key) {
    if(!node) {
      return false
    }
    if(node.key < key) {
      return searchNode(node.right, key)
    } else if (node.key > key) {
      return searchNode(node.left, key)
    } else {
      return true
    }
  }
  this.search = function (key) {  
    return searchNode(this.root, key)
  }

  // 查找最小节点
  var findMinNode = function (node) {
    if(node) {
      while (node && node.left !== null) {
        node = node.left            
      }
      return node
    }
    return null
  }

  // 删除节点
  var removeNode = function (node, key) {
    if(node) {
      if(node.key > key) {
        node.left = removeNode(node.left, key)
        return node
      } else if (node.key < key) {
        node.right = removeNode(node.right, key)
        return node
      } else {
        // 叶子节点则直接删除
        if (node.left == null && node.right == null) {
          return null
        }
        if (node.left == null) {             // 节点没有左子树，则返回右子树
          return node.right
        } else if(node.right == null) {      // 节点没有右子树，则返回左子树
          return node.left
        } 
        // 节点存在左右节点，则把右子树中最小的节点和当前节点替换同时删除右子树中的最小节点
        var minNode = findMinNode(node.right)
        node.key = minNode.key
        node.right = removeNode(node.right, minNode.key)
        return node
      }
    }
  }
  this.remove = function (key) {  
    removeNode(this.root, key)
  }
}

var binaryTree = new BinaryTree();

var len = i;
var nodes = [1]
var count = 0
binaryTree.insert(1)
// 初始化 100 个数字，找一下规律
while(count < len) {
  var x2 = nodes[0] * 2 + 1
  var x3 = nodes[0] * 3 + 1
  if (nodes.indexOf(x2) === -1) {
    nodes.push(x2)
    binaryTree.insert(x2)
  }
  if (nodes.indexOf(x3) === -1) {
    nodes.push(x3)
    binaryTree.insert(x3)
  }
  nodes.shift()
  count += 2
}

var res = 0
var callback = function (key) {
  // console.log(key)
  res++;
  if (res === len) {
    console.log('***' + key + '***')
  }
}

console.time('--------中序遍历---------')
binaryTree.inOrderTraverse(callback)
console.timeEnd('--------中序遍历---------')