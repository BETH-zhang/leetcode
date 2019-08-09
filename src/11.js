/**
 Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.

 Note: You may not slant the container and n is at least 2.
 
 The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.

 Example:
 
 Input: [1,8,6,2,5,4,8,3,7]
 Output: 49
 */

 /**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  var right = height.length - 1
  if (right < 1) {
    return 0
  }
  var left = 0
  var max = 0
  while (left < right) {
    const tmp = (right - left) * Math.min(height[left], height[right])
    if (tmp > max) {
        max = tmp
    }
    if (height[left] === height[right]) {
      left++
      right--
    } else if (height[left] < height[right]) {
      left++
    } else {
      right--
    }
  }
  return max
};

console.log(maxArea([1,8,6,2,5,4,8,3,7]))