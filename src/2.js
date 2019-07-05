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
    // console.log('curNode: ', curNode)
    let data = []
    if (curNode.val !== 'head') {
      if (!reverse) {
        data.push(curNode.val)
      } else {
        data.splice(0, 0, curNode.val)
      }
    }
    while (!(curNode.next == null)) {
      // console.log('----', data, curNode.next.val)
      if (!reverse) {
        data.push(curNode.next.val)
      } else {
        data.splice(0, 0, curNode.next.val)
      }
      curNode = curNode.next
    }
    
    data.splice(0, 1)
    return data
  }

  // 插入一个元素，找到当前元素，将当前元素的next赋值给新元素的next，将新元素赋值给当前元素的
  insert(newval, item) {
    const newNode = new ListNode(newval)
    var curNode = this.find(item)
    if (curNode) {
      newNode.next = curNode.next
      curNode.next = newNode
    }
  }

  // 辅助方法，遍历链表，查找指定的数据，如果找到该数据，就返回保存该数据的节点
  find(item) {
    let curNode = this.head
    // console.log(curNode.next)
    while (curNode.next !== null) {
      curNode = curNode.next
    }
    return curNode
  }
}


function sum(num, num2) {
  // console.log(num, num2)
  const len1 = num.length;
  const len2 = num2.length;
  const len = (len1 < len2 ? len1 : len2) + 1
  const data = len1 > len2 ? num.slice(0) : num2.slice(0)
  const dataTmp = Array(len).fill(0)
  
  for (let i = 0; i < len; i++) {
    if (num[len1 - 1 - i] && num2[len2 - 1 - i]) {
      let s = Number(num[len1 - 1 - i]) + Number(num2[len2 - 1 - i])
      console.log(0, s)
      if (s > 9) {
        dataTmp[dataTmp.length - 2 - i] = Number((s.toString()).slice(0, 1))
        s = Number((s.toString()).slice(1))
      }
      data[data.length - 1 - i] = s + dataTmp[dataTmp.length - 1 - i]
    } else if (dataTmp[dataTmp.length - 1 - i]) {
      console.log(2)
      data.splice(0, 0, dataTmp[dataTmp.length - 1 - i]) 
    } else if (num[len1 - 1 - i] || num2[len2 - 1 - i]) {
      console.log(3, num[len1 - 1 - i] || num2[len2 - 1 - i])
      data[data.length - 1 - i] = num[len1 - 1 - i] || num2[len2 - 1 - i]
    }
  }

  console.log(data)
  return data
}

function init(str) {
  const data = new LinkedList()
  let tmp = 'head'
  const ary = []
  for (let i = str.length - 1; i >= 0; i--) {
    data.insert(Number(str[i]), tmp)
    tmp = Number(str[i])
    ary.push(Number(str[i]))
  }
  data.insert(str[str.length - 1], null)
  // console.log(str, data)
  return {
    data,
    ary,
  }
}

class Demo {
  constructor({ func, ...rest }) {
    // 手动插入链表节点
    // const data = init([1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1].join('')).data
    // const data = init([1,0,0,0,0,0,0,0,0,0,0,0,0,0,1].join('')).data
    // const data1 = init([4, 6, 5].join('')).data
    // const data = init([2, 4, 3].join('')).data
    // const data1 = init([5, 6, 4].join('')).data
    // const data = init([5].join('')).data
    // const data1 = init([5].join('')).data
    // const data = init([0].join('')).data
    // const data1 = init([2].join('')).data
    // const data = init([9].join('')).data
    // const data1 = init([9].join('')).data
    const data = init([9, 8].join('')).data
    const data1 = init([1].join('')).data

    // console.log(data.head.next)
    // console.log('----', data.head.next.next)
    // console.log(data1.head.next)

    // 获取链表数字
    const data2 = new LinkedList(data.head.next)
    const data3 = new LinkedList(data1.head.next)

    const num = data2.display('reverse');
    const num1 = data3.display('reverse');

    const result = sum(num, num1)
    // console.log('result: ', result)
    const res = init(result)
    console.log('res: ', res.data.head.next, res.ary)
    return res
  }
}

new Demo(data)