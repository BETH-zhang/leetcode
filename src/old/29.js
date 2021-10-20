/*
 * @lc app=leetcode id=29 lang=javascript
 *
 * [29] Divide Two Integers
 * 
Both dividend and divisor will be 32-bit signed integers.
The divisor will never be 0.
Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. For the purpose of this problem, assume that your function returns 231 − 1 when the division result overflows.
 */
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
// 计算机中的移位运算是乘（左移）除（右移）2
const MIX_NUMBER = -Math.pow(2, 31) // 2147483647
const MAX_NUMBER = Math.pow(2, 31) - 1 // -2147483648

// 做减法
// 计算机做加减比较简单
var divide1 = function(dividend, divisor) {
  if (!divisor) return 0

  const val = dividend / divisor
  const result = val > 0 ? Math.floor(val) : Math.ceil(val)
  console.log(`${dividend} / ${divisor} = ${result}`)

  return Math.max(Math.min(result - 0, 2147483647), -2147483648)
};

var divide1 = function(dividend, divisor) {
  if (!divisor) return 0

  var sign = dividend ^ divisor
  var dividend = Math.abs(dividend)
  var divisor = Math.abs(divisor)
  var count = 0
  while (dividend >= divisor) {
    count += 1
    dividend -= divisor
  }

  const result = val > 0 ? Math.floor(val) : Math.ceil(val)
  console.log(`${dividend} / ${divisor} = ${result}`)

  return Math.max(Math.min(result - 0, 2147483647), -2147483648)
};

var divide = function(dividend, divisor) {
  if (!divisor) return 0

  var sign = dividend ^ divisor
  var dividend = Math.abs(dividend)
  var divisor = Math.abs(divisor)
  var count = 0
  // 把除数不断左移，知道它大于被除数
  // 从中间开始找起，找到能被除的最大除数
  while (dividend >= divisor) {
    count += 1
    divisor <<= 1
  }

  var result = 0
  while (count > 0) {
    count -= 1
    divisor >>= 1
    if (divisor <= dividend) {
      result += 1 << count // 这里的移位运算是把二进制（第count + 1位上的1）转换位十进制
      dividend -= divisor
    }
  }
  if (sign < 0) {
    result = -result
  }

  return Math.max(Math.min(result - 0, 2147483647), -2147483648)
};

divide(10, 3)
divide(7, -3)
/**
 * 1001 / 25 十进制 凑整
 * 
 * go 分配内存 切片
 * a / b
 * b << 1
 */
