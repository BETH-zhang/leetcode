/*
请你来实现一个 atoi 函数，使其能将字符串转换成整数。

首先，该函数会根据需要
1.丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。

当我们寻找到的第一个非空字符为
2.正或者负号时，则将该符号与之后面尽可能多的连续数字组合起来，作为该整数的正负号；假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。

该字符串除了有效的整数部分之后也
3.可能会存在多余的字符，这些字符可以被忽略，它们对于函数不应该造成影响。

4-1.容错处理
注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换。

4-2.容错处理
在任何情况下，若函数不能进行有效的转换时，请返回 0。

说明：

假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−2 31,  2 31 − 1]。如果数值超过这个范围，qing返回  INT_MAX (231 − 1) 或 INT_MIN (−231) 。
JavaScript仅支持32位整型数，也即从-2147483648到+2147483647之间的整数

示例 1:

输入: "42"
输出: 42
示例 2:

输入: "   -42"
输出: -42
解释: 第一个非空白字符为 '-', 它是一个负号。
     我们尽可能将负号与后面所有连续出现的数字组合起来，最后得到 -42 。
示例 3:

输入: "4193 with words"
输出: 4193
解释: 转换截止于数字 '3' ，因为它的下一个字符不为数字。
示例 4:

输入: "words and 987"
输出: 0
解释: 第一个非空字符是 'w', 但它不是数字或正、负号。
     因此无法执行有效的转换。
示例 5:

输入: "-91283472332"
输出: -2147483648
解释: 数字 "-91283472332" 超过 32 位有符号整数范围。 
     因此返回 INT_MIN (−231) 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/string-to-integer-atoi
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

const args = require('yargs').argv

const MIX_NUMBER = -Math.pow(2, 31) // 2147483647
const MAX_NUMBER = Math.pow(2, 31) - 1 // -2147483648
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
  // return Math.max(Math.min(parseInt(str) || 0, 2147483647), -2147483648)
  str = str.replace(/(^\s*)|(\s*$)/g, ""); // 去掉字符串最前面的空格，中间的不用管
  var data="";
  for (var i=0; i < str.length; i++){
    if((str.charAt(i) === "-" || str.charAt(i) === "+") && i === 0){
      data = data.concat(str.charAt(i))
    } else if(/^\d+$/.test(str.charAt(i))){
      data = data.concat(str.charAt(i))
    } else {
      break//直接跳出for循环
    };
  }

  console.log('data: ', data)
  if(isNaN(data - 0)) return 0 // "+"/"-"这种情况,返回0

  return Math.max(Math.min(data - 0, 2147483647), -2147483648)
};

console.log('输入：', args.i)
console.log('输出：', myAtoi(args.i.toString()))