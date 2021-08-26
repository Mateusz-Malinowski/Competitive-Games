import Timer from "../../Timer";
import { getRandomInt } from "../../utilities";
import Field from "./Field";
import { FieldState } from "./FieldState";
import PacketHandler from "./PacketHandler";
import FieldPacket from "./packets/server/FieldPacket";
import { ServerPacketType } from "./packets/server/ServerPacketType";

export default class Map {
  private packetHandler: PacketHandler;
  private numberOfRows: number;
  private numberOfColumns: number;
  private numberOfMines: number;
  private timer = new Timer();

  private fields: Array<Array<Field>> = [];

  constructor(packetHandler: PacketHandler, numberOfRows: number, numberOfColumns: number, numberOfMines: number) {
    this.packetHandler = packetHandler;
    this.numberOfRows = numberOfRows;
    this.numberOfColumns = numberOfColumns;
    this.numberOfMines = numberOfMines;
  }

  public handleInput(row: number, column: number): void {
    if (!this.rowAndColumnExists(row, column)) return;

    const field = this.fields[row][column];

    if (field.isRevealed) return;

    switch (field.state) {
      case FieldState.Mine: {
        this.sendFieldPacket(row, column, true);
        this.sendAllRemaining();
        this.gameOver();
        break;
      }
      case FieldState.Number: {
        this.sendFieldPacket(row, column);
        break;
      }
      case FieldState.Empty: {
        this.sendNearEmptyFields(row, column);
        break;
      }
    }
  }

  public startGame(firstFieldRow: number, firstFieldColumn: number): void {
    if (!this.rowAndColumnExists(firstFieldRow, firstFieldColumn)) return;

    this.init();

    const field = this.fields[firstFieldRow][firstFieldColumn];
    field.isFirst = true;

    this.generate();
    this.timer.start();

    this.handleInput(firstFieldRow, firstFieldColumn);
  }

  private init(): void {
    for (let i = 0; i < this.numberOfRows; i++) {
      this.fields.push([]);
    }

    for (let i = 0; i < this.numberOfRows; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        this.fields[i][j] = new Field();
      }
    }
  }

  private generate(): void {
    this.setMines();
    this.setNumbers();
  }

  private setMines(): void {
    const availableMineFields = [];
    for (let i = 0; i < this.numberOfRows; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        const field = this.fields[i][j];
        if (field.isFirst) continue;

        availableMineFields.push(field);
      }
    }

    for (let i = 0; i < this.numberOfMines; i++) {
      const index = getRandomInt(0, availableMineFields.length);
      const field = availableMineFields[index];
      field.state = FieldState.Mine;
      availableMineFields.splice(index, 1);
    }
  }

  private setNumbers(): void {
    for (let i = 0; i < this.numberOfRows; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        const field = this.fields[i][j];

        if (field.state == FieldState.Mine) {
          this.incrementFieldNumber(i - 1, j - 1);
          this.incrementFieldNumber(i - 1, j);
          this.incrementFieldNumber(i - 1, j + 1);
          this.incrementFieldNumber(i, j - 1);
          this.incrementFieldNumber(i, j + 1);
          this.incrementFieldNumber(i + 1, j - 1);
          this.incrementFieldNumber(i + 1, j);
          this.incrementFieldNumber(i + 1, j + 1);
        }
      }
    }
  }

  private incrementFieldNumber(row: number, column: number): void {
    if (!this.rowAndColumnExists(row, column)) return;

    const field = this.fields[row][column];

    if (field.state == FieldState.Mine) return;
    if (field.state == FieldState.Empty) {
      field.state = FieldState.Number;
    }

    field.number++;
  }

  private sendFieldPacket(row: number, column: number, clicked?: Boolean): void {
    const field = this.fields[row][column];
    field.isRevealed = true;

    const fieldPacket = new FieldPacket(row, column, field.state);

    if (field.state == FieldState.Number) {
      fieldPacket.number = field.number;
    }

    if (clicked) {
      fieldPacket.clicked = true;
    }

    this.packetHandler.sendPacket(fieldPacket);
  }

  private sendNearEmptyFields(row: number, column: number): void {
    if (!this.rowAndColumnExists(row, column)) return;

    const field = this.fields[row][column];

    if (field.isRevealed) return;

    if (field.state == FieldState.Empty) {
      this.sendFieldPacket(row, column);

      this.sendNearEmptyFields(row - 1, column); // top
      this.sendNearEmptyFields(row, column - 1); // left
      this.sendNearEmptyFields(row, column + 1); // right
      this.sendNearEmptyFields(row + 1, column); // bottom

      return;
    }

    // only numbers here - mines can't appear next to empty fields

    this.sendFieldPacket(row, column); // send number next to empty
  }

  private sendAllRemaining(): void {
    for (let i = 0; i < this.numberOfRows; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        const field = this.fields[i][j];

        if (field.isRevealed) continue;

        this.sendFieldPacket(i, j);
      }
    }
  }

  private gameOver(): void {
    
  }

  private rowAndColumnExists(row: number, column: number): Boolean {
    if (row < 0 || column < 0 || row >= this.numberOfRows || column >= this.numberOfColumns) return false;

    return true;
  }
}