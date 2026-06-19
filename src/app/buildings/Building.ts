import { Graphics } from 'pixi.js'
import Projectile from '../projectile/Projectile'

export default class Building extends Graphics {
  private size = 64
  public projectiles: Projectile[] = []
  private center = {
    x: 0,
    y: 0,
  }

  constructor({ pos = { x: 0, y: 0 } }) {
    super()
    this.x = pos.x
    this.y = pos.y
    this.rect(0, 0, this.size * 2, this.size).fill('blue')
    this.center = {
      x: this.width / 2,
      y: this.height / 2,
    }
    this.projectiles.push(
      new Projectile({
        pos: {
          x: this.center.x,
          y: this.center.y,
        },
      }),
    )
    this.projectiles.forEach((p) => this.addChild(p))
  }
}
