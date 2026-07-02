import { Container, Graphics, Text } from 'pixi.js'

const heartSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="size-6" width="30" height="300">
  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
</svg>
`

const coinSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="yellow"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M192 160L192 144C192 99.8 278 64 384 64C490 64 576 99.8 576 144L576 160C576 190.6 534.7 217.2 474 230.7C471.6 227.9 469.1 225.2 466.6 222.7C451.1 207.4 431.1 195.8 410.2 187.2C368.3 169.7 313.7 160.1 256 160.1C234.1 160.1 212.7 161.5 192.2 164.2C192 162.9 192 161.5 192 160.1zM496 417L496 370.8C511.1 366.9 525.3 362.3 538.2 356.9C551.4 351.4 564.3 344.7 576 336.6L576 352C576 378.8 544.5 402.5 496 417zM496 321L496 288C496 283.5 495.6 279.2 495 275C510.5 271.1 525 266.4 538.2 260.8C551.4 255.2 564.3 248.6 576 240.5L576 255.9C576 282.7 544.5 306.4 496 320.9zM64 304L64 288C64 243.8 150 208 256 208C362 208 448 243.8 448 288L448 304C448 348.2 362 384 256 384C150 384 64 348.2 64 304zM448 400C448 444.2 362 480 256 480C150 480 64 444.2 64 400L64 384.6C75.6 392.7 88.5 399.3 101.8 404.9C143.7 422.4 198.3 432 256 432C313.7 432 368.3 422.3 410.2 404.9C423.4 399.4 436.3 392.7 448 384.6L448 400zM448 480.6L448 496C448 540.2 362 576 256 576C150 576 64 540.2 64 496L64 480.6C75.6 488.7 88.5 495.3 101.8 500.9C143.7 518.4 198.3 528 256 528C313.7 528 368.3 518.3 410.2 500.9C423.4 495.4 436.3 488.7 448 480.6z"/></svg>
`

export class MainUI extends Container {
  public readonly SIDEBAR_WIDTH = 200
  private lifeCount: number = 0
  private coinCount: number = 0
  private lifeText: Text = new Text()
  private coinText: Text = new Text()
  private gameOverText: Text = new Text()
  private lifeTextContainer = new Container()
  private coinTextContainer = new Container()
  private sidebar: Graphics

  constructor({ lifeCount }: { lifeCount: number }) {
    super()

    this.label = 'mainUI'
    this.lifeCount = lifeCount

    this.sidebar = new Graphics()
      .rect(0, 0, this.SIDEBAR_WIDTH, window.innerHeight)
      .fill(0x000000)

    this.sidebar.alpha = 0.5
    this.addChild(this.sidebar)

    this.createLifeText()
    this.createCoinText()

    this.createGameOverText()
  }

  private createLifeText() {
    this.lifeText = new Text({
      text: `${this.lifeCount}`,
      style: {
        fill: 'white',
        fontSize: 36,
        stroke: {
          width: 4,
          color: 'black',
        },
      },
    })

    const graphics = new Graphics().svg(heartSVG)
    graphics.width = 30
    graphics.height = 30
    this.lifeText.x = graphics.width + 5
    this.lifeText.y = -2
    this.lifeTextContainer.addChild(graphics, this.lifeText)
    this.addChild(this.lifeTextContainer)
  }

  private createCoinText() {
    this.coinText = new Text({
      text: `${this.coinCount}`,
      style: {
        fill: 'white',
        fontSize: 36,
        stroke: {
          width: 4,
          color: 'black',
        },
      },
    })

    const graphics = new Graphics().svg(coinSVG)
    graphics.width = 30
    graphics.height = 30
    this.coinText.x = graphics.width + 5
    this.coinText.y = -2
    this.coinTextContainer.addChild(graphics, this.coinText)
    this.addChild(this.coinTextContainer)
  }

  private createGameOverText() {
    this.gameOverText = new Text({
      text: 'GAME OVER',
      style: {
        fill: '#ffffff',
        stroke: {
          width: 4,
          color: '#000000',
        },
        fontSize: 72,
      },
      anchor: 0.5,
      visible: false,
    })
    this.addChild(this.gameOverText)
  }

  public updateLifeText(lifeCount: number) {
    this.lifeText.text = lifeCount
  }

  public updateCoinText(coinsCount: number) {
    this.coinText.text = coinsCount
  }

  public showGameOverText() {
    this.gameOverText.visible = true
  }

  resize(width: number, height: number): void {
    this.lifeTextContainer.x = this.width / 2 - this.lifeTextContainer.width / 2
    this.lifeTextContainer.y = 30
    this.coinTextContainer.x = this.width / 2 - this.coinTextContainer.width / 2
    this.coinTextContainer.y =
      this.lifeTextContainer.y + this.lifeTextContainer.height + 10
    this.gameOverText.x = width / 2
    this.gameOverText.y = height / 2
    this.x = width - this.SIDEBAR_WIDTH
    this.height = height
  }
}
