import { Container, Graphics } from 'pixi.js'
import { Enemy } from './Enemy'
import { waypoints } from '@/app/map/waypointsData'
import { Waypoint } from '../map/MapLayer'
import { waitFor } from '@/engine/utils/waitFor'

export enum ENEMY_DIRECTION {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export default class EnemyManager extends Container {
  private readonly ENEMY_COUNT = 10
  private readonly WAIT_DURATION = 2
  private allEnemies: Enemy[] = []
  private path: Waypoint[] = []
  constructor() {
    super()

    this.path = waypoints
  }

  public async show(parent: Container) {
    for (let i = 0; i < this.ENEMY_COUNT; i++) {
      const enemy = new Enemy(this.path)

      parent.addChild(enemy)
      this.allEnemies.push(enemy)
      await waitFor(this.WAIT_DURATION)
    }
  }

  update() {
    this.allEnemies.forEach((entity) => {
      entity.update()
    })
  }
}
