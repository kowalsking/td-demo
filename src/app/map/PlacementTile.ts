import { Graphics } from 'pixi.js'

interface IPlacementData {
  pos: { x: number; y: number }
  onClick(): void
}

export default class PlacementTile extends Graphics {
  private size = 64
  public occupied = false

  constructor({ pos = { x: 0, y: 0 }, onClick }: IPlacementData) {
    super()
    this.x = pos.x
    this.y = pos.y
    this.rect(0, 0, this.size, this.size).fill('rgba(255, 255, 255, 0.15)')

    this.eventMode = 'static'
    this.on('mouseenter', () => this.setHovered(true))
    this.on('mouseleave', () => this.setHovered(false))
    this.on('mousedown', onClick)
  }

  private setHovered(hovered: boolean) {
    this.clear()
    this.rect(0, 0, this.size, this.size).fill(
      hovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.15)',
    )
  }
}
