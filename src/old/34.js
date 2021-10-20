/*
 * @lc app=leetcode id=34 lang=javascript
 *
 * [34] Find First and Last Position of Element in Sorted Array
 */

var binarySearch = (arr, target) => {
  var low = 0
  var height = arr.length - 1
  var mid;
  while (low <= height) {
    mid = ~~((low + height) / 2)
    if (arr[mid] === target) {
      return mid
    } else if (arr[mid] < target) {
      low = mid + 1
    } else {
      height = mid - 1
    }
  }
  return -1
}

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    if (!nums || !nums.length) {
      return [-1, -1]
    }
    const targetIndex = binarySearch(nums, target)
    // console.log('targetIndex: ', targetIndex)
    if (targetIndex !== null) {
      let left = targetIndex
      let right = targetIndex
      let leftStop = false
      let rightStop = false
      let count = 0
      while ((!leftStop || !rightStop) && count < 10) {
        count++
        const leftIndex = binarySearch(nums.slice(0, left), target)
        // console.log('left--', left, leftIndex)
        if (leftIndex > -1) {
          left = leftIndex
        } else {
          leftStop = true
        }
        const rightIndex = binarySearch(nums.slice(right + 1), target)
        // console.log('right--', right, rightIndex)
        if (rightIndex > -1) {
          right = nums.slice(0, right + 1).length + rightIndex
        } else {
          rightStop = true
        }
      }
      return [left, right]
    } else {
      return [-1, -1]
    }
};

// console.log(searchRange([5,7,7,8,8,10], 8), [3,4])
// console.log(searchRange([5,7,7,8,8,10], 6), [-1,-1])
// console.log(searchRange([1], 1))
// console.log(searchRange([1,3], 1))
// console.log(searchRange([1,4], 4))
// console.log(searchRange([1,2,3], 1))
console.log(searchRange([2, 2], 2))
// @lc code=end

