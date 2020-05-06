const LinkedList = require('./LinkedList.js')

/**
 * 循环遍历
 * 
 * 无论是数组，对象，栈，队列，列表还是集合需要通过遍历，拿到我们希望找到的值。
 * 
 * 效率问题？？？
 * 
 * lose lose散列函数，就是简单的把每个key中的所有字母的ASCII码值相加，生成一个数字，作为散列表的key。
 */

class HashMap {
  constructor() {
    // 使用数组存储元素
    this.list = []
  }

  // 转换散列值得到loselose散列函数
  loseloseHashCode(key) {
    let hash = 0
    // 遍历字符串 key 的长度，注意，字符串也是可以通过 length 来获取每一个字节的
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    }
    // 对hash取余，这是为了得到一个比较小的hash值
    // 但是这里取余的对象又不能太大
    return hash % 37
  }

  // 通过loselose散列函数直接在计算出来的位置放入对应的值
  put(key, value) {
    const position = this.loseloseHashCode(key)
    console.log(position + '-' + key)
    this.list[position] = value
  }

  // 同样的，我们想要得到一个值，只要通过散列函数计算出位置就可以直接拿到，无需循环
  get(key) {
    return this.list[this.loseloseHashCode(key)]
  }

  // 这里要注意一下，我们的散列表是松散结构，也就是说散列表内的元素并不是每一个下标index都一定是有值
  // 比如我存储两个元素，一个计算出散列值是14，一个是20，那么其余的位置仍旧是存在的，我们不能删除它，因为一旦删除，我们存储元素的位置也会改变
  // 所以这里要移除一个元素，只要为其赋值为undefined就可以了
  remove(key) {
    this.list[this.loseloseHashCode(key)] = undefined
  }

  print(all) {
    for (let i = 0; i < this.list.length; i++) {
      if (all) {
        console.log(i + ':' + this.list[i])
      } else if (this.list[i] !== undefined) {
        console.log(i + ':' + this.list[i])
      }
    }
  }
}

// const hash = new HashMap()
// hash.put('111', 'jkjkjk')
// hash.put('222', 'kjsoww')
// hash.put('333', 'jdkkdkdkk')
// console.log(hash.get('111'))
// console.log(hash.get('11'))

// hash.remove('333')
// console.log(hash.get('33'))
// hash.print()

// console.log('\n\n\n')

// var conflictHash = new HashMap();
// conflictHash.put("Gandalf",'www.Gandalf.com');//19-Gandalf
// conflictHash.put("John",'www.John.com');//29-John
// conflictHash.put("Tyrion",'www.Tyrion.com');//16-Tyrion
// conflictHash.put("Aaron",'www.Aaron.com');//16-Aaron
// conflictHash.put("Donnie",'www.Donnie.com');//13-Donnie
// conflictHash.put("Ana",'www.Ana.com');//13-Ana

// conflictHash.put("Jonathan",'www.Jonathan.com');//5-Jonathan
// conflictHash.put("Jamie",'www.Jamie.com');//5-Jamie
// conflictHash.put("Sue",'www.Sue.com');//5-Sue
// // 问题：如果不同的key生成了相同的散列值，后面会把前面的值替换

// conflictHash.put("Mindy",'www.Mindy.com');//32-Mindy
// conflictHash.put("Paul",'www.Paul.com');//32-Paul
// conflictHash.put("Nathan",'www.Nathan.com');//10-Nathan

// conflictHash.print();

/**
 * 为了解决散列值冲突的问题：
 * 1.分离链接
 *  核心就是为散列表的每一个位置创建一个链表，并将元素存储在里面。可以说是解决冲突的最简单方法。但是它占用了额外的存储空间。
 * 
 * 2.线性探查
 */

// 这里为什么要创建一个新的用来存储键值对的构造函数？
// 首先我们要知道一点，在分离链接下，我们元素所存储的位置实际上是在链表里面。
// 而一旦在该散列位置下的链表有多个值，我们仍旧需要通过key去找链表中对应的元素
// 换句话说，分离链接下的存储方式是，首先通过key来计算散列值，然后把对应的key和value也就是
// ValuePair存储linkedList
class ValuePair {
  constructor(key, value) {
    this.key = key
    this.value = value
  }

  toString() {
    return `{${this.key}-${this.value}}`
  }
  
}

 // 创建分离链接法下的hashMap
class SeparateHashMap {
  constructor() {
    this.list = []
  }

  loseloseHashCode(key) {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    }
    return hash % 37
  }

  put(key, value) {
    const position = this.loseloseHashCode(key)
    // 这里如果该位置为undefined，说明这个位置没有链表，那么我们就新建一个链表
    if (this.list[position] === undefined) {
      this.list[position] = new LinkedList()
    }

    // 新建之后，我们就通过linkedList类的append方法把valuePair加进去
    // 那么如果上面的判断是 false，也就是有了链表，直接跳过上面的判断执行加入操作就好了
    this.list[position].append(new ValuePair(key, value))
  }

  get(key) {
    const position = this.loseloseHashCode(key)
    // 如果这个位置不是undefined，那么说明存在链表
    if (this.list[position] !== undefined) {
      // 我们要拿到current，也就是链表中的第一个元素进行链表中的遍历
      let current = this.list[position].getHead()
      // 如果current.next不为null说明还有下一个
      while (current.next) {
        // 如果要查找的key是当前链表元素的key，就返回该链表节点的value
        // 这里需要注意，current.element = ValuePair
        if (current.element.key === key) {
          return current.element.value
        }
        current = current.next
      }

      // 这里还要单独判断一下是不是current
      // 总结一下，这段get方法的代码运行方式是从第一个元素的下一个开始遍历，如果到最后还没找到，就看看是不是第一个，如果第一个也不是，那就返回undefined，没有找到想要的元素
      if (current.element.key === key) {
        return current.element.value
      }
    }
    return undefined
  }

  remove(key) {
    const position = this.loseloseHashCode(key)

    if (this.list[position] !== undefined) {
      let current = this.list[position].getHead()
      while(current.next) {
        if (current.element.key === key) {
          this.list[position].remove(current.element)
          if (this.list[position].isEmpty()) {
            this.list[position] = undefined
          }
          return true
        }
        current = current.next
      }

      if (current.element.key === key) {
        this.list[position].remove(current.element)
        if (this.list[position].isEmpty()) {
          this.list[position] = undefined
        }
      }
    }

    return false
  }

  print() {
    for(let i = 0; i < this.list.length; i++) {
      if (this.list[i] !== undefined) {
        console.log(`${i}:${this.list[i]}`)
      }
    }
  }
}

