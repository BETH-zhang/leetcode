/*
 * @lc app=leetcode id=18 lang=javascript
 *
 * [18] 4Sum
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */

var getTargetAry = (target, newNums, targetIndex, direction) => {
  var left1 = 0
  var left2 = targetIndex
  var right1 = targetIndex + 1
  var right2 = newNums.length - 1
  var targetAry = []

  while (left1 < left2 || right1 < right2) {
    const a = newNums[left1]
    const b = newNums[left2]
    const c = newNums[right1]
    const d = newNums[right2]
    const sum = a + b + c + d
    if (sum === target) {
      targetAry.push([a, b, c, d])
      // 可以向中间走
      if (direction === 'inner') {
        left1++
        right2--
        // 可以向两边走
      } else if (direction === 'outer') {
        left2--
        right1++
      }
    } else if (sum > target) {
      if (direction === 'inner') {
        left1++
      } else {
        left2--
      }
    } else if (sum < target) {
      if (direction === 'inner') {
        right2--
      } else {
        right1++
      }
    }
  }

  return targetAry
}

var fourSum = function(nums, target) {
  if (nums.length < 4) {
    const sum = nums.reduce(function(a, b) { return a + b })
    return sum === target ? nums : []
  } else {
    var newNums = nums.sort((a, b) => (a - b))
    var targetIndex = 0
    var diffTarget = target
    for (var index = 0; index < newNums.length; index++) {
      const item = newNums[index];

      const diffTargetTmp = Math.abs(item - target)
      if (diffTargetTmp === 0) {
        targetIndex = index
        diffTarget = diffTargetTmp
        break
      } else if (diffTargetTmp <= diffTarget) {
        targetIndex = index
        diffTarget = diffTargetTmp
      }
    }

<<<<<<< HEAD
    const targetAry = getTargetAry(target, newNums, targetIndex)

=======
    var targetAry1 = getTargetAry(target, newNums, targetIndex, 'inner')
    var targetAry2 = getTargetAry(target, newNums, targetIndex, 'outer')
    
    var ary = targetAry1.concat(targetAry2)
    var aryObj = {}
    var targetAry = []

    ary.forEach((item) => {
      var key = item.join('')
      if (!aryObj[key]) {
        aryObj[key] = 1
        targetAry.push(item)
      }
    })
    
>>>>>>> 902772fe151855f51ed66f781d4293a6a0e54bd3
    return targetAry
  }
};

console.log(fourSum([1, 0, -1, 0, -2, 2], 0))