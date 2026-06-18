import { Point } from 'motion'
import { Graphics } from 'pixi.js'

export default class PlacementTile extends Graphics {
  private size = 64
  constructor({ pos = { x: 0, y: 0 } }) {
    super()
    this.draw(pos)
  }

  private draw(pos: Point) {
    this.addChild(
      new Graphics().rect(pos.x, pos.y, this.size, this.size).fill('blue'),
    )
  }
}
