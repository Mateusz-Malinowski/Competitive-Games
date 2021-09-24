import gameModes from "../../../../../global/games/Minesweeper/gameModes.json";
import Map from "./Map";

interface GameModeButton extends HTMLDivElement {
  gameModeIndex: number
}

export default class GameModes {
  private element = document.querySelector('.game-modes-overlay') as HTMLDivElement;
  private map: Map;
  private buttons: HTMLDivElement[] = [];

  constructor(map: Map) {
    this.map = map;

    this.init();
  }

  public display(): void {
    this.create();
    this.element.style.visibility = 'visible';
  }

  public hide(): void {
    this.element.style.visibility = 'hidden';
    this.destroy();
  }

  public create(): void {
    for (let i = 0; i < this.buttons.length; i++) {
      const button = this.buttons[i];
      button.addEventListener('click', this.handleClick);
    }
  }

  public destroy(): void {
    for (let i = 0; i < this.buttons.length; i++) {
      const button = this.buttons[i];
      button.removeEventListener('click', this.handleClick);
    }
  }

  private handleClick = (event: Event): void => {
    const button = event.currentTarget as GameModeButton;
    const index = button.gameModeIndex;
    const gameMode = gameModes[index];
    this.map.startGame(index);
    this.hide();
  }

  private init(): void {
    for (let i = 0; i < gameModes.length; i++) {
      const gameMode = gameModes[i];

      const button = document.createElement('div') as GameModeButton;
      const dimensionsSpan = document.createElement('span');
      const minesSpan = document.createElement('span');
      button.appendChild(dimensionsSpan);
      button.appendChild(minesSpan);

      button.classList.add('game-mode-button');
      dimensionsSpan.classList.add('dimensions');
      minesSpan.classList.add('mines-count');

      dimensionsSpan.innerText = `${gameMode.numberOfRows}x${gameMode.numberOfColumns}`;
      minesSpan.innerText = `${gameMode.numberOfMines} mines`;

      button.gameModeIndex = i;

      this.buttons.push(button);
      this.element.appendChild(button);
    }
  }
}
