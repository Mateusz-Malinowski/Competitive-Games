import Timer from "../../Timer";
import { getRandomInt } from "../../../global/utilities";
import Field from "./Field";
import { FieldState } from "../../../global/games/Minesweeper/FieldState";
import FieldPacket from "../../../global/games/Minesweeper/packets/server/FieldPacket";
import GameOverPacket from "../../../global/games/Minesweeper/packets/server/GameOverPacket";
import GameWonPacket from "../../../global/games/Minesweeper/packets/server/GameWonPacket";
import Player from "./Player";
import { PlayerState } from "./PlayerState";

export default class Map {
  private player: Player;
  private numberOfRows: number;
  private numberOfColumns: number;
  private numberOfMines: number;
  private timer = new Timer();

  private fields: Array<Array<Field>> = [];

  constructor(player: Player, numberOfRows: number, numberOfColumns: number, numberOfMines: number) {
    this.player = player;
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
        this.gameOver();
        break;
      }
      case FieldState.Number: {
        this.sendFieldPacket(row, column);
        if (this.gameIsFinished()) this.gameWon();
        break;
      }
      case FieldState.Empty: {
        this.sendNearEmptyFields(row, column);
        if (this.gameIsFinished()) this.gameWon();
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

    this.handleInput(firstFieldRow, firstFieldColumn);

    this.timer.start();
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

    this.player.packetHandler.sendPacket(fieldPacket);
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

  private endGame(): void {
    this.timer.stop();
    this.player.state = PlayerState.Finished;
    this.sendAllRemaining();
  }

  private gameOver(): void {
    this.endGame();

    const time = this.timer.getString();
    const gameOverPacket = new GameOverPacket(time);
    this.player.packetHandler.sendPacket(gameOverPacket);
  }

  private gameWon(): void {
    this.endGame();

    const time = this.timer.getString();
    const gameWonPacket = new GameWonPacket(time);
    this.player.packetHandler.sendPacket(gameWonPacket);
  }

  private rowAndColumnExists(row: number, column: number): Boolean {
    if (row < 0 || column < 0 || row >= this.numberOfRows || column >= this.numberOfColumns) return false;

    return true;
  }

  private gameIsFinished(): Boolean {
    for (let i = 0; i < this.numberOfRows; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        const field = this.fields[i][j];

        const fieldShouldBeRevealed = field.state == FieldState.Empty || field.state == FieldState.Number;

        if (fieldShouldBeRevealed && !field.isRevealed) return false;
      }
    }

    return true;
  }
}