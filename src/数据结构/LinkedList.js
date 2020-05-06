/**
 * 链表存储有序的元素集合，但是和数组不同的是，链表中的元素在内容中的存储并不是连续的。
 * 每一个链表元素都包含了一个存储元素本身的节点和一个指向下一个元素的引用
 *            
 *         开始节点0
 * head ---> a1      1
 *           v ---> a2          n - 1
 *                  v ... ---> an
 *                             null 或 undefined 
 * 
 * 相对于数组，链表的一个好处就是增删的元素无需移动其他元素，只要更改指针的指向就可以了。
 * 但是如果需要访问元素，就需要从头循环迭代
 * 
 * 1.append(ele)
 * 2.insert(position, ele)
 * 3.remove(ele)
 * 4.indexOf(ele)
 * 5.removeAt(position)
 * 6.isEmpty()
 * 7.size()
 * 8.toString()
 */

// node是链表中的单独元素，但是这个元素中又包含自身的值和指向下一个node的指针
class Node {
  constructor(element) {
    // node的自身元素
    this.element = element
    /**
     * 这个next要特别注意，它在理论上是指向链表下一个节点元素的指针，但是在js的实现中，其实这个指针
     * 不过是一个对象的索引，而这个索引所包含的就是下一个node
     * 
     * {
     *  element: 1,
     *  next: {
     *    element: 2,
     *    next: {
     *      element: 3,
     *      next...
     *    }
     *  }
     * }
     * 这种对象的层层嵌套，也可以解释为什么在中间插入链表元素时，
     * 需要一层一层的迭代到需要插入的位置
     * 
     * next指针，指向的是下一个node节点元素的整体，不单单只是node中的element元素
     */
    this.next = null
  }
}

class LinkedList {
  constructor() {
    // 链表长度初始化
    this.length = 0
    // 在链表中，我们需要存储第一个节点元素的引用，也就是head，在没有节点元素的时候初始化为null
    this.head = null
  }

  append(element) {
    // 两种情况
    // 1.没有节点，链表的长度是0
    // 2.已经存在至少一个节点元素
    // 变量声明，append添加的element应该是node，所以通过Node类进行包装
    let node = new Node(element)
    // 这里存在一个问题，那就是我们在给链表添加节点元素时，只有head的引用，也就是我们只知道head是什么，但其他的我们不概不知
    // 所以这里声明一个current变量，用来存储我们当前的节点是什么
    let current
    // 如果head是null，说明该链表是没有节点元素的，因为有节点元素的话head不可能为null（head会指向第一个节点元素）
    // 那么既然如此，我们的head=node就可以了
    // 这里的‘=’，实在让人迷茫，既然是指针，为什么要赋值？
    // 因为无论是head、node.next(链表节点元素的指针)，还是current还是下面会声明的previous，都是存储当前位置信息的一个存储器
    // console.log('head:', this.head)
    if (this.head === null) {
      this.head = node
    } else {
      // 如果head ！= null，说明该链表至少有一个节点元素，那么当前的current自然就是head，因为我们要从head开始迭代到结尾
      current = this.head
      // 上面的current已经是head了，那么无论是只有一个节点元素还是多个节点元素，最后一个节点元素的next必定是null
      while (current.next) {
        current = current.next
      }
      // 既然我们找到了链表中的最后一个节点元素，那么把该节点元素的next = node就好了
      current.next = node
    }
    // 增加单位长度
    this.length++
  }

  insert(position, element) {
    let current
    // 如果position小于0并且大于该链表的长度，说明这个position不合法
    if (position >= 0 && position <= this.length) {
      let node = new Node(element)
      // 初始化current为head
      current = this.head
      // 新增了一个previous，这个previous是为了衔接需要插入的节点元素的
      let previous
      // 这个index不是length，是为了记录限定循环的计数器，作用类似current和previous
      let index = 0
      // 这里，如果position是0，意味在头部插入元素
      if (position === 0) {
        // 新建节点元素的指针（next）就指向当前元素
        node.next = current
        this.head = node
      } else {
        // 那么如果想要在除了 第一个元素的其他位置插入元素
        // 在没有到达想要插入的位置的时候，我们需要迭代替换previous和current，使其依次的往后移动
        while (index++ < position) {
          // 这里就是每一次的移动，前一个等于当前，当前的又变成下一个（就这样依次移动到指定的position位置）
          previous = current
          current = current.next
        }
        // 那么在到达了这个位置后，我们需要把新建的node节点元素插入近previous和current
        // 也就是改变node节点元素和previous的指针，使node节点元素指向当前的current。而previous的指针指向node
        // 这样也就完成了节点元素在指定位置的插入
        node.next = current
        previous.next = node
      }

      // 插入成功
      this.length++
      return true
    }
    return false
  }

  removeAt(position) {
    console.log('position: ', position)
    // 同样的合法值校验
    if (position > -1 && position < this.length) {
      let current = this.head
      let previous
      let index = 0
      // 如果要移除第一个节点元素，直接把head的指针指向指向当前元素（current）的下一个（.next）就可以了
      // 因为我们中断了head和current的链接，直接使current不存在于链表中，这样我们无论如何迭代都获取不到此时的current
      // 这样操作之后，我们只要等待js垃圾回收器回收它就好了
      if (position === 0) {
        this.head = current.next
      } else {
        while(index++ < position) {
          previous = current
          current = current.next
        }
        // 这里我们迭代到了我们想要移除的元素的位置，同样中断current的在链表中的链接，也就删除了该节点元素
        previous.next = current.next
      }
      this.length--
      return current.element
    }
    return null
  }

  indexOf(element) {
    let current = this.head
    let index = 0
    while (current) {
      // 如果currnet不为null，并且如果element和current的element相等，说明找到了
      // 直接返回index
      if (element === current.element) {
        return index
      }
      index++
      current = current.next
    }

    return -1
  }

  remove(element) {
    let index = this.indexOf(element)
    console.log('index: ', index)
    return this.removeAt(index)
  }

  isEmpty() {
    return this.length === 0
  }

  size() {
    return this.length
  }

  getHead() {
    return this.head
  }

  toString() {
    let current = this.head
    let string = ''

    while(current) {
      string += current.element + (current.next ? '_' : '')
      current = current.next
    }

    return string
  }

  print() {
    console.log(this.toString())
  }
}

module.exports = LinkedList

// var list = new LinkedList();

// list.append(1);
// list.append(2);
// list.append(3);
// list.append(4);
// list.append(5);
// list.print();
// list.insert(2, 99);
// list.print();
// list.removeAt(0);
// list.print();