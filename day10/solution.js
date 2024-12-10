const fs = require('fs')
const inputMap = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map((line) => line.split('').map((char) => parseInt(char, 10)))

const allStartingPositions = inputMap.reduce((acc, curr, i) => {
  curr.forEach((char, j) => {
    if (char === 0) {
      acc.push({ x: i, y: j })
    }
  })
  return acc
}, [])

let count = 0
const finishPositions = {}

for (let i = 0; i < allStartingPositions.length; i++) {
  const startingPosition = allStartingPositions[i]
  finishPositions[i] = {}
  walk(startingPosition, 0, i)
}

function walk(position, startingIndex, index) {
  let innerFinished = false
  while (!innerFinished) {
    const posibleMoves = []
    if (inputMap[position.x][position.y] === 9) {
      if (process.env.part === 'part1') {
        if (!finishPositions[index][position.x + ':' + position.y]) {
          finishPositions[index][position.x + ':' + position.y] = true
          count++
        }
      } else {
        count++
      }
      innerFinished = true
      return
    }

    if (
      inputMap[position.x + 1] &&
      inputMap[position.x + 1][position.y] === startingIndex + 1 &&
      !finishPositions[index][position.x + 1 + ':' + position.y]
    ) {
      posibleMoves.push({ x: position.x + 1, y: position.y })
    }
    if (
      inputMap[position.x - 1] &&
      inputMap[position.x - 1][position.y] === startingIndex + 1 &&
      !finishPositions[index][position.x - 1 + ':' + position.y]
    ) {
      posibleMoves.push({ x: position.x - 1, y: position.y })
    }
    if (inputMap[position.x][position.y + 1] === startingIndex + 1 && !finishPositions[index][position.x + ':' + position.y + 1]) {
      posibleMoves.push({ x: position.x, y: position.y + 1 })
    }
    if (inputMap[position.x][position.y - 1] === startingIndex + 1 && !finishPositions[index][position.x + ':' + position.y - 1]) {
      posibleMoves.push({ x: position.x, y: position.y - 1 })
    }

    if (posibleMoves.length === 0) {
      innerFinished = true
      return
    } else if (posibleMoves.length === 1) {
      position = posibleMoves[0]
      startingIndex++
    } else {
      innerFinished = true

      for (let move of posibleMoves) {
        walk(move, startingIndex + 1, index)
      }
    }
  }
}

console.log(count)
