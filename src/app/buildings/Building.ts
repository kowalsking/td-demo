import {
  AnimatedSprite,
  Container,
  Graphics,
  Rectangle,
  Sprite,
  Texture,
} from 'pixi.js'
import ShootArea from './ShootArea'

export default class Building extends Container {
  private size = 64
  private shootArea: ShootArea
  private cooldown = 0
  readonly shootRate = 60
  private static readonly FRAME_COUNT = 19
  private body!: AnimatedSprite

  constructor({ pos = { x: 0, y: 0 } }) {
    super()
    this.x = pos.x
    this.y = pos.y

    this.shootArea = new ShootArea()
    this.shootArea.x = this.size / 2
    this.shootArea.y = this.size / 2
    this.addChild(this.shootArea)
    this.draw()
  }
  private static buildFrames(): Texture[] {
    const base = Texture.from('tower.png')
    const { source, frame } = base
    const fw = frame.width / Building.FRAME_COUNT

    return Array.from(
      { length: Building.FRAME_COUNT },
      (_, i) =>
        new Texture({
          source,
          frame: new Rectangle(frame.x + i * fw, frame.y, fw, frame.height),
        }),
    )
  }

  public draw() {
    this.body = new AnimatedSprite(Building.buildFrames())
    this.body.width = this.size
    this.body.height = this.size
    this.body.animationSpeed = 0.15
    this.addChild(this.body)
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
