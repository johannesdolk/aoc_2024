const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8').split('\n')

const splitChars = data.map((l) => [...l])
let count = 0

if (process.env.part === 'part1') {
  splitChars.forEach((l, i) => {
    l.forEach((e, ii) => {
      if (e === 'X') {
        let print = false

        if (l.length - i > 3) {
          if (splitChars[i + 1][ii - 1] === 'M' && splitChars[i + 2][ii - 2] === 'A' && splitChars[i + 3][ii - 3] === 'S') {
            count += 1
          }
          if (splitChars[i + 1][ii + 1] === 'M' && splitChars[i + 2][ii + 2] === 'A' && splitChars[i + 3][ii + 3] === 'S') {
            count += 1
          }
        }
        if (i > 2) {
          if (splitChars[i - 1][ii - 1] === 'M' && splitChars[i - 2][ii - 2] === 'A' && splitChars[i - 3][ii - 3] === 'S') {
            count += 1
          }
          if (splitChars[i - 1][ii + 1] === 'M' && splitChars[i - 2][ii + 2] === 'A' && splitChars[i - 3][ii + 3] === 'S') {
            count += 1
          }
        }
      }
    })
  })

  data.forEach((l) => {
    count += [...l.matchAll(/XMAS/g)].length
    count += [...l.matchAll(/SAMX/g)].length
  })
  data
    .map((l) => [...l])
    .reduce((acc, curr, i) => {
      for (let index = 0; index < curr.length; index++) {
        if (acc[index]) {
          acc[index].push(curr[index])
        } else {
          acc[index] = [curr[index]]
        }
      }

      return acc
    }, [])
    .forEach((l) => {
      const joined = l.join('')
      count += [...joined.matchAll(/XMAS/g)].length
      count += [...joined.matchAll(/SAMX/g)].length
    })
} else {
  splitChars.forEach((l, i) => {
    l.forEach((e, ii) => {
      if (e === 'A') {
        if (l.length - i > 1 && i > 0) {
          if (
            (splitChars[i + 1][ii - 1] === 'M' && splitChars[i - 1][ii + 1] === 'S') |
            (splitChars[i + 1][ii - 1] === 'S' && splitChars[i - 1][ii + 1] === 'M')
          ) {
            if (
              (splitChars[i - 1][ii - 1] === 'M' && splitChars[i + 1][ii + 1] === 'S') ||
              (splitChars[i - 1][ii - 1] === 'S' && splitChars[i + 1][ii + 1] === 'M')
            ) {
              count += 1
            }
          }
        }
      }
    })
  })
}

console.log(count)
