// https://juejin.cn/post/6844903876206805005
/**
 * 常用的打印函数和一些数学函数
 */

const _max = Math.max.bind(Math)
const _min = Math.min.bind(Math)
const _pow = Math.pow.bind(Math)
const _floor = Math.floor.bind(Math)
const _ceil = Math.ceil.bind(Math)
const log = console.log.bind(console)

/**
 * 位运算的小技巧
 */
// 判断整数 x 的奇偶性 odd 奇数 even 偶数
const isOddNumber = x => x & 1 === 1 // x % 2
const isEvenNumber = x => x & 1 === 0
// 求一个浮点数 x 的整数部分
const getfloatpointInteger = x => {
  // return ~~x
  // return ceil(-x)
  return floor(x)
}

// 计算次方
const getPower = (x, n) => {
  if (x === 2) {
    // return 1 << n
    return pow(2, n)
  }
  return pow(x, n)
}

// 计算 x 的 n 次方，n为整数
const qPow = (x, n) => {
  let result = 1
  while (n) {
    if (n & 1) result *= x
    x = x * x
    n >>= 1
  }
  return result
}

/**
 * 链表节点
 * @param {*} val
 * @param {ListNode} next
 */
 function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}
/**
* 将一个数组转为链表
* @param {array} a
* @return {ListNode}
*/
const getListFromArray = (a) => {
  let dummy = new ListNode()
  let pre = dummy;
  a.forEach(x => pre = pre.next = new ListNode(x));
  return dummy.next;
}
/**
* 将一个链表转为数组
* @param {ListNode} node
* @return {array}
*/
const getArrayFromList = (node) => {
  let a = [];
  while (node) {
      a.push(node.val);
      node = node.next;
  }
  return a;
}
/**
* 打印一个链表
* @param {ListNode} node 
*/
const logList = (node) => {
  let str = 'list: ';
  while (node) {
      str += node.val + '->';
      node = node.next;
  }
  str += 'end';
  log(str);
}

// 如果创建一个空表头来进行操作
let dummy = new ListNode();
// 返回
// return dummy.next;

// 例子
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 var deleteDuplicates = function(head) {
  // 空指针或者只有一个节点不需要处理
  if (head === null || head.next === null) return head;

  let dummy = new ListNode();
  let oldLinkCurrent = head;
  let newLinkCurrent = dummy;

  while (oldLinkCurrent) {
      let next = oldLinkCurrent.next;
      // 如果当前节点和下一个节点的值相同 就要一直向前直到出现不同的值
      if (next && oldLinkCurrent.val === next.val) {
          while (next && oldLinkCurrent.val === next.val) {
              next = next.next;
          }
          oldLinkCurrent = next;
      } else {
          newLinkCurrent = newLinkCurrent.next = oldLinkCurrent;
          oldLinkCurrent = oldLinkCurrent.next;
      }
  }
  newLinkCurrent.next = null; // 记得结尾置空~
  logList(dummy.next);
  return dummy.next;
};

deleteDuplicates(getListFromArray([1,2,3,3,4,4,5]));
deleteDuplicates(getListFromArray([1,1,2,2,3,3,4,4,5]));
deleteDuplicates(getListFromArray([1,1]));
deleteDuplicates(getListFromArray([1,2,2,3,3]));

// 数组相关
/**
 * 初始化一个二维数组
 * @param {number} r 行数
 * @param {number} c 列数
 * @param {*} init 初始值
 */
 const initMatrix = (r, c, init = 0) => new Array(r).fill().map(_ => new Array(c).fill(init));
 /**
  * 获取一个二维数组的行数和列数
  * @param {any[][]} matrix
  * @return [row, col]
  */
 const getMatrixRowAndCol = (matrix) => matrix.length === 0 ? [0, 0] : [matrix.length, matrix[0].length];
 /**
  * 遍历一个二维数组
  * @param {any[][]} matrix 
  * @param {Function} func 
  */
 const matrixFor = (matrix, func) => {
     matrix.forEach((row, i) => {
         row.forEach((item, j) => {
             func(item, i, j, row, matrix);
         });
     })
 }
 /**
  * 获取矩阵第index个元素 从0开始
  * @param {any[][]} matrix 
  * @param {number} index 
  */
 function getMatrix(matrix, index) {
     let col = matrix[0].length;
     let i = ~~(index / col);
     let j = index - i * col;
     return matrix[i][j];
 }
 /**
  * 设置矩阵第index个元素 从0开始
  * @param {any[][]} matrix 
  * @param {number} index 
  */
 function setMatrix(matrix, index, value) {
     let col = matrix[0].length;
     let i = ~~(index / col);
     let j = index - i * col;
     return matrix[i][j] = value;
 }
 
 // 例子
 /**
 * @param {number[][]} nums
 * @param {number} r
 * @param {number} c
 * @return {number[][]}
 */
var matrixReshape = function(nums, r, c) {
  // 将一个矩阵重新排列为r行c列
  // 首先获取原来的行数和列数
  let [r1, c1] = getMatrixRowAndCol(nums);
  log(r1, c1);
  // 不合法的话就返回原矩阵
  if (!r1 || r1 * c1 !== r * c) return nums;
  // 初始化新矩阵
  let matrix = initMatrix(r, c);
  // 遍历原矩阵生成新矩阵
  matrixFor(nums, (val, i, j) => {
      let index = i * c1 + j; // 计算是第几个元素
      log(index);
      setMatrix(matrix, index, val); // 在新矩阵的对应位置赋值
  });
  return matrix;
};

let x = matrixReshape([[1],[2],[3],[4]], 2, 2);
log(x)

// 二叉树
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}
/**
* 通过一个层次遍历的数组生成一棵二叉树
* @param {any[]} array
* @return {TreeNode}
*/
function getTreeFromLayerOrderArray(array) {
  let n = array.length;
  if (!n) return null;
  let index = 0;
  let root = new TreeNode(array[index++]);
  let queue = [root];
  while(index < n) {
      let top = queue.shift();
      let v = array[index++];
      top.left = v == null ? null : new TreeNode(v);
      if (index < n) {
          let v = array[index++];
          top.right = v == null ? null : new TreeNode(v);
      }
      if (top.left) queue.push(top.left);
      if (top.right) queue.push(top.right);
  }
  return root;
}
/**
* 层序遍历一棵二叉树 生成一个数组
* @param {TreeNode} root 
* @return {any[]}
*/
function getLayerOrderArrayFromTree(root) {
  let res = [];
  let que = [root];
  while (que.length) {
      let len = que.length;
      for (let i = 0; i < len; i++) {
          let cur = que.shift();
          if (cur) {
              res.push(cur.val);
              que.push(cur.left, cur.right);
          } else {
              res.push(null);
          }
      }
  }
  while (res.length > 1 && res[res.length - 1] == null) res.pop(); // 删掉结尾的 null
  return res;
}
