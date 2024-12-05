const fs = require('fs')
const [order, solutions] = fs.readFileSync('input.txt', 'utf8').split('\n\n')

const illegalValues = order.split('\n').reduce((acc, line) => {
  const [val1, val2] = line.split('|')

  if (acc[val2]) {
    acc[val2].push(parseInt(val1, 10))
  } else {
    acc[val2] = [parseInt(val1, 10)]
  }

  return acc
}, {})

let count = 0
const setupList = setup()

if (process.env.part === 'part1') {
  setupList
    .filter(({ correct }) => correct)
    .forEach(({ solution }) => {
      count += parseInt(solution[Math.floor(solution.length / 2)], 10)
    })
} else {
  setupList

    .filter(({ correct }) => {
      return !correct
    })
    .map(({ solution, a, b }) => {
      let fixed = false
      let temp
      let correct = checkCorrect(solution)

      while (!fixed) {
        temp = swap(solution, correct.a, correct.b)
        correct = checkCorrect(temp)
        if (correct.correct) {
          fixed = true
        }
      }
      return temp
    })
    .forEach((solution) => {
      count += parseInt(solution[Math.floor(solution.length / 2)], 10)
    })
}

function swap(array, a, b) {
  array[a] = array.splice(b, 1, array[a])[0]
  return array
}

function setup() {
  return solutions
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const solution = line.split(',')
      const correct = checkCorrect(solution)
      return {
        ...correct,
        solution,
      }
    })
}

function checkCorrect(solution) {
  let correct = {
    correct: true,
    a: null,
    b: null,
  }
  for (let i = 0; i < solution.length; i++) {
    let currentVal = solution[i]
    const illegalOrder = illegalValues[currentVal]
    if (!illegalOrder) {
      continue
    }
    for (let j = i + 1; j < solution.length; j++) {
      if (illegalOrder.includes(parseInt(solution[j], 10))) {
        correct = {
          correct: false,
          a: i,
          b: j,
        }
        break
      }
    }
  }
  return correct
}

console.log(count)
