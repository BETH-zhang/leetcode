/**
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

示例:

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回数组下标 [0, 1]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/two-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
const args = require('yargs').argv
const nums = args.nums || [2, 7, 11, 15];
const target = args.target || 9
const func = args.func || ''

class Demo {
  constructor(nums, target, func) {

    const result = this[`init${func}`] && this[`init${func}`](nums, target)
    console.log('result', result)
  }

  /**
   * 暴力法
   * 时间复杂度：O(n^2)O(n 2)， 对于每个元素，我们试图通过遍历数组的其余部分来寻找它所对应的目标元素，这将耗费 O(n)O(n) 的时间。因此时间复杂度为 O(n^2)O(n )
   * 空间复杂度：O(1)O(1)
   * @param {*} nums 
   * @param {*} target 
   */
  init(nums, target) {
    // 执行用时: 96 ms
    // 执行用时 :200 ms, 在所有 JavaScript 提交中击败了40.77%的用户
    // 内存消耗 :34.4 MB, 在所有 JavaScript 提交中击败了77.07%的用户

    let sum = 0
    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        sum = nums[i] + nums[j]
        if (sum === target) {
          return [i, j]
        }
      }
    }
    throw new Error('no result')
  }

  /**
   * 哈希表
   * 通过以空间换取速度的方式，我们可以将查找时间从 O(n)O(n) 降低到 O(1)O(1)。哈希表正是为此目的而构建的，它支持以 近似 恒定的时间进行快速查找。我用“近似”来描述，是因为一旦出现冲突，查找用时可能会退化到 O(n)O(n)。但只要你仔细地挑选哈希函数，在哈希表中进行查找的用时应当被摊销为 O(1)O(1)。
   * @param {*} nums 
   * @param {*} target  
   */
  init1(nums, target) {
    // 执行用时: 68 ms
    // 执行用时 :128 ms, 在所有 JavaScript 提交中击败了72.36%的用户
    // 内存消耗 :36.6 MB, 在所有 JavaScript 提交中击败了6.47%的用户
    const map = new Map()
    for (let i = 0; i < nums.length; i++) {
      map.set(nums[i], i)
    }

    for (let i = 0; i < nums.length; i++) {
      let complement = target - nums[i];
      if (map.get(complement) && map.get(complement) != i) {
        return [i, map.get(complement)]
      }
    }
    throw new Error('no result')
  }
}

new Demo(nums, target, func)