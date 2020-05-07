/**
 * 双向链表
 * 
 * 链表和循环链表的唯一区别就是，最后一个元素指向下一个元素的指针不是null，而是head
 * 循环链表只能从头到尾的循环，而双向循环链表可以两个方向循环
 */

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

    // 双向链表中，多了指向前一个节点元素的指针
    this.prev = null
  }
}

class DoublyLinedList {
  constructor() {
    this.length = 0
    this.head = null

    /**
     * 普通链表只能从头到尾的迭代各节点元素，一方面是因为普通链表中只有一个存储头部节点元素的head变量
     * 但双向两边可以从尾部开始迭代
     */
    this.tail = null
  }

  // 在双向链表中，在控制next指针的同时，我们还要控制prev指针
  insert(position, element) {
    // 在普通链表中在任意位置添加元素有两种情况，一个是添加到头部，另外一个除了头部以外的其他位置
    // 在双向链表中除了这两种情况，还多了一种，添加在链表尾部
    if (position >=0 && position <= this.length) {
      let node = new Node(element)
      let current = this.head
      let previous
      let index = 0
      // 添加到头部的情况
      if (position === 0) {
        // 这里，如果head为null，也就是说该链表是没有任何节点元素的情况，那么加入的这个节点元素在链表中是唯一的
        // 所以，head引用为node，tail的引用也为node
        if (!this.head) {
          this.head = node
          this.tail = node
        } else {
          // 如果，head不为null，说明链表中存在至少一个元素
          // 由于current就是head，那么要插入节点元素的话只要把node的next指针指向current，就说明我们在current前面插入了该节点元素
          node.next = current
          // 因为是双向列表，我们还要给current.prev一个指向
          current.prev = node
          // 那么我们在current前面插入了元素，这里也就要改变head的引用，变为我们插入的node
          head = node
        }
      } else if (position === this.length) {
        // 如果我们想要在尾部插入的情况
        // 这里我们要在尾部加入元素，不用想普通链表那样迭代到最后一项再操作
        // 我们只需要把current直接设置为tail的引用就可以了
        current = this.tail
        // 拿到最后一项节点元素的引用并设置为current
        // 我们只需要把current（tail）的next指针不再是null了，因为我们在它的后面增加了一个“插入元素”，所以它的next指针为node
        // node的prev指针也就理所当然指向current
        current.next = node
        node.prev = current
        // 插入元素完成，此时tail其实是current不是node，所以要更改一下tail的引用
        tail = node
      } else {
        while (index++ < position) {
          // 依次往后移动
          previous = current
          current = current.next
        }
        // 在移动到需要插入节点元素的位置
        // 我们需要插入在current的前面
        node.next = current
        previous.next = node
        // 由于是双向链表，我们不仅仅要修改next指针，还要修改prev指针
        current.prev = node
        node.prev = previous
      }
      this.length++
      return true
    }
    return false
  }

  removeAt(position) {
    if (position > -1 && position < this.length) {
      let current = this.head
      let previous
      let index = 0

      if (position === 0) {
        this.head = current.next
        if (this.length === 1) {
          this.tail = null
        } else {
          this.head.prev = null
        }
      } else if (position === this.length - 1) {
        current = this.tail
        this.tail = current.prev
        this.tail.next = null
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }

        previous.next = current.next
        current.next.prev = previous
      }

      this.length--
      return current.element
    }
    return null
  }
}