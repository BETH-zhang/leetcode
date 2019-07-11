/**
给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

示例 1：

输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。
示例 2：

输入: "cbbd"
输出: "bb"

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-palindromic-substring
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
 * @param {string} s
 * @return {string}
 */

var longestPalindrome = function(s) {
  let start = 0, end = 0;
  for (let i = 0; i < s.length; i++) {
    // aba
    const len1 = getMaximumLength(s, i, i);
    // abba
    const len2 = getMaximumLength(s, i, i + 1);
    const len = Math.max(len1, len2);
    if (len > end - start) {
      if (len1 > len2) {
        start = i - (len - 1) / 2;
        end = i + len / 2;
      } else {
        start = i - (len - 2) / 2;
        end = i + len / 2;
      }
    }
  }
  return s.substring(start, end + 1);
};

var getMaximumLength = function(s, left, right) {
  let l = left, r = right;
  while (l >= 0 && r < s.length && s.substring(l, l + 1) == s.substring(r, r + 1)) {
    l--;
    r++;
  }
  return r - l - 1;
}

var val = longestPalindrome('abcdabacc')
console.log(val)