// var separateHash = new SeparateHashMap();
// separateHash.put("Gandalf",'www.Gandalf.com');//19-Gandalf
// separateHash.put("John",'www.John.com');//29-John
// separateHash.put("Tyrion",'www.Tyrion.com');//16-Tyrion
// separateHash.put("Aaron",'www.Aaron.com');//16-Aaron
// separateHash.put("Donnie",'www.Donnie.com');//13-Donnie
// separateHash.put("Ana",'www.Ana.com');//13-Ana
// separateHash.put("Jonathan",'www.Jonathan.com');//5-Jonathan
// separateHash.put("Jamie",'www.Jamie.com');//5-Jamie
// separateHash.put("Sue",'www.Sue.com');//5-Sue
// separateHash.put("Mindy",'www.Mindy.com');//32-Mindy
// separateHash.put("Paul",'www.Paul.com');//32-Paul
// separateHash.put("Nathan",'www.Nathan.com');//10-Nathan

// separateHash.print();

// console.log(separateHash.get("Paul"));
// /*
// www.Paul.com
// */
// console.log(separateHash.remove("Jonathan"));//true
// separateHash.print();

/**
 * 线性探查
 * 其实就是在hashMap中发生冲突的时候，将散列函数计算出的散列值+1，如果+1还是又冲突就+2，直到没有冲突为主
 * 
 * 两种方法，多少有点时间换空间的味道
 */

class LinearHashMap {
  constructor() {
    this.list = []
  }

  loseloseHashCode(key) {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    }
    return hash % 37
  }
  
  put(key, value) {
    let position = this.loseloseHashCode(key)
    // 同样的，若是没有值，就把该值存入
    if (this.list[position] === undefined) {
      this.list[position] = new ValuePair(key, value)
    } else {
      // 如果有值，那么循环到没有为止
      let index = ++position
      while(this.list[index] !== undefined) {
        index++
      }
      this.list[index] = new ValuePair(key, value)
    }
  }

  get(key) {
    let position = this.loseloseHashCode(key)

    if (this.list[position] !== undefined) {
      if (this.list[position].key === key) {
        return this.list[position].value
      } else {
        let index = ++position
        while(this.list[index] === undefined || this.list[index].key !== key) {
          index++
        }
        if (this.list[index].key === key) {
          return this.list[index].value
        }
      }
    }
    return undefined
  }

  remove(key) {
    let position = this.loseloseHashCode(key)
    if (this.list[position] !== undefined) {
      if (this.list[position].key === key) {
        this.list[position] = undefined
      } else {
        let index = ++position
        while (this.list[index] === undefined || this.list[index].key !== key) {
          index++
        }
        if (this.list[index].key === key) {
          this.list[index] = undefined
        }
      }
    }
    return undefined
  }

  print() {
    for(let i = 0; i < this.list.length; i++) {
      if (this.list[i] !== undefined) {
        console.log(`${i}:${this.list[i]}`)
      }
    }
  }
}

var linearHash = new LinearHashMap();
linearHash.put("Gandalf",'www.Gandalf.com');//19-Gandalf
linearHash.put("John",'www.John.com');//29-John
linearHash.put("Tyrion",'www.Tyrion.com');//16-Tyrion
linearHash.put("Aaron",'www.Aaron.com');//16-Aaron
linearHash.put("Donnie",'www.Donnie.com');//13-Donnie
linearHash.put("Ana",'www.Ana.com');//13-Ana
linearHash.put("Jonathan",'www.Jonathan.com');//5-Jonathan
linearHash.put("Jamie",'www.Jamie.com');//5-Jamie
linearHash.put("Sue",'www.Sue.com');//5-Sue
linearHash.put("Mindy",'www.Mindy.com');//32-Mindy
linearHash.put("Paul",'www.Paul.com');//32-Paul
linearHash.put("Nathan",'www.Nathan.com');//10-Nathan

linearHash.print();
console.log(linearHash.get("Paul"));
console.log(linearHash.remove("Mindy"));
linearHash.print();

/**
 * 如何让冲突的可能性变小，就是让计算出的散列值尽可能的不重复
 * 
 * 首先用一个hash变量存储一个质数（智能被1和自身整除的数），将hash与33相乘并加上当前迭代得到ascii码相加，最后对1013取余
 */
const djb2HashCode = (key) => {
  let hash = 5831
  for (let i = 0; i < key.length; i++) {
    hash = hash * 33 + key.charCodeAt(i)
  }
  return hash % 1013
}