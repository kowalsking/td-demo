import { Container, Graphics } from 'pixi.js'
import ShootArea from './ShootArea'

export default class Building extends Container {
  private size = 64
  private shootArea: ShootArea
  private cooldown = 0
  readonly shootRate = 60

  constructor({ pos = { x: 0, y: 0 } }) {
    super()
    this.x = pos.x
    this.y = pos.y

    this.shootArea = new ShootArea()
    this.shootArea.x = this.size / 2
    this.shootArea.y = this.size / 2
    this.addChild(this.shootArea)

    const building = new Graphics()
      .rect(0, 0, this.size, this.size)
      .fill('blue')
    this.addChild(building)
  }

  get center() {
    return { x: this.x + this.size / 2, y: this.y + this.size / 2 }
  }

  get shootRadius() {
    return this.shootArea.radius
  }

  get canShoot() {
    return this.cooldown <= 0
  }

  update() {
    if (this.cooldown > 0) this.cooldown--
  }

  resetCooldown() {
    this.cooldown = this.shootRate
  }
}
