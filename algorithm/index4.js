/**
 * 计算在一个 32 位的整数的二进制表示中有多少个 1
* 需要考虑负数的情况

例如：
32 	=> 10000 	=> 1
100 	=> 1100100 	=> 3
 */

const args = require('yargs').argv
const digital = args.i

class Main {
  constructor() {
    this.binary = 0
  }

  digitalTobinary(value) {
    this.binary = value.toString(2);
  }

  search(value) {
    let count = 0
    let val = value
    while (val >= 1) {
      if (val % 2) {
        count++
      }
      val = Math.floor(val / 2)
    }
    console.log(`${value} 的二进制数 ${this.binary} 中有 ${count} 个1`)
  }
}

const main = new Main()
main.digitalTobinary(digital)
main.search(digital)