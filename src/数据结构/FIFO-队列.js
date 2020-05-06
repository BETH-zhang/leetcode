/**
 * FIFO
 * 
 * 最简单的一种缓存算法，设置缓存上线，当达到了缓存上限的时候，按照（先进先出）的策略，再增加进新的 K-v
 * 
 * 使用了一个对象作为缓存，一个数组配合着记录添加进对象时的顺序，判断是否到达上限取数组中的第一个元素key，对应删除对象中的键值
 */

/**
 * FIFO队列算法实现缓存 
 * 需要一个对象和一个数组作为辅助
 * 数组记录进入顺序
 */

class FifoCache {
  constructor(limit) {
    this.limit  = limit || 10
    this.map = {}
    this.keys = []
  }

  set(key, value) {
    let map = this.map
    let keys = this.keys
    // 如果map中不存在key的键值对
    if (!Object.prototype.hasOwnProperty.call(map, key)) {
      if (keys.length === this.limit) {
        delete map[keys.shift()] // 先进先出，删除队列第一个元素
      }
      keys.push(key)
    }
    map[key] = value // 无论存在与否都对map中的key赋值
  }

  get(key) {
    return this.map[key]
  }
}

