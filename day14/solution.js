import fs from 'fs'

const loops = 100
const tilesX = 101
const tilesY = 103

let tiles = Array.from(Array(tilesY)).map(() => Array.from(Array(tilesX)).fill(0))
let count = 0
let mappis = {}

const inputMap = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')

  .reduce((acc, curr) => {
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

function updateTiles(x, y, add) {
  add ? (tiles[y][x] += 1) : (tiles[y][x] -= 1)
  if (add) {
    if (mappis[y]) {
      mappis[y].push(x)
    } else {
      mappis[y] = [x]
    }
  }
}

function moveOneSecond() {
  for (let j = 0; j < inputMap.length; j++) {
    const { position, velocity } = inputMap[j]
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

for (let i = 0; i < inputMap.length; i++) {
  const { position } = inputMap[i]
  tiles[position.y][position.x] += 1
}

if (process.env.part === 'part2') {
  let looking = true
  count = 0

  while (looking) {
    count++
    mappis = {}
    moveOneSecond()

    Object.entries(mappis).forEach(([key, value]) => {
      let count = 0
      let previous = 0
      const sortedValue = value.sort((a, b) => a - b)

      for (const val of sortedValue) {
        if (count > 10) {
          looking = false
          break
        } else if (val === previous + 1) {
          count++
        } else {
          count = 0
        }
        previous = val
      }
    })
  }
} else {
  count = 0
  for (let i = 0; i < loops; i++) {
    moveOneSecond()
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

  count = Object.values(reduced).reduce((acc, value) => {
    acc *= value
    return acc
  }, 1)
}

console.log(count)
