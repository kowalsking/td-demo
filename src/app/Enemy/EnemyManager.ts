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
  private enemyCount = 3 // move it in WaveManager ()
  public allEnemies: Enemy[] = []
  private path: Waypoint[] = []
  private mapContainer: Container

  constructor(parent: Container) {
    super()

    this.mapContainer = parent
    this.path = waypoints
  }

  public async show() {
    await this.spawnEnemies(3)
  }

  public async spawnEnemies(count: number) {
    for (let i = 0; i < count; i++) {
      const enemy = new Enemy(this.path)

      this.mapContainer.addChild(enemy)
      this.allEnemies.push(enemy)
      enemy.on('finished', () => {
        const enemyIndex = this.allEnemies.indexOf(enemy)
        this.allEnemies.splice(enemyIndex, 1)
        this.emit('decrease_life')
      })
      await waitFor(this.WAIT_DURATION)
    }
  }

  async update() {
    this.allEnemies.forEach((entity) => {
      entity.update()
    })

    if (this.allEnemies.length === 0) {
      this.enemyCount += 2
      await this.spawnEnemies(this.enemyCount)
    }
  }
}
