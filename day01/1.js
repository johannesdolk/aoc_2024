const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8')
const list = data
  .split('\n')
  .map((l) => l.split('   '))
  .reduce(
    (acc, curr) => {
      return [
        [...acc[0], parseInt(curr[0])],
        [...acc[1], parseInt(curr[1])],
      ]
    },
    [[], []]
  )

const [first, last] = list.map((l) => {
  return l
    .filter(Boolean)
    .map((e) => parseInt(e, 10))
    .sort((a, b) => a - b)
})

let count = 0
first.forEach((element, i) => {
  if (element > last[i]) {
    count += element - last[i]
  } else {
    count += last[i] - element
  }
})
console.error(count)
