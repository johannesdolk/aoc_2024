import fs from 'fs'

const breakValue = 100
const inputMap = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map((line) => line.split(''))

let start, end
for (let i = 0; i < inputMap.length; i++) {
  for (let j = 0; j < inputMap[i].length; j++) {
    if (inputMap[i][j] === 'S') {
      start = {
        x: i,
        y: j,
      }
    } else if (inputMap[i][j] === 'E') {
      end = {
        x: i,
        y: j,
      }
    }
  }
}

const steps = process.env.part !== 'part2' ? 2 : 20

const shortestPathMap = {}
let shortestPathGrid
breadthFirstSolution(inputMap.length, inputMap[0].length, inputMap)
const resultMap = {}

function breadthFirstSolution(n, m, grid) {
  const queue = []
  queue.push([start.x, start.y])
  const dx = [-1, 0, 1, 0]
  const dy = [0, 1, 0, -1]
  shortestPathGrid = Array.from(Array(n)).map(() => Array.from(Array(m)).fill(-1))
  shortestPathGrid[start.x][start.y] = 0
  while (queue.length > 0) {
    const p = queue.shift()
    const x = p[0]
    const y = p[1]

    for (let i = 0; i < 4; i++) {
      const xx = x + dx[i]
      const yy = y + dy[i]

      if (xx > 0 && xx < n && yy > 0 && yy < m && shortestPathGrid[xx][yy] === -1) {
        if (grid[xx][yy] === '.') {
          shortestPathGrid[xx][yy] = shortestPathGrid[x][y] + 1
          queue.push([xx, yy])
        } else if (grid[xx][yy] === 'E') {
          shortestPathGrid[xx][yy] = shortestPathGrid[x][y] + 1
        }
      }
    }
  }

  for (let i = 0; i < shortestPathGrid.length; i++) {
    for (let j = 0; j < shortestPathGrid[i].length; j++) {
      if (shortestPathGrid[i][j] !== -1) {
        shortestPathMap[`${i}:${j}`] = shortestPathGrid[i][j]
      }
    }
  }

  return shortestPathGrid[end.x][end.y]
}

let currentValue
Object.entries(shortestPathMap).forEach(([key, value]) => {
  const [x, y] = key.split(':').map((x) => parseInt(x, 10))
  currentValue = value
  walk(x, y, steps)
})

function walk(x, y, count) {
  const foundTiles = {}
  const sa = Array.from(Array(40)).map(() => Array.from(Array(40)).fill('#'))

  for (let i = 0; i <= count; i++) {
    for (let j = 0; j <= count - i; j++) {
      const valuePlusSteps = currentValue + i + j
      const keyUpRight = `${x + i}:${y + j}`
      const keyDownRight = `${x - i}:${y + j}`
      const keyUpLeft = `${x + i}:${y - j}`
      const keyDownLeft = `${x - i}:${y - j}`
      if (shortestPathMap[keyUpRight] && shortestPathMap[keyUpRight] >= valuePlusSteps + breakValue && !foundTiles[keyUpRight]) {
        foundTiles[keyUpRight] = true

        if (resultMap[shortestPathMap[keyUpRight] - valuePlusSteps]) {
          resultMap[shortestPathMap[keyUpRight] - valuePlusSteps]++
        } else {
          resultMap[shortestPathMap[keyUpRight] - valuePlusSteps] = 1
        }
      }
      if (shortestPathMap[keyDownRight] && shortestPathMap[keyDownRight] >= valuePlusSteps + breakValue && !foundTiles[keyDownRight]) {
        foundTiles[keyDownRight] = true

        if (resultMap[shortestPathMap[keyDownRight] - valuePlusSteps]) {
          resultMap[shortestPathMap[keyDownRight] - valuePlusSteps]++
        } else {
          resultMap[shortestPathMap[keyDownRight] - valuePlusSteps] = 1
        }
      }
      if (shortestPathMap[keyUpLeft] && shortestPathMap[keyUpLeft] >= valuePlusSteps + breakValue && !foundTiles[keyUpLeft]) {
        foundTiles[keyUpLeft] = true

        if (resultMap[shortestPathMap[keyUpLeft] - valuePlusSteps]) {
          resultMap[shortestPathMap[keyUpLeft] - valuePlusSteps]++
        } else {
          resultMap[shortestPathMap[keyUpLeft] - valuePlusSteps] = 1
        }
      }
      if (shortestPathMap[keyDownLeft] && shortestPathMap[keyDownLeft] >= valuePlusSteps + breakValue && !foundTiles[keyDownLeft]) {
        foundTiles[keyDownLeft] = true

        if (resultMap[shortestPathMap[keyDownLeft] - valuePlusSteps]) {
          resultMap[shortestPathMap[keyDownLeft] - valuePlusSteps]++
        } else {
          resultMap[shortestPathMap[keyDownLeft] - valuePlusSteps] = 1
        }
      }
    }
  }
}

console.log(Object.values(resultMap).reduce((acc, x) => acc + x, 0))
