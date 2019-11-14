/*
 * @lc app=leetcode id=36 lang=javascript
 *
 * [36] Valid Sudoku
 */

/*
 * @lc app=leetcode id=36 lang=javascript
 *
 * [36] Valid Sudoku
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var checkNumberValid = function(len) {
  const rows = new Set()
  const colums = new Set()
  const rects = new Set()
  for (let i = 0; i < 9; i++) {
    rows[i] = ''
    colums[i] = ''
    rects[i] = ''
  }

  function getRectIndex(i, j) {
    // return Math.floor(i / 3) * 3 + Math.floor(j / 3)
    return (~~(i / 3)) * 3 + ~~(j / 3)
  }

  return function(i, j, val) {
    const rectIndex = getRectIndex(i, j)
    if (rows[i].indexOf(val) > -1 || colums[j].indexOf(val) > -1) {
      return false
    }
    if (rects[rectIndex].includes(val)) {
      return false
    }
    rows[i] += val
    colums[j] += val
    rects[rectIndex] += val
    return true
  }
}

var isValidSudoku = function(board) {
  const checkValid = checkNumberValid(9)
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const val = board[i][j]
        if (val !== '.') {
          const isValid = checkValid(i, j, val)
          if (!isValid) {
            return false
          }
        }
      }
    }
    return true
};
// @lc code=end


// @lc code=end

var data1 = [
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
console.log(isValidSudoku(data1))

var data2 = [
  ["8","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
console.log(isValidSudoku(data2))


/**

Input:
[
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
Output: true

Input:
[
  ["8","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
Output: false

 */