/*
 * @lc app=leetcode id=16 lang=javascript
 *
 * [16] 3Sum Closest
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
  var sum = 0

  if (nums < 3) {
    sum = nums.reduce(function(a, b) { return a + b })
  } else {
    var newNums = nums.sort((a, b) => (a - b))
    var len = newNums.length
    sum = newNums[0] + newNums[1] + newNums[2]
    var diff = sum - target

    for (var i = 0; i < len; i++) {
      console.log('=========' + i + '====================', newNums, target)
      console.log('sum=', sum, ' diff=', diff)
      var l = i + 1
      var r = len - 1
      
      console.log('l=', l, ' r=', r)
      while (l < r) {
        console.log('------------------------')
        var sumTmp = newNums[i] + newNums[l] + newNums[r]
        console.log('------', i, l , r, '相加=', sumTmp)
        var diffTmp = sumTmp - target
        console.log(sumTmp, diffTmp, diff, 'diffTmp <= diff', Math.abs(diffTmp) < Math.abs(diff))
        if (Math.abs(diffTmp) < Math.abs(diff)) {
          sum = sumTmp
          diff = diffTmp
        }

        console.log(sumTmp, sum, 'sumTmp > sum', sumTmp > sum)
        if (diffTmp > 0) {
          r--
        } else {
          l++
        }
      }
    }
  }

  return sum
};

// console.log(threeSumClosest([1,2,4,8,16,32,64,128], 82)) // 82
// console.log(threeSumClosest([0,1,2], 0)) // 3

// console.log(threeSumClosest([-1, 2, 1, -4], 1)) // 2
// console.log(threeSumClosest([0, 2, 1, -3], 1)) // 0
// console.log(threeSumClosest([1,-3,3,5,4,1], 1)) // 1

