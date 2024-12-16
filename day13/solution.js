const fs = require('fs')

const upCount = process.env.part === 'part1' ? 0 : 10000000000000
const filter = process.env.part === 'part1' ? 100 : 10000000000000
const inputMap = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n\n')
  .map((line) => line.split('\n'))
  .reduce((acc, curr, index) => {
    const a = [...curr[0].matchAll(/(\d+)/g)]
    const b = [...curr[1].matchAll(/(\d+)/g)]
    const c = [...curr[2].matchAll(/(\d+)/g)]
    acc.push({
      a: {
        x: parseInt(a[0], 10),
        y: parseInt(a[1], 10),
      },
      b: {
        x: parseInt(b[0], 10),
        y: parseInt(b[1], 10),
      },
      solution: {
        x: parseInt(c[0], 10) + upCount,
        y: parseInt(c[1], 10) + upCount,
      },
    })
    return acc
  }, [])

function calcPath(a, b, solution) {
  const buttonA = (solution.y * b.x - solution.x * b.y) / (a.y * b.x - b.y * a.x)
  if (Math.floor(buttonA) !== buttonA) {
    return null
  }

  const buttonB = (solution.x - buttonA * a.x) / b.x
  if (Math.floor(buttonB) !== buttonB) {
    return null
  }
  return { buttonA, buttonB }
}

const result = inputMap
  .map(({ a, b, solution }) => {
    return calcPath(a, b, solution)
  })
  .filter((path) => path && path.buttonA < filter && path.buttonB < filter)
  .map(({ buttonA, buttonB }) => buttonA * 3 + buttonB * 1)
  .reduce((acc, curr) => acc + curr, 0)
console.log(result)
