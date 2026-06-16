import { Container, Graphics } from 'pixi.js'
import { ENEMY_DIRECTION } from './EnemyManager'

export class Enemy extends Container {
  public direction!: ENEMY_DIRECTION
  public speed!: number
  public waypoints: { x: number; y: number }[] = []
  private currentWaypointIndex = 0
  private isEndReached = false

  constructor(waypoints: { x: number; y: number }[]) {
    super()

    this.addChild(new Graphics().rect(-16, -16, 32, 32).fill('blue'))

    this.direction = ENEMY_DIRECTION.RIGHT
    this.speed = 1
    this.waypoints = waypoints
    this.x = waypoints[0].x
    this.y = waypoints[0].y
  }

  update() {
    if (this.isEndReached) return

    const target = this.waypoints[this.currentWaypointIndex]
    const dx = target.x - this.x
    const dy = target.y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < this.speed) {
      this.x = target.x
      this.y = target.y
      this.currentWaypointIndex++
      if (this.currentWaypointIndex >= this.waypoints.length) {
        this.isEndReached = true
      }
    } else {
      this.x += (dx / distance) * this.speed
      this.y += (dy / distance) * this.speed
    }
  }
}
