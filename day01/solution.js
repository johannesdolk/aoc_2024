const fs = require('fs')
const data = fs
  .readFileSync('input.txt', 'utf8')
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
let count = 0
if (process.env.part === 'part1') {
  const [first, last] = data.map((l) => {
    return l
      .filter(Boolean)
      .map((e) => parseInt(e, 10))
      .sort((a, b) => a - b)
  })

  first.forEach((element, i) => {
    if (element > last[i]) {
      count += element - last[i]
    } else {
      count += last[i] - element
    }
  })
} else {
  count = data[0].filter(Boolean).reduce((acc, curr) => {
    const count = data[1].filter((e) => e === curr).length
    acc += curr * count
    return acc
  }, 0)
}

console.log(count)
