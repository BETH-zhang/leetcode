/*
罗马数字包含以下七种字符： I ， V ， X ， L ， C ， D 和 M 。

字符 数值
I 1
V 5
X 10
L 50
C 100
D 500
M 1000

例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做 XXVII , 即为 XX + V + II 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII ，而是 IV 。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX 。这个特殊的规则只适用于以下六种情况：

I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。
C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
给定一个整数，将其转为罗马数字。输入确保在 1 到 3999 的范围内。

示例 1:

输入: 3
输出: "III"

示例 2:

输入: 4
输出: "IV"

示例 3:

输入: 9
输出: "IX"

示例 4:

输入: 58
输出: "LVIII"
解释: C = 100, L = 50, XXX = 30, III = 3.

示例 5:

输入: 1994
输出: "MCMXCIV"
解释: M = 1000, CM = 900, XC = 90, IV = 4.
*/
/**
 * @param {number} num
 * @return {}
 */
var intToRoman = function(num) {
  if (num < 1 && num > 3999) return 0

  var cs = {
    1: 'I',
    5: 'V',
    10: 'X',
    50: 'L',
    100: 'C',
    500: 'D',
    1000: 'M',
    special: {
      4: 'IV',
      9: 'IX',
      40: 'XL',
      90: 'XC',
      400: 'CD',
      900: 'CM',
    }
  }
  
  // 例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做 XXVII , 即为 XX + V + II 。
  // M 1000
  // ['0000', '1000', '2000', '3000']
  // var M1 = ['', cs.1000, cs.1000 + cs.1000, cs.1000 + cs.1000 + cs.1000]
  var M = ['', 'M', 'MM', 'MMM']
  // C 100
  // D 500
  // ['000', '100', '200', '300', '400', '500', '600', '700', '800', '900']
  // var C1 = ['', cs.100, cs.100 + cs.100, cs.100 + cs.100 + cs.100, cs.special.400, cs.500, cs.500 + cs.100, cs.500 + cs.100 + cs.100, cs.500 + cs.100 + cs.100 + cs.100, cs.special.900]
  var C = ['', "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"]
  // X 10
  // L 50
  // var X1 = ['', cs.10, cs.10 + cs.10, cs.10 + cs.10 + cs.10, cs.special.40, cs.50, cs.50 + cs.10, cs.50 + cs.10 + cs.10, cs.50 + cs.10 + cs.10 + cs.10, cs.special.90]
  var X = ['', "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"]
  // I 1
  // V 5
  // var I1 = ['', cs.1, cs.1 + cs.1, cs.1 + cs.1 + cs.1, cs.speical.4, cs.5, cs.5 + cs.1, cs.5 + cs.1 + cs.1, cs.5 + cs.1 + cs.1 + cs.1, cs.special.900]
  var I = ['', "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"]
 
  // 开始对当前数字进行分解，求余
  return M[Math.floor(num / 1000)] + C[Math.floor((num % 1000) / 100)] + X[Math.floor((num % 100) / 10)] + I[num % 10];
 }


console.log(3, intToRoman(3))
console.log(4, intToRoman(4))
console.log(9, intToRoman(9))
console.log(58, intToRoman(58))
console.log(1994, intToRoman(1994))
