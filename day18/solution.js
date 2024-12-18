import fs from 'fs'

const tilesX = 71
const tilesY = 71
const input = fs.readFileSync('input.txt', 'utf8')
const tiles = Array.from(Array(tilesY)).map(() => Array.from(Array(tilesX)).fill('.'))

const inputMap = input.split('\n').map((line) => {
  const [x, y] = line.split(',')
  return { x: parseInt(x, 10), y: parseInt(y, 10) }
})
const rounds = process.env.part !== 'part2' ? 1024 : inputMap.length

for (let i = 0; i < rounds; i++) {
  const { x, y } = inputMap[i]
  tiles[y][x] = '#'

  if (process.env.part === 'part2') {
    if (i > 1024) {
      const result = breadthFirstSolution(tilesX, tilesY, tiles)
      if (result === -1) {
        console.log(`${x},${y}`)
        break
      }
    }
  }
}

function breadthFirstSolution(n, m, grid) {
  if (grid[0][0] === '#' || grid[n - 1][m - 1] === '#') {
    return -1
  }
  const queue = []
  queue.push([0, 0])
  const dx = [-1, 0, 1, 0]
  const dy = [0, 1, 0, -1]
  const dis = new Array(n)
  for (let i = 0; i < n; i++) {
    dis[i] = new Array(m).fill(-1)
  }

  dis[0][0] = 0
  while (queue.length > 0) {
    const p = queue.shift()
    const x = p[0]
    const y = p[1]

    for (let i = 0; i < 4; i++) {
      const xx = x + dx[i]
      const yy = y + dy[i]

      if (xx >= 0 && xx < n && yy >= 0 && yy < m && dis[xx][yy] === -1) {
        if (grid[xx][yy] === '.') {
          dis[xx][yy] = dis[x][y] + 1
          queue.push([xx, yy])
        }
      }
    }
  }
  return dis[n - 1][m - 1]
}

if (process.env.part !== 'part2') {
  const result = breadthFirstSolution(tilesX, tilesY, tiles)
  console.log(result)
}
