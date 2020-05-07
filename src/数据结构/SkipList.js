/**
 * 跳表全称跳跃列表，允许快速查询，插入和删除一个有序连续匀速的数据链表。
 * 跳表的平均查找和插入时间复杂度都是O(logn).
 * 快速查询是通过维护一个多层次的链表，且每一层链表总的元素是前一层链表元素的子集。
 * 
 * 对于单链表，即使数据是已经排序好的，想要查询其中的一个数据，只能从头开始遍历链表。这样效率很低，时间复杂度很高 O(n)
 * 如何提高查询效率？
 * 我们可以为链表建立一个“索引”，这样查找起来就会更快，如下图所示，我们在原始链表的基础上，每两个节点提取一个结点建立索引，我们把抽取出来
 * 的结点叫做索引层或者索引，down表示指向原始链表结点的指针
 * 
 * 如果一个链表有n个结点，如果每两个结点抽取出一个结点建立索引的话，那么第一级索引的结点大约就是 n/2，第二级索引的结点数大约为n / 4
 * 一次类推第m级索引的节点数大约为n/(2^m)
 * 假如一共有m级索引，第m级的节点数为两个，通过上边我们找到的规律，得出 n /(2^m) = 2,从而求的 m = log(n) - 1.如果加上原始链表，那么整个跳表的高度就是 log(n).
 * 我们在查询跳表的时候，如果每一层都需要遍历k个结点，那么最终的时间复杂度就是 O(k * log(n))
 * k = 2
 * 
 * level 4: & - - - - - - - & - - - - - - - &
 * level 3: & - - - - - - - & - - - - - - - & - - - - - - - &
 * level 2: & - - - & - - - & - - - & - - - & - - - & - - - &
 * level 1: & - & - & - & - & - & - & - & - & - & - & - & - &
 * 
 * 跳表的查询任意数据的时间复杂度为 O(2*log(n))，前边的常数 2 可以忽略，为 O(log(n))。
 * 
 * 插入操作流程：
 * 1.从顶层链表开始遍历，寻找插入点
 *  插入元素 x 和当前指向的节点值 y 比较
 *  x < y：从当前查找位置，下降一层
 *  x > y: 继续向前遍历
 * 重复上面步骤直到结束，遍历时记录每一层的最后遍历位置，这里用update表示，也就是要插入的位置
 * 2.申请新节点，将新元素放入，随机产生一个层数，扩大1步骤中的层记录，将新层的值修改为头节点
 * 3.将update记录的指向对应层的指针指向新的节点，新节点的各个层的指针指向后一个节点。（和普通链表的插入时调整指针是类似的，只不过这里是多层调整）
 * 4.修改跳跃列表的层数
 * 
 * 删除操作：
1.从顶层链表开始遍历,寻找删除位置点。
具体：
插入元素x和当前指向的节点的值y比较：
x < y:从当前查找位置，下降一层
x > y:继续向前遍历
重复上面步骤直到结束。遍历时记录每一层的最后遍历位置，这里用update表示，也就是要删除的元素。
2.取出最底层的最后遍历位置的元素，与要删除的元素对比，如果相等，则此元素是要删除的元素，与插入类似，将update记录的对应层的指针指修改为删除节点上的对应层上的指针值（和普通链表的删除时调整指针是类似的，只不过这里是多层调整），释放
4.修改跳跃列表的层数。'

https://zhuanlan.zhihu.com/p/68516038
https://www.cnblogs.com/difeng/p/7137918.html
 */

class Node {
  constructor(key, value, level) {
    this.key = key
    this.value = value
    this.forwards = []
    for (let i = 0; i < level; i++) {
      this.forwards[i] = null
    }
  }

  toString() {
    const str =  `Skip Node [key = ${this.key}, value=${this.value}, forward=${this.forwards.join(' ')}]`
    console.log(str)
    return str
  }
}

class SkipList {
  constructor(maxLevel) {
    this.head = new Node()
    this.random = Number(`${Math.random()}`.slice(2))
    this.level = 0
    this.length = 0
  }

  get(value) {
    const current = this.head
    
    for (let i = this.levelCount - 1; i <=0 ; i--) {
      while (current.forwards[i] !== null && current.forwards[i].data < value) {
        current = current.forwards[i]
      }
    }

    if (current.forwards[0] !== null && current.forwards[0].data === value) {
      return current.forwards[0]
    }
    return null
  }

  put(key, value) {
    const newLevel = this.randomLevel()
    if (newLevel > this.level) {
      let current = this.head
      this.head = new Node(null, null, newLevel)

      for (let i = 0; i < current.forwards.length; i++) {
        this.head.forwards[i] = current.forwards[i]
      }
      this.level = newLevel
    }

    const update = []
    const newNode = new Node(key, value, newLevel)

    let x = this.head
    for (let i = this.level; i >= 0; i--) {
      while (x.forwards[i] !== null && x.forwards[i].key < 0) {
        x = x.forwards[i]
      }
      update[i] = x
    }


    const newNode = new Node()
    newNode.data = value
    newNode.maxLevel = level
    const update = []

    for (let i = 0; i < level; i++) {
      update[i] = this.head
    }

    let current = this.head
    for (let i = level - 1; i >=0; i--) {
      while (current.forwards[i] !== undefined && current.forwards[i].data < value) {
        current = current.forwards[i]
      }
      update[i] = current
    }

    for (let i = 0; i < level; i++) {
      newNode.forwards[i] = update[i].forwards[i]
      update[i].forwards[i] = newNode
    }

    if (this.levelCount < level) {
      this.levelCount = level
    }
  }

  remove(value) {
    const update = []
    let current = this.head
    for (let i = this.levelCount - 1; i <= 0; i--) {
      while (current.forwards[i] !== null && current.forwards[i].data < value) {
        current = current.forwards[i]
      }
      update[i] = current
    }

    if (current.forwards[0] !== null && current.forwards[0].data === value) {
      for (let i = this.levelCount - 1; i >= 0; i--) {
        if (update[i].forwards[i] !== null && update[i].forwards[i].data === value) {
          update[i].forwards[i] = update[i].forwards[i].forwards[i]
        }
      }
    }
  }

  randomLevel() {
    let level = 1
    for (let i = 1; i < this.maxLevel; i++) {
      if (this.random % 2 === 1) {
        level++
      }
    }
    return level
  }

  print() {
    let current = this.head
    while(current && current.forwards[0] !== null) {
      console.log('\n')
      console.log(current.forwards[0])
      current = current.forwards[0]
    }
  }
}

const skip = new SkipList(5)
skip.put(1)
skip.put(2)
skip.put(3)
skip.put(4)
skip.put(5)
// skip.put(6)
// skip.put(7)
// skip.put(8)
// skip.put(9)
// skip.put(10)
// skip.put(11)

skip.print()