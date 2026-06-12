import { engine } from '@/app/getEngine'
import { PausePopup } from '@/app/popups/PausePopup'
import { SettingsPopup } from '@/app/popups/SettingsPopup'
import { Button } from '@/app/ui/Button'
import { FancyButton } from '@pixi/ui'
import { animate, AnimationPlaybackControls } from 'motion'
import { Container } from 'pixi.js'

export class MainUI extends Container {
  private pauseButton: FancyButton
  private settingsButton: FancyButton
  private addButton: FancyButton
  private removeButton: FancyButton

  constructor({ add, remove }: { add: () => void; remove: () => void }) {
    super()

    this.label = 'mainUI'

    const buttonAnimations = {
      hover: {
        props: {
          scale: { x: 1.1, y: 1.1 },
        },
        duration: 100,
      },
      pressed: {
        props: {
          scale: { x: 0.9, y: 0.9 },
        },
        duration: 100,
      },
    }

    this.pauseButton = new FancyButton({
      defaultView: 'icon-pause.png',
      anchor: 0.5,
      animations: buttonAnimations,
    })
    this.pauseButton.onPress.connect(() =>
      engine().navigation.presentPopup(PausePopup),
    )
    this.addChild(this.pauseButton)

    this.settingsButton = new FancyButton({
      defaultView: 'icon-settings.png',
      anchor: 0.5,
      animations: buttonAnimations,
    })
    this.settingsButton.onPress.connect(() =>
      engine().navigation.presentPopup(SettingsPopup),
    )
    this.addChild(this.settingsButton)

    this.addButton = new Button({
      text: 'Add',
      width: 175,
      height: 110,
    })
    this.addButton.onPress.connect(() => add())
    this.addChild(this.addButton)

    this.removeButton = new Button({
      text: 'Remove',
      width: 175,
      height: 110,
    })
    this.removeButton.onPress.connect(() => remove())
    this.addChild(this.removeButton)
  }

  resize(width: number, height: number): void {
    this.pauseButton.x = 30
    this.pauseButton.y = 30
    this.settingsButton.x = width - 30
    this.settingsButton.y = 30
    this.removeButton.x = width / 2 - 100
    this.removeButton.y = height - 75
    this.addButton.x = width / 2 + 100
    this.addButton.y = height - 75
  }

  public async show(): Promise<void> {
    const elementsToAnimate = [
      this.pauseButton,
      this.settingsButton,
      this.addButton,
      this.removeButton,
    ]

    let finalPromise!: AnimationPlaybackControls
    for (const element of elementsToAnimate) {
      element.alpha = 0
      finalPromise = animate(
        element,
        { alpha: 1 },
        { duration: 0.3, delay: 0.75, ease: 'backOut' },
      )
    }

    await finalPromise
  }
}
