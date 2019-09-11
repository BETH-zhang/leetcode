/**
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

For example, given n = 3, a solution set is:

[
  "(())",
  "()()"
]
[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
 */
/*
 * @lc app=leetcode id=22 lang=javascript
 *
 * [22] Generate Parentheses
 */
/**
 * @param {number} n
 * @return {string[]}
 */

var ans;

function dfs(s, left, right, n) {
  console.log(s, left, right, n)
  if (left === n && right === n) {
    ans.push(s)
    return
  }

  if (left + 1 <= n) {
    dfs(s + `(`, left + 1, right, n)
  }

  if (right + 1 <= n && right + 1 <= left) {
    dfs(s + ')', left, right + 1, n)
  }
}

var generateParenthesis = function(n) {
  ans = []

  dfs('', 0, 0, n)

  return ans
}

// console.log(generateParenthesis(0))
console.log(generateParenthesis(2))
// console.log(generateParenthesis(3))
// console.log(generateParenthesis(5))

