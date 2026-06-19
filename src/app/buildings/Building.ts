import { Graphics } from 'pixi.js'

export default class Building extends Graphics {
  private size = 64
  constructor({ pos = { x: 0, y: 0 } }) {
    super()
    this.x = pos.x
    this.y = pos.y
    this.rect(0, 0, this.size * 2, this.size).fill('blue')
  }
}
