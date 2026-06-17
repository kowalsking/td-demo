import type { Ticker } from 'pixi.js'
import { Container } from 'pixi.js'
import { engine } from '../../getEngine'
import { PausePopup } from '../../popups/PausePopup'
import { Bouncer } from './Bouncer'
import { MainUI } from './MainUI'
import MapLayer from '@/app/map/MapLayer'
import EnemyManager from '@/app/Enemy/EnemyManager'

/** The screen that holds the app */
export class MainScreen extends Container {
  /** Assets bundles required by this screen */
  public static assetBundles = ['main']

  public mainContainer: Container

  private bouncer: Bouncer
  private paused = false
  // private mainUI: MainUI
  private mapLayer: MapLayer
  private enemy: EnemyManager

  constructor() {
    super()

    this.mainContainer = new Container()
    this.mainContainer.label = 'mainContainer'
    this.addChild(this.mainContainer)
    this.bouncer = new Bouncer()
    // this.mainUI = new MainUI({
    //   add: () => this.bouncer.add(),
    //   remove: () => this.bouncer.remove(),
    // })
    this.mapLayer = new MapLayer()

    this.enemy = new EnemyManager(
      this.mapLayer.toPixelPath(this.mapLayer.enemyPath),
    )
    this.addChild(this.mapLayer)
    // this.addChild(this.mainUI)
  }

  /** Prepare the screen just before showing */
  public prepare() {}

  /** Update the screen */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(_time: Ticker) {
    if (this.paused) return
    this.bouncer.update()
    this.enemy.update()
  }

  /** Pause gameplay - automatically fired when a popup is presented */
  public async pause() {
    this.mainContainer.interactiveChildren = false
    this.paused = true
  }

  /** Resume gameplay */
  public async resume() {
    this.mainContainer.interactiveChildren = true
    this.paused = false
  }

  /** Fully reset */
  public reset() {}

  /** Resize the screen, fired whenever window size changes */
  public resize(width: number, height: number) {
    const centerX = width * 0.5
    const centerY = height * 0.5

    this.mainContainer.x = centerX
    this.mainContainer.y = centerY
    // this.mainUI.resize(width, height)

    this.bouncer.resize(width, height)
    // this.mapLayer.resize(width, height)
  }

  /** Show screen with animations */
  public async show(): Promise<void> {
    engine().audio.bgm.play('main/sounds/bgm-main.mp3', { volume: 0.5 })

    // await this.mainUI.show()
    this.bouncer.show(this)
    this.enemy.show(this.mapLayer)
  }

  /** Hide screen with animations */
  public async hide() {}

  /** Auto pause the app when window go out of focus */
  public blur() {
    if (!engine().navigation.currentPopup) {
      engine().navigation.presentPopup(PausePopup)
    }
  }
}
