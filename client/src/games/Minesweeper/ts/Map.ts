import Field from "./Field";
import PacketHandler from "./PacketHandler";
import FieldPacket from "./packets/server/FieldPacket";

export default class Map {
  private element: HTMLDivElement = document.querySelector('#map');
  private packetHandler: PacketHandler;
  private numberOfRows: number;
  private numberOfColumns: number;
  private fields: Array<Array<Field>>;

  constructor(packetHandler: PacketHandler, numberOfRows: number, numberOfColumns: number) {
    this.packetHandler = packetHandler;
    this.numberOfRows = numberOfRows;
    this.numberOfColumns = numberOfColumns;
  }

  public render(): void {
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

  public handleFieldPacket(packet: FieldPacket): void {
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

  private init() {
    this.element.innerHTML = '';
    this.fields = [];

    for (let i = 0; i < this.numberOfRows; i++) {
      this.fields.push([]);
    }

    for (let i = 0; i < this.numberOfRows; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        this.fields[i][j] = new Field(this.packetHandler, i, j);
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