import { Container, Graphics } from 'pixi.js'
import ShootArea from './ShootArea'

export default class Building extends Container {
  private size = 64
  public canShoot = true

  constructor({ pos = { x: 0, y: 0 } }) {
    super()
    this.x = pos.x
    this.y = pos.y

    const shootArea = new ShootArea()
    shootArea.x = this.size / 2
    shootArea.y = this.size / 2
    this.addChild(shootArea)

    const building = new Graphics()
      .rect(0, 0, this.size, this.size)
      .fill('blue')
    this.addChild(building)
  }

  get center() {
    return { x: this.x + this.size / 2, y: this.y + this.size / 2 }
  }
}
