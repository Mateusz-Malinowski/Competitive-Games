import Map from './Map';

export default class Results {
  private element: HTMLDivElement = document.querySelector('.results-overlay');
  private infoWrapper: HTMLDivElement = this.element.querySelector('.info-results');
  private timeWrapper: HTMLHeadingElement = this.element.querySelector('.time-results');
  private playButton: HTMLDivElement = this.element.querySelector('.button-results.play');
  private map: Map;
  private time: string;

  constructor(map: Map, time: string) {
    this.map = map;
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
    this.map.render();
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