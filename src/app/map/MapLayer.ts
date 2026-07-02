import { Container, Sprite, Texture } from 'pixi.js'
import tilesData2D from './tilesPlacementData'
import PlacementTile from './PlacementTile'
import Building from '../tower/Tower'
import Projectile from '../projectile/Projectile'
import Explosion from '../projectile/Explosion'
import { Enemy } from '../enemy/Enemy'

const VIRTUAL_WIDTH = 1920
const VIRTUAL_HEIGHT = 1080

enum Tile {
  Empty,
  BuildZone,
  Path,
  Start,
  End,
}

export type Waypoint = {
  x: number
  y: number
}

export type Coordinate = {
  x: number
  y: number
}

export default class MapLayer extends Container {
  readonly tileSize = 64
  private placementTiles: PlacementTile[] = []
  private buildings: Building[] = []
  private projectiles: Projectile[] = []

  constructor() {
    super()
    this.label = 'mapLayer'
    this.renderMapImage()
    this.drawPlacementTiles()
  }

  private drawPlacementTiles() {
    tilesData2D.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 14) {
          const pos: Coordinate = {
            x: x * this.tileSize,
            y: y * this.tileSize,
          }
          this.placeTile(pos)
        }
      })
    })
  }

  private placeTile(pos: Coordinate) {
    const tile = new PlacementTile({
      pos,
      onClick: () => {
        if (tile.occupied) return
        tile.occupied = true
        const building = new Building({ pos })
        this.buildings.push(building)
        this.addChild(building)
      },
    })
    this.placementTiles.push(tile)
    this.addChild(tile)
  }

  renderMapImage() {
    const sprite = new Sprite({
      texture: Texture.from('gameMap.png'),
    })
    this.addChild(sprite)
  }

  public toPixelPath(waypoints: { x: number; y: number }[]) {
    const half = this.tileSize / 2
    return waypoints.map(({ x, y }) => ({
      x: x * this.tileSize + half,
      y: y * this.tileSize + half,
    }))
  }

  public spawnProjectile(building: Building, enemy: Enemy): void {
    if (!building.canShoot) return
    building.resetCooldown()
    building.shoot()

    const projectile = new Projectile(building.center, enemy)
    this.projectiles.push(projectile)
    this.addChild(projectile)
  }

  public update(enemies: Enemy[]) {
    this.buildings.forEach((building) => {
      building.update()

      if (enemies.length > 0) {
        const validEnemies = enemies.filter((e) => {
          const xDifference = e.center.x - building.center.x
          const yDifference = e.center.y - building.center.y
          const distance = Math.hypot(xDifference, yDifference)
          return distance < e.radius + building.shootRadius
        })
        if (validEnemies[0]) this.spawnProjectile(building, validEnemies[0])
      }
    })

    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i]
      p.update()
      const xDifference = p.enemy.center.x - p.x
      const yDifference = p.enemy.center.y - p.y
      const distance = Math.hypot(xDifference, yDifference)
      // hit enemy
      if (distance < p.enemy.size) {
        this.addChild(new Explosion({ x: p.x, y: p.y }))
        p.enemy.health -= 20
        if (p.enemy.health <= 0) {
          const enemyIndex = enemies.indexOf(p.enemy)
          if (enemyIndex !== -1) {
            enemies.splice(enemyIndex, 1)
            p.enemy.destroy()
            this.emit('add_coins', { coins: 10 })
          }
        }
        this.projectiles.splice(i, 1)
        p.destroy()
      }
    }
  }

  resize(width: number, height: number) {
    const naturalWidth = tilesData2D[0].length * this.tileSize
    const naturalHeight = tilesData2D.length * this.tileSize
    // fit: preserve aspect, letterbox. Use Math.max to cover (crop) instead.
    const scale = Math.min(width / naturalWidth, height / naturalHeight)
    this.scale.set(scale)
    this.x = (width - naturalWidth * scale) / 2
    this.y = (height - naturalHeight * scale) / 2
  }
}
