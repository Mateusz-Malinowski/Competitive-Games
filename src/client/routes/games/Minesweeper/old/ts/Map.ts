import Field from "./Field";
import PacketHandler from "./PacketHandler";
import FieldPacket from "../../../../../global/games/Minesweeper/packets/server/FieldPacket";
import StartGamePacket from "../../../../../global/games/Minesweeper/packets/client/StartGamePacket";
import gameModes from "../../../../../global/games/Minesweeper/gameModes.json";
import Timer from "./Timer";

export default class Map {
  private element = document.querySelector('#map') as HTMLDivElement;
  public packetHandler: PacketHandler;
  private numberOfRows: number;
  private numberOfColumns: number;
  private fields: Array<Array<Field>>;
  public timer: Timer = new Timer();

  constructor(packetHandler: PacketHandler) {
    this.packetHandler = packetHandler;
  }

  public startGame(gameModeIndex: number): void {
    const gameMode = gameModes[gameModeIndex];

    this.numberOfRows = gameMode.numberOfRows;
    this.numberOfColumns = gameMode.numberOfColumns;

    this.timer.reset();

    const startGamePacket = new StartGamePacket(gameModeIndex);
    this.packetHandler.sendPacket(startGamePacket);

    this.render();
  }

  public revealFieldFromPacket(packet: FieldPacket): void {
    const field = this.fields[packet.row][packet.column];
    field.reveal(packet.state, packet.number);

    if (packet.clicked) {
      field.element.classList.add('clicked');
    }
  }

  public create(): void {
    window.addEventListener('resize', this.adjustFields);
  }

  public destroy(): void {
    window.removeEventListener('resize', this.adjustFields);
  }

  private render(): void {
    this.init();
    this.adjustFields();

    for (let i = 0; i < this.numberOfRows; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        const field = this.fields[i][j];

        this.element.appendChild(field.element);
        field.create();
      }
    }
  }

  private init() {
    this.element.innerHTML = '';
    this.fields = [];

    for (let i = 0; i < this.numberOfRows; i++) {
      this.fields.push([]);
    }

    for (let i = 0; i < this.numberOfRows; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        this.fields[i][j] = new Field(this, i, j);
      }
    }
  }

  private adjustFields = (): void => {
    const width = this.element.clientWidth / this.numberOfColumns;
    const height = this.element.clientHeight / this.numberOfRows;

    for (let i = 0; i < this.numberOfRows; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        const positionLeft = j * width;
        const positionTop = i * height;

        const field = this.fields[i][j];

        field.element.style.width = width + 'px';
        field.element.style.height = height + 'px';
        field.element.style.left = positionLeft + 'px';
        field.element.style.top = positionTop + 'px';
        field.element.style.fontSize = (height - 5) + 'px';
      }
    }
  }
}