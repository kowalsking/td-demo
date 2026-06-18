import { Container, Graphics, Sprite, Texture } from 'pixi.js'
import tilesData2D from './tilesPlacementData'
import PlacementTile from './PlacementTile'

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
  private tilesPlace: PlacementTile[] = []

  constructor() {
    super()
    this.label = 'mapLayer'
    // this.render()
    this.renderImage()

    this.convertTilesDataTo2D()
  }

  private convertTilesDataTo2D() {
    tilesData2D.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 14) {
          // add building placement tile here
          this.tilesPlace.push(
            new PlacementTile({
              pos: {
                x: x * this.tileSize,
                y: y * this.tileSize,
              },
            }),
          )
        }
      })
    })

    console.log(this.tilesPlace)
  }

  renderImage() {
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
