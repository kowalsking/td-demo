import { Container, Graphics } from 'pixi.js'
import { ENEMY_DIRECTION } from './EnemyManager'

export class Enemy extends Container {
  public direction!: ENEMY_DIRECTION
  public speed!: number
  public waypoints: { x: number; y: number }[] = []
  private currentWaypointIndex = 0
  private isEndReached = false
  private eWidth: number
  private eHeight: number
  private center = {
    x: 0,
    y: 0,
  }

  constructor(waypoints: { x: number; y: number }[]) {
    super()

    // this.position.set(0, 0)
    this.eWidth = 100
    this.eHeight = 100

    this.direction = ENEMY_DIRECTION.RIGHT
    this.speed = 1
    this.waypoints = waypoints
    this.x = waypoints[0].x
    this.y = waypoints[0].y

    this.center = {
      x: this.x + this.eWidth / 2,
      y: this.y + this.eHeight / 2,
    }

    this.draw()
  }

  public draw() {
    this.addChild(
      new Graphics()
        .rect(this.x, this.y, this.eWidth, this.eHeight)
        .fill('blue'),
    )
  }

  update() {
    // if (this.isEndReached) return

    const target = this.waypoints[this.currentWaypointIndex]
    // const dx = target.x - this.x
    // const dy = target.y - this.y
    // const distance = Math.sqrt(dx * dx + dy * dy)

    // if (distance < this.speed) {
    //   this.x = target.x
    //   this.y = target.y
    //   this.currentWaypointIndex++
    //   if (this.currentWaypointIndex >= this.waypoints.length) {
    //     this.isEndReached = true
    //   }
    // } else {
    //   this.x += (dx / distance) * this.speed
    //   this.y += (dy / distance) * this.speed
    // }

    const yDistance = target.y - this.center.y
    const xDistance = target.x - this.center.x
    const angle = Math.atan2(yDistance, xDistance)
    this.x += Math.cos(angle)
    this.y += Math.sin(angle)

    this.center = {
      x: this.x + this.eWidth / 2,
      y: this.y + this.eHeight / 2,
    }

    if (
      Math.round(this.center.x) === Math.round(target.x) &&
      Math.round(this.center.y) === Math.round(target.y) &&
      this.currentWaypointIndex < this.waypoints.length - 1
    ) {
      this.currentWaypointIndex++
    }
  }
}
