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
  }

  show(parent: Container) {
    const enemy = new Enemy(this.path)

    parent.addChild(enemy)
    this.allEnemies.push(enemy)
  }

  update() {
    this.allEnemies.forEach((entity) => {
      entity.update()
    })
  }
}
