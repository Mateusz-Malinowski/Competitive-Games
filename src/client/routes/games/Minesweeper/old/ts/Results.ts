import GameModes from './GameModes';

export default class Results {
  private element = document.querySelector('.results-overlay') as HTMLDivElement;
  private infoWrapper = this.element.querySelector('.info-results') as HTMLDivElement;
  private timeWrapper = this.element.querySelector('.time-results') as HTMLHeadingElement;
  private playButton = this.element.querySelector('.button-results.play') as HTMLDivElement;
  private gameMode: GameModes;
  private time: string;

  constructor(gameMode: GameModes, time: string) {
    this.gameMode = gameMode;
    this.time = time;
  }

  public display(win: Boolean): void {
    this.create();
    
    if (win)
      this.handleWin();
    else
      this.handleDefeat();

    this.timeWrapper.innerText = this.time;
    this.element.style.visibility = 'visible';
  }

  public hide(): void {
    this.element.style.visibility = 'hidden';
    this.destroy();
  }

  public create(): void {
    this.playButton.addEventListener('click', this.handlePlayClick);
  }

  public destroy(): void {
    this.playButton.removeEventListener('click', this.handlePlayClick);
  }

  private handlePlayClick = (): void => {
    this.gameMode.display();
    this.hide();
  }

  private handleWin(): void {
    this.infoWrapper.innerText = 'Congratulations!';
    this.infoWrapper.classList.remove('defeat');
    this.infoWrapper.classList.add('win');
  }

  private handleDefeat(): void {
    this.infoWrapper.innerText = 'Game over!';
    this.infoWrapper.classList.remove('win');
    this.infoWrapper.classList.add('defeat');
  }
}