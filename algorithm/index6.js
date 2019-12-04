/**

给定长度分别为 m 和 n 的两个数组，其元素由 0-9 构成，表示两个自然数各位上的数字。现在从这两个数组中选出 k (k <= m + n) 个数字拼接成一个新的数，要求从同一个数组中取出的数字保持其在原数组中的相对顺序。

求满足该条件的最大数。结果返回一个表示该最大数的长度为 k 的数组。

例如在示例1中取出的五个数分别为[9, 8, 6, 5, 3]， 

[9,8,3]在数组2中的先后次序没变， [6,5]在数组1中的先后次序没变

示例 1:

输入:nums1 = [3, 4, 6, 5]nums2 = [9, 1, 2, 5, 8, 3]k = 5输出:[9, 8, 6, 5, 3]
示例 2:

输入:nums1 = [6, 7]nums2 = [6, 0, 4]k = 5输出:[6, 7, 6, 0, 4]
示例 3:

输入:nums1 = [3, 9]nums2 = [8, 9]k = 3输出:[9, 8, 9]

 */

const args = require('yargs').argv
console.log(args)
const i = args.i ? args.i.split(',').map(val => Number(val)) : [3, 4, 6, 5]
const j = args.j ? args.j.split(',').map(val => Number(val)) : [9, 1, 2, 5, 8, 3]
const k = args.k || 5

class Demo {
  constructor(ary1, ary2, k) {
    this.ary1 = ary1
    this.ary2 = ary2
    this.k = k
    this.result = []
    this.init()
  }

  init() {
    let subAry1 = []
    let subAry2 = []
    let mergeNum = []
    let result = []
    for (let i = 0; i < this.k; i++) {
      if (
        i > this.ary1.length ||
        this.k - i > this.ary2.length
      ) {
        continue
      }

      // i 和 k-i 分配给两个数组的大小，必须时小于数组的本身长度的
      subAry1 = this.maxArray(this.ary1, i, 0)
      subAry2 = this.maxArray(this.ary2, k - i, 1)
      console.log('------- ', i, this.k - i, subAry1, subAry2)
      mergeNum = []

      for (let m = 0, n = 0; m < subAry1.length && n < subAry2.length;) {
        while(m < subAry1.length || n < subAry2.length) {
          if (this.compareAry(subAry1, subAry2, m, n) === 1) {
            mergeNum.push(subAry1[m])
            m++
          } else {
            mergeNum.push(subAry2[n])
            n++
          }
        }

        // 只有 mergeNum 的个数为 5 时，是符合条件的数字组合
        if (this.compareAry(mergeNum, result, 0, 0) === 1) {
          result = mergeNum
        }
      }

    }

    this.result = result
  }

  maxArray(ary, n) {
    const stack = []
    const len = ary.length
    for (let i = 0, j = 0; i < len; i++) {
      while (
        len - i + j > n &&
        j > 0 &&
        stack[j - 1] < ary[i]
      ) {
        j--;
      }

      if (j < k) {
        stack[j++] = ary[i]
      }
    }
    return stack
  }

  compareAry(ary1, ary2, m, n) {
    if (ary1[m] === undefined) {
      return -1
    }
    if (ary2[n] === undefined) { // 第二个数字没有值了
      return 1
    }
    if (ary1[m] > ary2[n]) { // 第一个数组的数字大
      return 1
    }
    if (ary2[n] > ary1[m]) {
      return -1
    }
    
    return this.compareAry(ary1, ary2, m + 1, n + 1)
  }

  getResult() {
    return this.result
  }
}

console.log('**** 输入的值：', i, j, k)
console.time('----------')
const d = new Demo(i, j, k)
const result = d.getResult()
console.log('**** 输出的值：', result)
console.timeEnd('----------')