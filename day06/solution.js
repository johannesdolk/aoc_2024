const fs = require('fs')
const map = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map((line) => line.split(''))

if (process.env.part === 'part1') {
  let currentPosition = map.reduce((acc, curr, i) => {
    if (curr.includes('^')) {
      return { y: curr.indexOf('^'), x: i }
    }
    return acc
  })

  const copy = [...map.map((row) => [...row])]
  let finished = false
  let direction = 'up'

  while (!finished) {
    copy[currentPosition.x][currentPosition.y] = 'X'
    if (direction === 'up') {
      const nextTile = map[currentPosition.x - 1] ? map[currentPosition.x - 1][currentPosition.y] : undefined
      if (nextTile === undefined) {
        finished = true
      } else if (nextTile === '#') {
        const walk = map[currentPosition.x][currentPosition.y + 1]
        if (walk === '#' || walk === undefined) {
          finished = true
        } else {
          direction = 'right'
        }
      } else {
        currentPosition.x--
        copy[currentPosition.x][currentPosition.y] = 'X'
      }
    } else if (direction === 'right') {
      const nextTile = map[currentPosition.x][currentPosition.y + 1]

      if (nextTile === undefined) {
        finished = true
      } else if (nextTile === '#') {
        const walk = map[currentPosition.x + 1] ? map[currentPosition.x + 1][currentPosition.y] : undefined
        if (walk === '#' || walk === undefined) {
          finished = true
        } else {
          direction = 'down'
        }
      } else {
        currentPosition.y++
        copy[currentPosition.x][currentPosition.y] = 'X'
      }
    } else if (direction === 'down') {
      const nextTile = map[currentPosition.x + 1] ? map[currentPosition.x + 1][currentPosition.y] : undefined

      if (nextTile === undefined) {
        finished = true
      } else if (nextTile === '#') {
        const walk = map[currentPosition.x][currentPosition.y - 1]
        if (walk === '#' || walk === undefined) {
          finished = true
        } else {
          direction = 'left'
        }
      } else {
        currentPosition.x++
        copy[currentPosition.x][currentPosition.y] = 'X'
      }
    } else if (direction === 'left') {
      const nextTile = map[currentPosition.x][currentPosition.y - 1]

      if (nextTile === undefined) {
        finished = true
      } else if (nextTile === '#') {
        const walk = map[currentPosition.x - 1] ? map[currentPosition.x - 1][currentPosition.y] : undefined
        if (walk === '#' || walk === undefined) {
          finished = true
        } else {
          direction = 'up'
        }
      } else {
        currentPosition.y--
        copy[currentPosition.x][currentPosition.y] = 'X'
      }
    }
  }

  console.log(
    copy.reduce((acc, curr) => {
      return acc + curr.filter((tile) => tile === 'X').length
    }, 0)
  )
} else {
  let currentPosition = map.reduce((acc, curr, i) => {
    if (curr.includes('^')) {
      return { y: curr.indexOf('^'), x: i }
    }
    return acc
  })

  const startingPosition = { ...currentPosition }
  let loopCount = 0
  let sa = 0
  const result = map.forEach((m, i) => {
    m.forEach((tile, ii) => {
      sa++
      const newCopy = [...map.map((row) => [...row])]

      // const [x, y] = placement.split(':').map((n) => parseInt(n))

      // if (x > 128 || y > 128) {
      //   console.log(x, y, map.length, map[0].length)
      // }
      // if (x === -1 || y === -1 || x === map.length || y === map.length) {
      //   return
      // }

      newCopy[i][ii] = '#'

      const turns = {}
      let done = false
      let loop = false
      let direction1 = 'up'
      let currentPosition1 = { x: startingPosition.x, y: startingPosition.y }
      let si = 0
      while (!done) {
        si++
        if (direction1 === 'up') {
          const nextTile = newCopy[currentPosition1.x - 1] ? newCopy[currentPosition1.x - 1][currentPosition1.y] : undefined
          if (nextTile === undefined) {
            done = true
          } else if (nextTile === '#') {
            direction1 = 'right'

            if (turns[`${currentPosition1.x}:${currentPosition1.y}:right`]) {
              done = true
              loop = true
            } else {
              turns[`${currentPosition1.x}:${currentPosition1.y}:right`] = 'right'
            }
          } else {
            currentPosition1.x--
          }
        } else if (direction1 === 'right') {
          const nextTile = newCopy[currentPosition1.x][currentPosition1.y + 1]

          if (nextTile === undefined) {
            done = true
          } else if (nextTile === '#') {
            direction1 = 'down'

            if (turns[`${currentPosition1.x}:${currentPosition1.y}:down`]) {
              done = true
              loop = true
            } else {
              turns[`${currentPosition1.x}:${currentPosition1.y}:down`] = 'down'
            }
          } else {
            currentPosition1.y++
          }
        } else if (direction1 === 'down') {
          const nextTile = newCopy[currentPosition1.x + 1] ? newCopy[currentPosition1.x + 1][currentPosition1.y] : undefined

          if (nextTile === undefined) {
            done = true
          } else if (nextTile === '#') {
            direction1 = 'left'
            if (turns[`${currentPosition1.x}:${currentPosition1.y}:left`]) {
              done = true
              loop = true
            } else {
              turns[`${currentPosition1.x}:${currentPosition1.y}:left`] = 'left'
            }
          } else {
            currentPosition1.x++
          }
        } else if (direction1 === 'left') {
          const nextTile = newCopy[currentPosition1.x][currentPosition1.y - 1]

          if (nextTile === undefined) {
            done = true
          } else if (nextTile === '#') {
            direction1 = 'up'

            if (turns[`${currentPosition1.x}:${currentPosition1.y}:up`]) {
              done = true
              loop = true
            } else {
              turns[`${currentPosition1.x}:${currentPosition1.y}:up`] = 'up'
            }
          } else {
            currentPosition1.y--
          }
        }
      }

      if (loop) {
        loopCount++
      }
    })
  })
  console.log(loopCount)
}
