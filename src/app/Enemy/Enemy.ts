import { Container, Graphics } from 'pixi.js'
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

  constructor(waypoints: { x: number; y: number }[]) {
    super()

    this.direction = ENEMY_DIRECTION.RIGHT
    this.speed = 10
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

  private draw() {
    this.addChild(
      new Graphics().rect(0, 0, this.eWidth, this.eHeight).fill('red'),
    )
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
