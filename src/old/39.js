/*
 * @lc app=leetcode id=39 lang=javascript
 *
 * [39] Combination Sum
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var results = []

var cycleCandidates = (candidates, target, prePosCandidates) => {
  for (var i = candidates.length - 1; i > -1; i--) {
    var newTarget = target - candidates[i]
    var posCandidates = prePosCandidates.slice(0)
    if (newTarget < 0) {
    } else if (newTarget === 0) {
      posCandidates.push(candidates[i])
      results.push(posCandidates)
    } else if (newTarget > 0) {
      posCandidates.push(candidates[i])
      cycleCandidates(candidates.slice(0, i + 1), newTarget, posCandidates)
    }
  }
}

var combinationSum = function(candidates, target) {
  if (!candidates.length) {
    return []
  }

  results = []
  cycleCandidates(candidates, target, [])
  return results
};
// @lc code=end


console.log(combinationSum([2,3,6,7], 7))
console.log(combinationSum([2,3,5], 8))
console.log(combinationSum([1, 2], 2))
console.log(combinationSum([1], 1))
console.log(combinationSum([1], 0))