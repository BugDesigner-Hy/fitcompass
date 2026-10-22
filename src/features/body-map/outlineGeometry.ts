export interface PathBounds {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

export function pathBounds(d: string): PathBounds | null {
  const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi)
  if (!tokens || tokens.length === 0) return null

  let index = 0
  let command = ''
  let x = 0
  let y = 0
  let startX = 0
  let startY = 0
  let minX = Number.POSITIVE_INFINITY
  let minY = Number.POSITIVE_INFINITY
  let maxX = Number.NEGATIVE_INFINITY
  let maxY = Number.NEGATIVE_INFINITY

  const include = (nextX: number, nextY: number) => {
    if (!Number.isFinite(nextX) || !Number.isFinite(nextY)) return
    minX = Math.min(minX, nextX)
    minY = Math.min(minY, nextY)
    maxX = Math.max(maxX, nextX)
    maxY = Math.max(maxY, nextY)
  }
  const read = () => Number(tokens[index++])
  const hasNumber = () =>
    index < tokens.length && !/[a-z]/i.test(tokens[index] ?? '')

  while (index < tokens.length) {
    if (/[a-z]/i.test(tokens[index] ?? '')) command = tokens[index++] ?? ''
    if (!command) break
    const relative = command === command.toLowerCase()
    let operation = command.toUpperCase()

    if (operation === 'Z') {
      x = startX
      y = startY
      continue
    }
    if (!hasNumber()) continue

    do {
      if (operation === 'M' || operation === 'L' || operation === 'T') {
        const nextX = relative ? x + read() : read()
        const nextY = relative ? y + read() : read()
        include(nextX, nextY)
        x = nextX
        y = nextY
        if (operation === 'M') {
          startX = x
          startY = y
          command = relative ? 'l' : 'L'
          operation = 'L'
        }
      } else if (operation === 'H') {
        x = relative ? x + read() : read()
        include(x, y)
      } else if (operation === 'V') {
        y = relative ? y + read() : read()
        include(x, y)
      } else if (operation === 'C' || operation === 'S' || operation === 'Q') {
        const originX = x
        const originY = y
        const pairs = operation === 'C' ? 3 : 2
        let nextX = x
        let nextY = y
        for (let pair = 0; pair < pairs; pair += 1) {
          nextX = relative ? originX + read() : read()
          nextY = relative ? originY + read() : read()
          include(nextX, nextY)
        }
        x = nextX
        y = nextY
      } else if (operation === 'A') {
        read()
        read()
        read()
        read()
        read()
        x = relative ? x + read() : read()
        y = relative ? y + read() : read()
        include(x, y)
      } else {
        break
      }
    } while (hasNumber())
  }

  if (!Number.isFinite(minX) || !Number.isFinite(minY)) return null
  return { minX, minY, maxX, maxY }
}

export function boundsCenter(bounds: PathBounds) {
  return {
    x: (bounds.minX + bounds.maxX) / 2,
    y: (bounds.minY + bounds.maxY) / 2,
  }
}

export function boundsArea(bounds: PathBounds) {
  return (
    Math.max(0, bounds.maxX - bounds.minX) *
    Math.max(0, bounds.maxY - bounds.minY)
  )
}
