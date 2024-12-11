const fs = require('fs')
const inputMap = fs
  .readFileSync('input.txt', 'utf8')
  .split(' ')
  .reduce((acc, curr) => {
    if (acc[curr]) {
      acc[curr] += 1
    } else {
      acc[curr] = 1
    }
    return acc
  }, {})

const blinks = process.env.part === 'part1' ? 25 : 75

for (let i = 0; i < blinks; i++) {
  const copy = { ...inputMap }
  const mapEntries = Object.entries(copy)
  for (const [key, value] of mapEntries) {
    if (value > 0) {
      if (key === '0') {
        inputMap[key] -= value
        addToMap('1', value)
      } else if (key.length % 2 === 1) {
        const newValue = `${parseInt(key, 10) * 2024}`
        inputMap[key] -= value
        addToMap(newValue, value)
      } else {
        const asArray = Array.from(key)
        const a = asArray.slice(0, asArray.length / 2).join('')
        const b = parseInt(asArray.slice(asArray.length / 2).join(''), 10).toString()
        inputMap[key] -= value
        addToMap(a, value)
        addToMap(b, value)
      }
    }
  }
}

function addToMap(key, value, oldKey) {
  if (inputMap[key]) {
    inputMap[key] += value
  } else {
    inputMap[key] = value
  }
}

console.log(Object.values(inputMap).reduce((acc, curr) => acc + curr, 0))
