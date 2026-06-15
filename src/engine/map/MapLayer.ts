import { Container, Graphics } from 'pixi.js'

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

export default class MapLayer extends Container {
  readonly tileSize = 64

  constructor() {
    super()
    this.label = 'mapLayer'
    this.render()
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

  enemyPath() {
    const path: { x: number; y: number }[] = []
    path.push({ x: 1, y: 1 })
    path.push({ x: 14, y: 1 })
    path.push({ x: 14, y: 2 })
    path.push({ x: 14, y: 3 })
    path.push({ x: 14, y: 3 })
    // path.push({ x: 1, y: 2 })
    // path.push({ x: 1, y: 2 })
    // path.push({ x: 1, y: 2 })
    // for (let y = 0; y < this.mapHeight; y++) {
    //   for (let x = 0; x < this.mapWidth; x++) {
    //     if (
    //       map[y][x] === Tile.Path ||
    //       map[y][x] === Tile.Start ||
    //       map[y][x] === Tile.End
    //     ) {
    //       path.push({ x, y })
    //     }
    //   }
    // }
    return path
  }

  resize(width: number, height: number) {
    // this.width = width
    // this.height = height
  }

  get mapHeight() {
    return map.length
  }

  get mapWidth() {
    return map[0].length
  }
}
