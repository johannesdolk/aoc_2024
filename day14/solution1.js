const fs = require('fs')

const loops = 100
const tilesX = 101
const tilesY = 103

let tiles = Array.from(Array(tilesY)).map(() => Array.from(Array(tilesX)).fill(0))

const inputMap = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')

  .reduce((acc, curr, index) => {
    const values = curr.split(' ')
    const position = values[0]
      .replace('p=', '')
      .split(',')
      .reduce((acc, value, index) => {
        if (index === 0) {
          acc['x'] = parseInt(value, 10)
        } else {
          acc['y'] = parseInt(value, 10)
        }

        return acc
      }, {})
    const velocity = values[1]
      .replace('v=', '')
      .split(',')
      .reduce((acc, value, index) => {
        if (index === 0) {
          acc['x'] = parseInt(value, 10)
        } else {
          acc['y'] = parseInt(value, 10)
        }
        return acc
      }, {})
    acc.push({ position, velocity })
    return acc
  }, [])

for (let i = 0; i < inputMap.length; i++) {
  const { position } = inputMap[i]
  tiles[position.y][position.x] += 1
}

for (let i = 0; i < loops; i++) {
  for (let j = 0; j < inputMap.length; j++) {
    const { position, velocity } = inputMap[j]

    // console.log('position', position)
    updateTiles(position.x, position.y, false)

    let x = (position.x + velocity.x) % tilesX
    if (x < 0) {
      x = tilesX + x
    }
    let y = (position.y + velocity.y) % tilesY
    if (y < 0) {
      y = tilesY + y
    }

    updateTiles(x, y, true)
    inputMap[j].position.x = x
    inputMap[j].position.y = y
  }
}

const halfX = Math.floor(tilesX / 2)
const halfY = Math.floor(tilesY / 2)

const reduced = tiles.reduce(
  (acc, row, index) => {
    if (index === halfY) {
      return acc
    }
    const first = row.slice(0, halfX).reduce((acc, value) => (acc += value), 0)
    const second = row.slice(halfX + 1).reduce((acc, value) => (acc += value), 0)

    if (index < halfY) {
      acc[1] += first
      acc[2] += second
    } else {
      acc[3] += first
      acc[4] += second
    }
    return acc
  },
  {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  }
)

console.log('reduced', reduced)

function updateTiles(x, y, add) {
  add ? (tiles[y][x] += 1) : (tiles[y][x] -= 1)
}
