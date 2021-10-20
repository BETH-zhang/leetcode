/**
 * Given 1->2->3->4, you should return the list as 2->1->4->3.
 */
/*
 * @lc app=leetcode id=24 lang=javascript
 *
 * [24] Swap Nodes in Pairs
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

 function ListNode(val) {
  this.val = val
  this.next = null
 }

 function find(val) {
  var currNode = this.head
  // console.log('currNode: ', currNode)
  while(currNode.val !== val) {
    currNode = currNode.next
  }
  return currNode
 }

 function insert(newVal, val) {
  var newNode = new ListNode(newVal)
  var currNode = this.find(val)
  newNode.next = currNode.next
  currNode.next = newNode
 }

 function remove(newVal, val) {
  var currNode = this.find(val)
  var newCurrNode = this.find(newVal)
  currNode.next = newCurrNode.next
 }

 function display() {
   var currNode = this.head
   while (!(currNode.next == null)) {
    // console.log('--', currNode.val, '\n', currNode.next.val)
    currNode = currNode.next
   }
 }

 function LList() {
   this.head = new ListNode('head')
   this.find = find
   this.insert = insert
   this.remove = remove
   this.display = display
 }

 var llist = new LList()
 llist.insert(1, 'head')
 llist.insert(2, 1)
 llist.insert(3, 2)
//  llist.insert(4, 3)
 llist.display()

var findNode = function(head, val) {
  var currNode = head
  while(currNode.val != val) {
    currNode = currNode.next
  }
  return currNode
}

var removeNode = function(head, newVal, val) {
  var currNode = findNode(head, val)
  var newCurrNode = findNode(newVal)
  currNode.next = newCurrNode.next
 }

 var insertNode = function(head, newVal, val) {
  var newNode = new ListNode(newVal)
  var currNode = findNode(head, val)
  newNode.next = currNode.next
  currNode.next = newNode
 }

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    if (!head) {
      return null
    }

    var arr = []
    var currNode = head
    while (currNode) {
      const nextNode = currNode.next
      currNode.next = null
      arr.push(currNode)
      currNode = nextNode
    }

    var len = arr.length

    if (len <= 1) {
      return arr[0] || null
    }
    
    // console.log(arr)
    for (var i = 0; i < len; i++) {
      var a = arr[i]
      var b = arr[i + 1]
      
      if (i % 2 || !b) {
        continue
      } else {
        arr[i] = b
        arr[i + 1] = a
      }
    }

    console.log('---arr: ', arr)

    for (var i = 0; i < len - 1; i++) {
      arr[i].next = arr[i + 1]
    }

    return arr[0]
};

var swapPairs1 = function(head) {
  if (!head) {
    return null
  }

  // 递归的做法
  // 遍历放到两个链表，然后再合并
  // 0-0-0-0-0-0-0 保留2，5，  2链接4，5链接3，再4链接3
}

swapPairs(llist.head.next)

