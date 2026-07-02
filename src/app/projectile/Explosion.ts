import { AnimatedSprite, Rectangle, Texture } from 'pixi.js'

export default class Explosion extends AnimatedSprite {
  private static readonly FRAME_COUNT = 4

  constructor(pos: { x: number; y: number }, size = 64) {
    super(Explosion.buildFrames())

    this.anchor.set(0.5)
    this.x = pos.x
    this.y = pos.y
    this.width = size
    this.height = size
    this.loop = false
    this.animationSpeed = 0.3
    this.onComplete = () => this.destroy()
    this.play()
  }

  private static buildFrames(): Texture[] {
    const base = Texture.from('explosion.png')
    const { source, frame } = base
    const fw = frame.width / Explosion.FRAME_COUNT

    return Array.from(
      { length: Explosion.FRAME_COUNT },
      (_, i) =>
        new Texture({
          source,
          frame: new Rectangle(frame.x + i * fw, frame.y, fw, frame.height),
        }),
    )
  }
}
