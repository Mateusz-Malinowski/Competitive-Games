import { FieldState } from "../../../../global/games/Minesweeper/FieldState";
import PacketHandler from "./PacketHandler";
import FieldPacket from "../../../../global/games/Minesweeper/packets/client/FieldPacket";
import Map from "./Map";

export default class Field {
  public element: HTMLDivElement;
  private map: Map;
  private row: number;
  private column: number;
  private hasFlag: Boolean = false;

  constructor(map: Map, row: number, column: number) {
    this.map = map;
    this.row = row;
    this.column = column;

    this.element = document.createElement('div');
    this.element.classList.add('field');
  }

  public create(): void {
    this.element.addEventListener('click', this.handleClick);
    this.element.addEventListener('contextmenu', this.handleContextMenu);
    this.element.classList.add('active');
  }

  public destroy(): void {
    this.element.removeEventListener('click', this.handleClick);
    this.element.removeEventListener('contextmenu', this.handleContextMenu);
    this.element.classList.remove('active');
  }

  private handleClick = (): void => {
    const fieldPacket = new FieldPacket(this.row, this.column);
    this.map.packetHandler.sendPacket(fieldPacket);
  }

  private handleContextMenu = (event: Event): void => {
    event.preventDefault();

    if (this.hasFlag)
      this.removeFlag();
    else
      this.setFlag();
  }

  private setFlag(): void {
    this.element.classList.add('flag');
    this.hasFlag = true;
  }

  private removeFlag(): void {
    this.element.classList.remove('flag');
    this.hasFlag = false;
  }

  public reveal(state: FieldState, number?: number): void {
    this.destroy();

    if (this.hasFlag) {
      this.removeFlag();
    }

    switch (state) {
      case FieldState.Mine: {
        this.element.classList.add('mine');
        break;
      }
      case FieldState.Empty: {
        this.element.classList.add('empty');
        break;
      }
      case FieldState.Number: {
        this.element.classList.add(`number-${number}`);
        this.element.innerHTML = '';
        const span = document.createElement('span');
        span.innerText = number.toString();
        this.element.appendChild(span);
        break;
      }
    }
  }
}