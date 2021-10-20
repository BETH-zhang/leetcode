/**
 */

const args = require('yargs').argv
const data = {
  num1: args.num1 || 342,
  num2: args.num2 || 465,
  func: args.func || ''
}

class Demo {
  constructor({ func, ...rest }) {

    const result = this[`init${func}`] && this[`init${func}`](rest)
    console.log('result', result)
  }

  init({ num1, num2 }) {
    console.log(num1, num2)
  }
}

new Demo(data)