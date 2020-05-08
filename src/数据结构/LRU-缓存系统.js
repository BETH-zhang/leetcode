const HashMap = require('./hashMap.js')

console.log('HashMap\n\n\n')

/**
 * 一个缓存系统主要包含几个操作：
 * 1.往缓存中添加一个数据
 * 2.从缓存中删除一个数据
 * 3.在缓存中查找一个数据
 */
// 定义双链表节点
class Node {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.next = null
    this.prev = null
  }

  getKey() {
    return this.key
  }

  setKey(key) {
    this.key = key
  }

  getValue() {
    return this.value
  }

  setValue(value) {
    this.value = value
  }

  getNext() {
    return this.next
  }

  setNext(next) {
    this.next = next
  }

  getPrev() {
    return this.prev
  }

  setPrev(prev) {
    this.prev = prev
  }
}

// 定义双链表
class DoubleLinkedList {
  constructor() {
    this.first = null
    this.last = null
    this.length = 0
  }

  // 添加节点到链表头部
  addFirst(node) {
    if (this.first === null) {
      this.first = node
      this.last = node
    } else {
      const oldFirst = this.first
      oldFirst.setPrev(node)
      node.setNext(oldFirst)
      this.first = node
    }

    this.length++
  }

  // 删除链表里已有node节点
  removeNode(node) {
    if (node === null) {
      return null
    }
    const prevNode = node.getPrev()
    const nextNode = node.getNext()
    if (prevNode !== null) {
      prevNode.setNext(nextNode)
    } else {
      this.first = nextNode
    }

    if (nextNode !== null) {
      nextNode.setPrev(prevNode)
    } else {
      this.last = prevNode
    }

    this.length--
    return node
  }

  // 将链表指定节点node移动到头部
  moveToHead(node) {
    if (node === this.first) {
      return node
    }

    if (node === this.last) {
      this.last = node.getPrev()
    } else {
      node.getNext().setPrev(node.getPrev())
    }

    node.getPrev().setNext(node.getNext())
    
    node.setPrev(null)
    node.setNext(this.first)
    this.first = node

    return node
  }

  // 删除最后一个节点，并返回删除的节点
  removeLast() {
    const node = this.last
    this.removeNode(this.last)
    return node
  }

  // 获取长度
  size() {
    return this.length
  }

  print() {
    let current = this.first
    let string = ''

    while(current) {
      console.log(current.key)
      string += current.value + (current.next ? '_' : '')
      current = current.next
    }

    console.log(string)
    return string
  }
}

// 利用散列表和双线链表实现LRU缓存算法
class LRUCache {
  constructor(limit) {
    this.limit = limit || 10
    this.linkedList = new DoubleLinkedList()
    this.linkedHashMap = new HashMap()
  }

  get(key) {
    const node = this.linkedHashMap.get(key)
    if (node === null) {
      return null
    }

    // 将访问的节点移动到头节点
    this.linkedList.moveToHead(node)
    return node.getValue()
  }

  // 新增node节点到链表头部，如果缓存超过最大容量，则删除尾部节点
  put(key, value) {
    let node = this.linkedHashMap.get(key)
    // 如果节点的key本来就存在，则直接移动到节点头
    if (node !== null) {
      node.setValue(value)
      node = this.linkedList.moveToHead(node)
    } else {
      node = new Node(key, value)
      // 如果key不存在，则新增节点到头部
      if (this.linkedList.size() >= this.limit) {
        // 移除访问时间最远的节点
        const last = this.linkedList.removeLast()
        this.linkedHashMap.remove(last.getKey())
      }
      this.linkedList.addFirst(node)
    }

    // 更新hashMap里的值
    this.linkedHashMap.put(key, node)
  }

  toString() {
    console.log('\n\n')
    console.log('----散列表结构:')
    this.linkedHashMap.print()
    console.log('\n\n')
    console.log('-----链表结构：')
    this.linkedList.print()
  }
}

const cache = new LRUCache(5)
cache.put("a", "a");
cache.put("b", "b");
cache.put("c", "c");
cache.put("d", "d");
cache.put("e", "e");

cache.get('3')

cache.get('a')

cache.put('f', 'f')

cache.get('b')

cache.get('d')

cache.put('c', 'cc')

cache.toString()
