import { Sprite, Texture } from 'pixi.js'
import { Enemy } from '../Enemy/Enemy'

export default class Projectile extends Sprite {
  private speed = 3
  public radius = 10

  constructor(
    pos: { x: number; y: number },
    public enemy: Enemy,
  ) {
    super()
    this.x = pos.x
    this.y = pos.y
    this.texture = Texture.from('projectile.png')
  }

  update() {
    const dx = this.enemy.center.x - this.x
    const dy = this.enemy.center.y - this.y
    const angle = Math.atan2(dy, dx)
    this.x += Math.cos(angle) * this.speed
    this.y += Math.sin(angle) * this.speed
  }
}
