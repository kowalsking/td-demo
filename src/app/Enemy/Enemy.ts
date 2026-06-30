import {
  AnimatedSprite,
  Container,
  Graphics,
  Rectangle,
  Texture,
} from 'pixi.js'
import { ENEMY_DIRECTION } from './EnemyManager'

export class Enemy extends Container {
  public direction!: ENEMY_DIRECTION
  public speed!: number
  public waypoints: { x: number; y: number }[] = []
  private isEndReached = false
  private currentWaypointIndex = 0
  public radius = 50
  public center: { x: number; y: number } = { x: 0, y: 0 }

  private eWidth = 100
  private eHeight = 100
  private _health = 100
  private healthBar!: Graphics

  private static readonly FRAME_COUNT = 7
  private body!: AnimatedSprite

  constructor(waypoints: { x: number; y: number }[]) {
    super()

    this.direction = ENEMY_DIRECTION.RIGHT
    this.speed = 1
    this.waypoints = waypoints
    this.x = waypoints[0].x
    this.y = waypoints[0].y
    this.center = { x: this.x + this.eWidth / 2, y: this.y + this.eHeight / 2 }

    this.draw()
  }

  get health() {
    return this._health
  }

  set health(value: number) {
    this._health = Math.max(0, value)
    this.redrawHealthBar()
  }

  public get size() {
    return (this.eHeight + this.eWidth) / 2
  }

  private static buildFrames(): Texture[] {
    const base = Texture.from('orc.png')
    const { source, frame } = base
    const fw = frame.width / Enemy.FRAME_COUNT

    return Array.from(
      { length: Enemy.FRAME_COUNT },
      (_, i) =>
        new Texture({
          source,
          frame: new Rectangle(frame.x + i * fw, frame.y, fw, frame.height),
        }),
    )
  }

  private draw() {
    this.body = new AnimatedSprite(Enemy.buildFrames())
    this.body.width = this.eWidth
    this.body.height = this.eHeight
    this.body.animationSpeed = 0.15
    this.body.play()
    this.addChild(this.body)

    this.addChild(new Graphics().rect(0, -15, this.eWidth, 12).fill('darkred'))

    this.healthBar = new Graphics()
    this.redrawHealthBar()
    this.addChild(this.healthBar)
  }

  private redrawHealthBar() {
    this.healthBar.clear()
    this.healthBar
      .rect(0, -15, (this.eWidth * this._health) / 100, 12)
      .fill('green')
  }

  update() {
    if (this.isEndReached) return

    this.center = { x: this.x + this.eWidth / 2, y: this.y + this.eHeight / 2 }

    const target = this.waypoints[this.currentWaypointIndex]
    const dx = target.x - this.center.x
    const dy = target.y - this.center.y
    const distance = Math.hypot(dx, dy)

    if (distance < this.speed) {
      this.x = target.x - this.eWidth / 2
      this.y = target.y - this.eHeight / 2
      this.currentWaypointIndex++
      if (this.currentWaypointIndex >= this.waypoints.length) {
        this.isEndReached = true
        this.emit('finished')
        this.destroy()
      }
    } else {
      this.x += (dx / distance) * this.speed
      this.y += (dy / distance) * this.speed
    }
  }
}
