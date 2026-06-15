import { Container, Graphics } from 'pixi.js'
import { Enemy } from './Enemy'

export enum ENEMY_DIRECTION {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export default class EnemyManager extends Container {
  private allEnemies: Enemy[] = []
  constructor(private path: { x: number; y: number }[]) {
    super()
    console.log('EnemyManager created', this.path)
  }

  show(parent: Container) {
    const scaledPath = this.scaleWaypoints(this.path)
    const enemy = new Enemy(scaledPath)

    parent.addChild(enemy)
    this.allEnemies.push(enemy)
  }

  update() {
    // this.allEnemies.forEach((entity) => {
    //   this.setDirection(entity)
    //   this.setLimits(entity)
    // })
    this.allEnemies.forEach((entity) => {
      entity.update()
    })
  }

  private setDirection(enemy: Enemy): void {
    switch (enemy.direction) {
      case ENEMY_DIRECTION.UP:
        // enemy.x += enemy.speed
        // enemy.y -= enemy.speed
        break
      case ENEMY_DIRECTION.DOWN:
        // enemy.x -= enemy.speed
        enemy.y += enemy.speed
        break
      case ENEMY_DIRECTION.LEFT:
        enemy.x -= enemy.speed
        // enemy.y += enemy.speed
        break
      case ENEMY_DIRECTION.RIGHT:
        enemy.x += enemy.speed
        // enemy.y += enemy.speed
        break
    }
  }

  private scaleWaypoints(waypoints: { x: number; y: number }[]) {
    const tileZise = 64
    const offset = tileZise / 2 - 16 // Center the enemy on the tile (assuming enemy size is 32x32)
    const scaledWaypoints = waypoints.map(({ x, y }) => ({
      x: x * tileZise + offset,
      y: y * tileZise + offset,
    }))
    return scaledWaypoints
  }
}
