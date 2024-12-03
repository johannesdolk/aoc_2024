const fs = require('fs')
const data = fs.readFileSync('input3.txt', 'utf8')

const list = data
  .match(/mul\(\d{1,3},\d{1,3}\)/g)
  .map((l) => [...l.matchAll(/\d{1,3}/g)])
  .map((l) => l.map((l) => parseInt(l[0], 10)))
  .reduce((acc, curr) => {
    if (curr.length !== 2) {
      return acc
    }
    acc += curr[0] * curr[1]
    return acc
  }, 0)

console.log(list)
