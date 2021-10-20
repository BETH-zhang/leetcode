/**
 * 2 的 10 次方 1024
 */
// （1 + 2）* 2
const Peach = (n) => {
  let sum = 0
  if (n === 10) {
    return 1
  } else {
    sum = Peach(n + 1)
    sum = (sum + 2) * 2
  }
  if (n == 1) {
    console.log(`第一天共有${sum}个桃子`)
  }
  return sum
}

Peach(1)