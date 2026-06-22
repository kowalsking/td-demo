import { Graphics } from 'pixi.js'

export default class Building extends Graphics {
  private size = 64
  public canShoot = true

  constructor({ pos = { x: 0, y: 0 } }) {
    super()
    this.x = pos.x
    this.y = pos.y
    this.rect(0, 0, this.size, this.size).fill('blue')
  }

  get center() {
    return { x: this.x + this.size / 2, y: this.y + this.size / 2 }
  }
}
