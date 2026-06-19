import { Graphics } from 'pixi.js'

export default class Projectile extends Graphics {
  private velocity = {
    x: 0,
    y: 0,
  }
  private radius = 10
  private target: { x: number; y: number }

  constructor({ pos = { x: 0, y: 0 }, target = { x: 0, y: 0 } }) {
    super()

    this.x = pos.x
    this.y = pos.y
    this.target = target

    this.circle(0, 0, this.radius).fill('cyan')
  }

  update() {
    const angle = Math.atan2(this.target.y - this.y, this.target.x - this.x)

    this.velocity.x = Math.cos(angle)
    this.velocity.y = Math.sin(angle)

    this.x += this.velocity.x
    this.y += this.velocity.y
  }
}
