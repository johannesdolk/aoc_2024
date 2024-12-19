import fs from 'fs'

const facit = {}
const input = fs.readFileSync('input.txt', 'utf8')

const [combinations, arrangements] = input.split('\n\n')

const combinationsList = combinations.replaceAll(' ', '').split(',')
const arrangementsList = arrangements.split('\n')

const count = arrangementsList.map((arrangement) => {
  const validCombos = []
  for (const combo of combinationsList) {
    if (arrangement.includes(combo)) {
      validCombos.push(combo)
    }
  }
  return loop(arrangement, validCombos, 0)
})

if (process.env.part === 'part1') {
  console.log(count.filter((c) => c > 0).length)
} else {
  console.log(count.reduce((acc, c) => acc + c, 0))
}

function loop(currentString, validCombos, count) {
  const firstLetter = currentString[0]
  const combos = validCombos.filter((combo) => combo.startsWith(firstLetter))
  let currentCount = 0
  if (facit[currentString]) {
    return facit[currentString] + count
  }

  for (const combo of combos) {
    if (currentString.startsWith(combo)) {
      if (currentString.length === combo.length) {
        currentCount++
      } else {
        const newString = currentString.replace(combo, '')
        currentCount += loop(newString, validCombos, count)
      }
    }
  }

  return (facit[currentString] = count + currentCount)
}
