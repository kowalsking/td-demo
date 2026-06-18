import { Container, Graphics, Sprite, Texture } from 'pixi.js'

enum Tile {
  Empty,
  BuildZone,
  Path,
  Start,
  End,
}

export const map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0],
  [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
  [0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0],
  [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
  [0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0],
  [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
  [0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

export type Waypoint = {
  x: number
  y: number
}

export default class MapLayer extends Container {
  readonly tileSize = 64

  constructor() {
    super()
    this.label = 'mapLayer'
    // this.render()
    this.renderImage()
  }

  get mapHeight() {
    return map.length
  }

  get mapWidth() {
    return map[0].length
  }

  renderImage() {
    const sprite = new Sprite({
      texture: Texture.from('gameMap.png'),
    })
    this.addChild(sprite)
  }

  render() {
    for (let y = 0; y < this.mapHeight; y++) {
      for (let x = 0; x < this.mapWidth; x++) {
        const tile = map[y][x]
        const color = this.getColor(tile)
        const gfx = new Graphics()
        gfx.beginFill(color)
        gfx.drawRect(0, 0, this.tileSize, this.tileSize)
        gfx.endFill()
        gfx.x = x * this.tileSize
        gfx.y = y * this.tileSize
        this.addChild(gfx)
      }
    }
  }

  getColor(tile: Tile) {
    switch (tile) {
      case Tile.Empty:
        return 0x333333
      case Tile.BuildZone:
        return 0x666666
      case Tile.Start:
        return 0x00ff00
      case Tile.End:
        return 0xff0000
      default:
        return 0x999999
    }
  }

  public toPixelPath(waypoints: { x: number; y: number }[]) {
    const half = this.tileSize / 2
    return waypoints.map(({ x, y }) => ({
      x: x * this.tileSize + half,
      y: y * this.tileSize + half,
    }))
  }

  // AI generated pathfinding algorithm to find the path from start to end
  get enemyPath(): { x: number; y: number }[] {
    let start: { x: number; y: number } | null = null
    for (let y = 0; y < this.mapHeight && !start; y++) {
      for (let x = 0; x < this.mapWidth && !start; x++) {
        if (map[y][x] === Tile.Start) start = { x, y }
      }
    }
    if (!start) return []

    const path = [start]
    const visited = new Set([`${start.x},${start.y}`])
    let current = start

    const dirs = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
    ]

    while (true) {
      let moved = false
      for (const { dx, dy } of dirs) {
        const nx = current.x + dx
        const ny = current.y + dy
        if (visited.has(`${nx},${ny}`)) continue
        const tile = map[ny]?.[nx]
        if (tile === Tile.Path || tile === Tile.End) {
          visited.add(`${nx},${ny}`)
          path.push({ x: nx, y: ny })
          current = { x: nx, y: ny }
          moved = true
          if (tile === Tile.End) return path
          break
        }
      }
      if (!moved) break
    }
    return path
  }

  resize(width: number, height: number) {
    const naturalWidth = this.mapWidth * this.tileSize
    const naturalHeight = this.mapHeight * this.tileSize
    const scale = Math.min(width / naturalWidth, height / naturalHeight)
    this.scale.set(scale)
    this.x = (width - naturalWidth * scale) / 2
    this.y = (height - naturalHeight * scale) / 2
  }
}
