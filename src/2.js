/**
 * 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：

输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/add-two-numbers
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

const args = require('yargs').argv
const data = {
  num1: args.num1 || 342,
  num2: args.num2 || 465,
  func: args.func || ''
}

class ListNode {
  constructor(val) {
    this.val = val
    this.next = null // head节点的next被初始化为null，当有新元素插入时，next会指向新的元素
  }
}

class LinkedList {
  constructor(node) {
    this.head = node || new ListNode('head')
  }

  // 打印链表元素的方法
  display(reverse) {
    let curNode = this.head
    let data = []
    if (curNode.val !== 'head') {
      if (!reverse) {
        data.push(curNode.val)
      } else {
        data.splice(0, 0, curNode.val)
      }
    }
    while (!(curNode.next == null)) {
      if (!reverse) {
        data.push(curNode.next.val)
      } else {
        data.splice(0, 0, curNode.next.val)
      }
      curNode = curNode.next
    }
    
    return Number(data.join(''))
  }

  // 插入一个元素，找到当前元素，将当前元素的next赋值给新元素的next，将新元素赋值给当前元素的
  insert(newval, item) {
    const newNode = new ListNode(newval)
    var curNode = this.find(item)
    newNode.next = curNode.next
    curNode.next = newNode
  }

  // 辅助方法，遍历链表，查找指定的数据，如果找到该数据，就返回保存该数据的节点
  find(item) {
    let curNode = this.head
    while (curNode.val !== item) {
      curNode = curNode.next
    }
    return curNode
  }
}

class Demo {
  constructor({ func, ...rest }) {
    // 手动插入链表节点
    const data = new LinkedList()
    data.insert(2, 'head');
    data.insert(4, 2);
    data.insert(3, 4);

    const data1 = new LinkedList()
    data1.insert(5, 'head');
    data1.insert(6, 5);
    data1.insert(4, 6);

    // console.log(data.head.next)
    // console.log(data1.head.next)

    // 获取链表数字
    const data2 = new LinkedList(data.head.next)
    const data3 = new LinkedList(data1.head.next)

    const num = data2.display('reverse');
    const num1 = data3.display('reverse');

    const result = num + num1
    // console.log(result)
    this.init(result.toString())
  }

  init(str) {
    const data = new LinkedList()
    let tmp = 'head'
    const ary = []
    for (let i = str.length - 1; i >= 0; i--) {
      data.insert(Number(str[i]), tmp)
      tmp = Number(str[i])
      ary.push(Number(str[i]))
    }
    const num = data.display()
    console.log(data.head.next, ary)
  }
}

new Demo(data)