/**
 * LRU（Least recently used 最近最少使用）算法
 * 
 * 最近被访问的数据那么它将来访问的概率就大，缓存满的时候，优先淘汰最无人问津者。
 * 
 * 思路：基于一个双链表的数据结构，在没有满员的情况下，新来的k-v放在链表的头部，
 * 以后每次获取缓存中的k-v时就将该k-v移到最前面，缓存满的时候优先淘汰末尾的
 * 
 * 双向链表的特点，具有头尾指针，每个节点都有 prev（前驱）和next（后继）指针分别指向她的前一个和后一个节点
 * 
 * 关键点：在双链表的插入过程中要注意顺序问题，一定时在保持链表不断的情况下先处理指针，最后才将原头指针指向
 * 新插入的元素，在代码的实现中注意看我在注释中数名的顺序注意点。
 */

class LruCache {
  constructor(limit) {
    this.limit = limit || 10
    // head 指针指向表头元素，即为最常用的元素
    this.head = this.tail = undefined
    this.map = {}
    this.size = 0
  }

  get(key, IfreturnNode) {
    let node = this.map[key]
    // 如果查不到含有‘key’这个属性的缓存对象
    if (node === undefined) return
    // 如果查找到的缓存对象已经是 tail （最近使用过的）
    if (node === this.head) {// 判断该节点是不是第一个节点
      //是的画，不用移动元素，直接返回
      return returnnode ? node : node.value
    }
    // 不是头结点，铁定要移动元素了
    if (node.prev) {
      // 首先要判断该节点是不是有前驱
      if (node === this.tail) { // 有前驱，若是尾节点的话多一步，让尾指针指向当前节点的前驱
        this.tail = node.prev
      }
      // 把当前节点的后继交接给当前节点的前驱去指向
      node.prev.next = node.next
    }
    if (node.next) {// 判断该节点是不是有后继
      // 有后继直接让后继的前驱指向当前节点的前驱
      node.next.prev = node.prev
      // 整个一个过程就是把当前节点拿出来，并且保证链表不断，下面开始移动当前节点了
    }
    node.prev = undefined // 移动到最前面，所以没了前驱
    node.next = this.head // 注意！！！这里要把之前的排头给接到手，让当前节点的后继指向原开头
    if (this.head) {
      this.head.prev = node // 让之前的排头的前驱指向现在的节点
    }
    this.head = node // 完成了交接，才能执行此步。不然就找不到之前的排头了
    return IfreturnNode ? node : node.value
  }

  set(key, value) {
    // 之前的算法可以直接存 k-v 但是现在要不简单的 k-v 封装称一个满足双链表节点
    // 1.查看是否已经有该节点
    let node = this.get(key, true)
    if (!node) {
      // 判断缓存是否达到上限
      if (this.size === this.limit) {
        // 达到了，要删最有一个节点
        if (this.tail) {
          this.tail = this.tail.prev
          this.tail.prev.next = undefined
          // 平滑断链之后，销毁当前节点
          this.tail.prev = this.tail.next = undefined
          this.map[this.tail.key] = undefined
          // 当前缓存内存释放一个槽位
          this.size--
        }
        node = {
          key: key
        }
        this.map[key] = node
        if (this.head) {  // 判断缓存里面是不是有节点
          this.head.prev = node
          node.next = this.head
        } else {
          // 缓存里没有值，直接让head指向新节点就好
          this.head = node
          this.tail = node
        }
        this.size++ // 减少一个缓存槽位
      }
    }
    // 节点存不存在都要给她重新赋值
    node.value = value
  }
}