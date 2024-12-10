const fs = require('fs')
const file = fs.readFileSync('input.txt', 'utf8').split('\n')

const add = (a, b) => a + b
const multiply = (a, b) => a * b
const concat = (a, b) => parseInt(`${a}${b}`, 10)

const operations = [add, multiply]
if (process.env.part === 'part2') {
  operations.push(concat)
}

const count = file
  .map((line) => line.split(':'))
  .reduce((acc, curr, index) => {
    const answer = parseInt(curr[0].replace(':', ''), 10)
    const values = curr[1]
      .trim()
      .split(' ')
      .map((value) => parseInt(value, 10))

    const match = calcValues(values[0], 1, values, answer, index)

    if (match) {
      return (acc += answer)
    }

    return acc
  }, 0)

function calcValues(value, index, values, answer, loopIndex) {
  if (index === values.length) {
    if (value === answer) {
      return true
    }
    return false
  }

  for (let operation of operations) {
    const newValue = operation(value, values[index])

    if (calcValues(newValue, index + 1, values, answer, loopIndex)) return true
  }
}

console.log(count)
