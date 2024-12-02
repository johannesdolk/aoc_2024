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

const res = list[0].filter(Boolean).reduce((acc, curr) => {
  const count = list[1].filter((e) => e === curr).length
  acc += curr * count
  return acc
}, 0)

console.log(res)
