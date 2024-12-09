const fs = require('fs')
const file = fs
  .readFileSync('input.txt', 'utf8')
  .split('')
  .map((digit) => parseInt(digit, 10))

const list = []
let index = 0

file.forEach((value, i) => {
  let fillValue = '.'
  if (i % 2 === 0) {
    fillValue = index
    index++
  }

  for (let j = 0; j < value; j++) {
    list.push(fillValue)
  }
})

let newList = [...list]

const reversed = list.reverse().filter((n) => n !== '.')
let count = 0
let moving = true

if (process.env.part === 'part2') {
  let moveIndex = Math.max(...reversed)
  while (moving) {
    const indexCount = reversed.filter((n) => n === moveIndex).length

    let searching = true
    let currentIndex = 0
    let placement
    while (searching) {
      placement = newList.indexOf('.', currentIndex)
      currentIndex = placement + 1
      searching = false
      for (let i = 0; i < indexCount; i++) {
        if (newList[placement + i] !== '.') {
          searching = true
          break
        }
      }
    }

    const existIndex = newList.indexOf(moveIndex)
    if (placement !== -1 && existIndex > placement) {
      newList = newList.map((n) => {
        if (n === moveIndex) {
          return '.'
        }
        return n
      })
      for (let i = 0; i < indexCount; i++) {
        newList[placement + i] = moveIndex
      }
    }

    moveIndex--
    moving = moveIndex > 0
  }

  count = newList.reduce((acc, curr, index) => {
    if (curr === '.') return acc
    return (acc += curr * index)
  }, 0)
} else {
  let moveIndex = 0
  while (moving) {
    if (moveIndex === reversed.length - 1) {
      moveIndex++

      moving = false
    } else {
      if (reversed[moveIndex] === '.') {
        moveIndex++
      } else {
        const emptyIndex = newList.findIndex((n) => n === '.')
        newList[emptyIndex] = reversed[moveIndex]
        moveIndex++
      }
    }
  }

  count = newList.slice(0, moveIndex).reduce((acc, curr, index) => {
    return (acc += curr * index)
  }, 0)
}

console.log(count)
