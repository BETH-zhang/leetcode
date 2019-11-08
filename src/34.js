/*
 * @lc app=leetcode id=34 lang=javascript
 *
 * [34] Find First and Last Position of Element in Sorted Array
 */

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
    let left = 0
    let right = nums.length - 1
    let mid = Math.floor((left + right) / 2)
    let targetIndex = nums[mid] === target ? mid : null
    let count = 0
    while(left !== right && targetIndex === null && count < nums.length) {
      count++
      if (nums[mid] < target) {
        left = mid
        mid = Math.floor((left + right) / 2)
        console.log('<<', left, mid, right)
      } else if (nums[mid] > target) {
        right = mid
        mid = Math.floor((left + right) / 2)
        console.log('>>', left, mid, right)
      } else if (nums[mid] === target) {
        targetIndex = mid
      }
      if (nums[left] === target) {
        console.log('left', left)
        targetIndex = left
      }
      if (nums[right] === target) {
        console.log('right', right)
        targetIndex = right
      }
    }
    console.log('targetIndex: ', targetIndex)
    if (targetIndex !== null) {
      let leftStop = 0
      let rightStop = 0
      left = targetIndex
      right = targetIndex
      while(!rightStop || !leftStop) {
        console.log(targetIndex, left)
        if (left > 0 && nums[left - 1] === target) {
          console.log('left - 1')
          left = left - 1
        } else {
          leftStop = true
        }
        console.log(targetIndex, right)
        if (right < nums.length - 1 && nums[right + 1] === target) {
          console.log('right + 1')
          right = right + 1
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
console.log(searchRange([1,2,3], 1))
// @lc code=end

