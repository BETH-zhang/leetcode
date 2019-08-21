/*
 * @lc app=leetcode id=17 lang=javascript
 *
 * [17] Letter Combinations of a Phone Number
 * 
 * 0 0,0 + 1,0   0 0 0    
 * 1 0,0 + 1,1   0 1 0
 * 2 0,0 + 1,2   0 2 0
 * 
 * 3 0,1 + 1,0   1 0 1
 * 4 0,1 + 1,1   1 1 1
 * 5 0,1 + 1,2   1 2 1
 * 
 * 6 0,2 + 1,0   2 0 2
 * 7 0,2 + 1,1   2 1 2
 * 8 0,2 + 1,2   2 2 2
 * 
 * 0 0,0  1,0   
 * 1 0,0  1,1
 * 2 0,0  1,2
 * 3 0,1  1,0
 * 4 0,1  1,1
 * 5 0,1  1,2
 */
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  var digitAry = [
    [],
    ['0', '1'],
    ['a', 'b', 'c'],
    ['d', 'e', 'f'],
    ['g', 'h', 'i'],
    ['j', 'k', 'l'],
    ['m', 'n', 'o'],
    ['p', 'q', 'r', 's'],
    ['t', 'u', 'v'],
    ['w', 'x', 'y', 'z'],
  ]
  if (!digits) {
    return []
  } else if (digits - 0 < 10) {
    return digitAry[digits]
  }
  var digitLen = [0, 2, 3, 3, 3, 3, 3, 4, 3, 4]

  var size = 1
  var len = []
  var arr = digits.toString().split('').map((num, index) => {
    size *= digitLen[num]
    len[index] = digitLen[num]
    return digitAry[num]
  })

  var letterCombinations = []

  // console.log(arr, size, len)
  for (var i = 0; i < size; i++) {
    // console.log('i----', i, arr)
    var letter = ''
    var treeSize = size
    var row = i
    for (var j = 0; j < len.length; j++) {
      var strLen = len[j]
      treeSize = treeSize / strLen
      // console.log('///', strLen, row, treeSize)
      var x = j
      var y = Math.floor(row / treeSize)
      row = i % treeSize
      // console.log(x, y)
      letter += arr[x][y]
    }
    letterCombinations.push(letter)
  }
  
  return letterCombinations
};

console.log(letterCombinations(2))
console.log(letterCombinations(12))
console.log(letterCombinations(234))