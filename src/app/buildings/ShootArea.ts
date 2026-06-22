import { Graphics } from 'pixi.js'

export default class ShootArea extends Graphics {
  readonly radius = 250

  constructor() {
    super()
    this.circle(0, 0, this.radius).fill('grey')
    this.alpha = 0.5
  }
}
