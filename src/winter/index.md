## 第零题：readline()
```
let a = readline()
console.log(a)
```

## 第一题：熟悉批量输入和输出
输入描述：第1行：一个单独的整数N，表示这一组数的数量。
第2-N行：每行是一个整数，表示需要求和的这组数之一。

输出描述：这一组数的和，单独占一行。

```

```

## 第二题：整数反转

输入描述：每一组输入占一行，每一行都是一个单独的字符串类型的整数 。通过调用 readline 方法，获取这一行对应的整数。

输出描述：将整数中的数字部分反转后的结果，进行输出，每一个输出独占一行。

* 正数
* 负数
* 多组输入输出
```
let s

while(s = readline()) {
  let n = Number(s)
  let sign = n / Math.abs(n)

  let r = sign * Number(Math.abs(n).toString().split('').reverse().join())

  console.log(r)
}

Number.MAX_SAFF_INTEGER.tostring()
```


## 第三题：有效的括号
输入描述：每一组输入占一行，每一行都是一个单独的字符串 。通过调用 readline 方法，获取这一行对应的字符串。
字符串是一个只包含了 '('，')'，'{'，'}'，'['，']' 的字符串。如："()"，"()[]{}"，"(]"，"([({}]"。

输出描述：对输入的字符串进行校验，如果字符串符合“左括号必须用相同类型的右括号闭合”并且符合“左括号必须以正确的顺序闭合”的规则则输出 true，否则输出 false。
每一个输出独占一行。

左右匹配都是用栈，语法分析的简化版
lr0
```
let s = readline();
let arr = s.split('')

let stack = []
let map = {
  "}": "{",
  ")": "(",
  "]": "[",
}

let result = true
for (let c of arr) {
  if (c.match(/\(|\[|/{/)) {
    statck.push(c)
  } else {
    if (stack[stack.length - 1] === map[c]) {
      stack.pop()
    } else {
      result = false
      break
    }
    <!-- stack.pop() -->
  }
}

console.log(result)
```

## 第四题：只出现一次的数字
输入描述：每一组输入占一行，每一行都是一个字符串。
该字符串以数组形态呈现，如“[1,2,3]”
该数组是一个非空数组且数组中只有一个元素仅出现一次，其余全部元素出现两次 。通过调用 readline 方法，获取这一行对应的整数。

输出描述：输出数组中，仅出现一次的元素。每个输出独占一行。

```
let s

while(s = readline()) {
  let arr = JSON.parse(s);

  let r = 0
  for (let v of arr) {
    r = r ^ v
  }
  console.log(r)
}
```

亦或运算
* 1^1 = 0
* 0^0 = 0
* 1^0 = 1
* 0b101^0b111 = 2
* 0^x = x
* x^x = 0

## 第五题：回文数
输入描述：每一组输入占一行，每一行都是一个单独的字符串类型的整数。通过调用 readline 方法，获取这一行对应的整数

输出描述：输入数与倒序后的输入数一致输出 true，否则输出 false，每个输出独占一行

```
while (s = readline()) {
  let n = Number(readline())
  if (n < 0) {
    console.log(false)
  } else {
    console.log(n.toString().split('').reverse().join('') === n.toString())
  }
}
```