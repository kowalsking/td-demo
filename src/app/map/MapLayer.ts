import { Container, Graphics, Sprite, Texture } from 'pixi.js'
import tilesData2D from './tilesPlacementData'
import PlacementTile from './PlacementTile'
import Building from '../buildings/Building'

enum Tile {
  Empty,
  BuildZone,
  Path,
  Start,
  End,
}

export type Waypoint = {
  x: number
  y: number
}

export default class MapLayer extends Container {
  readonly tileSize = 64
  private placementTiles: PlacementTile[] = []
  private buildings: Building[] = []

  constructor() {
    super()
    this.label = 'mapLayer'
    this.renderMapImage()
    this.drawPlacementTiles()
  }

  private drawPlacementTiles() {
    tilesData2D.forEach((row, y) => {
      row.forEach((symbol, x) => {
        // ! todo: Create emun of Symbols
        if (symbol === 14) {
          const pos = {
            x: x * this.tileSize,
            y: y * this.tileSize,
          }
          const tile = new PlacementTile({
            pos,
            onClick: () => {
              if (tile.occupied) return
              tile.occupied = true
              const building = new Building({ pos })
              this.buildings.push(building)
              this.addChild(building)
              console.log(this.buildings)
            },
          })
          this.placementTiles.push(tile)
          this.addChild(tile)
        }
      })
    })
  }

  renderMapImage() {
    const sprite = new Sprite({
      texture: Texture.from('gameMap.png'),
    })
    this.addChild(sprite)
  }

  public toPixelPath(waypoints: { x: number; y: number }[]) {
    const half = this.tileSize / 2
    return waypoints.map(({ x, y }) => ({
      x: x * this.tileSize + half,
      y: y * this.tileSize + half,
    }))
  }

  resize(width: number, height: number) {
    // const naturalWidth = this.mapWidth * this.tileSize
    // const naturalHeight = this.mapHeight * this.tileSize
    // const scale = Math.min(width / naturalWidth, height / naturalHeight)
    // this.scale.set(scale)
    // this.x = (width - naturalWidth * scale) / 2
    // this.y = (height - naturalHeight * scale) / 2
  }
}
