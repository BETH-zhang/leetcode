/*
 * @lc app=leetcode id=40 lang=javascript
 *
 * [40] Combination Sum II
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var results = []
var resultObj = {}

var cycleCandidates = (candidates, target, prePosCandidates) => {
  for (var i = candidates.length - 1; i > -1; i--) {
    var newTarget = target - candidates[i]
    var posCandidates = prePosCandidates.slice(0)
    if (newTarget < 0) {
    } else if (newTarget === 0) {
      posCandidates.push(candidates[i])
      console.log('posCandidates: ', posCandidates)
      const newData = posCandidates.sort((a, b) => (a - b))
      if (!resultObj[newData.join('')]) {
        resultObj[newData.join('')] = true
        results.push(newData)
      }
    } else if (newTarget > 0) {
      posCandidates.push(candidates[i])
      cycleCandidates(candidates.slice(0, i), newTarget, posCandidates)
    }
  }
}

var combinationSum2 = function(candidates, target) {
  if (!candidates.length) {
    return []
  }

  results = []
  cycleCandidates(candidates, target, [])
  return results
};
// @lc code=end

combinationSum2([10,1,2,7,6,1,5], 8)
// [[1,1,6],[1,2,5],[1,7],[2,6]]