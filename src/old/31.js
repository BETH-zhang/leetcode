/*
 * @lc app=leetcode id=31 lang=javascript
 *
 * [31] Next Permutation
 * 只允许使用下一个更大的排列
 * 必须原地修改，只允许使用额外常数空间
 * 
 * 找nums[i] 比nums[i + 1]小的时候
 * nums[i] 和 nums[i + 1]到 nums[nums.length - 1]当中找到一个最小的比nums[i]大的元素交换
 * 把nums[i + 1]到nums[nums.length - 1]排序
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
  if (!nums) {
    return []
  }
  if (nums.length === 1) {
    return nums
  }
  var isNextPermutation = false
  // 1 3 2
  // 2 1 3
  var startIndex = 0
  for (var i = nums.length - 2; i >= 0; i--) {
    if (nums[i] < nums[i + 1] && !isNextPermutation) {
      isNextPermutation = 1
      startIndex = i
      endIndex = i + 1
      for (var j = i + 1; j < nums.length; j++) {
        if (nums[j] < nums[endIndex] && nums[j] > nums[i]) {
          endIndex = j
        }
      }

      isNextPermutation = true
      var tmp = nums[startIndex]
      nums[startIndex] = nums[endIndex]
      nums[endIndex] = tmp
    }
  }

  if (isNextPermutation) {
    nums = nums.slice(0, startIndex + 1).concat(nums.slice(startIndex + 1).sort((a, b) => a - b))
  } else if (!isNextPermutation) {
    nums.sort((a, b) => (a - b))
  }
  console.log(isNextPermutation, nums)
  return nums
};
// @lc code=end

// console.log(nextPermutation([1,2,3]).join('') === [1,3,2].join(''))
// console.log(nextPermutation([3,2,1]).join('') === [1,2,3].join(''))
// console.log(nextPermutation([1,1,5]).join('') === [1,5,1].join(''))
console.log(nextPermutation([1,3,2]).join('') === [2,1,3].join('')) // 不知所以

/** C3 2
1 2 3

1 3 2
2 1 3

2 3 1
3 1 2
3 2 1
 */
/** C 4 3
1 2 3 4
1 2 4 3
1 3 2 4
1 3 4 2
1 4 2 3
1 4 3 2
2 1 3 4
2 1 4 3
 */
