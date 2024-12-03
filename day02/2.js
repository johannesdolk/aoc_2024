const fs = require('fs')
const data = fs.readFileSync('input2.txt', 'utf8')
const list = data.split('\n').map((l) => l.split(' '))

const res = list.reduce((acc, curr, index) => {
  if (!curr[0]) {
    return acc
  }
  const correct = loopArray(curr, curr, 0, index)

  if (correct) {
    acc += 1
  }

  return acc
}, 0)

function loopArray(array, newArray, index = 0, i) {
  let prev
  let direction
  let correct = true

  newArray
    .map((c) => parseInt(c, 10))
    .filter(Boolean)
    .forEach((element, i) => {
      if (i === 0) {
        prev = element
        return
      } else if (i === 1) {
        if (element > prev) {
          direction = 'up'
          correct = element - prev > 0 && element - prev < 4
        } else if (element < prev) {
          direction = 'down'
          correct = prev - element > 0 && prev - element < 4
        } else {
          correct = false
          return
        }
      } else {
        if (prev - element === 0) {
          correct = false
        } else if (direction === 'up' && (element - prev < 0 || element - prev > 3)) {
          correct = false
        } else if (direction === 'down' && (prev - element < 0 || prev - element > 3)) {
          correct = false
        }
      }
      prev = element
    })

  if (correct) {
    return correct
  } else if (index === array.length) {
    return false
  }
  return loopArray(
    array,
    array.filter((_, ii) => ii !== index),
    index + 1
  )
}

console.log(res)
