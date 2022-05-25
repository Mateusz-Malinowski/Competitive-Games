import Player from "./Player";
import Field from './Field';
import { getRandomInt } from "../../../global/utilities";
import NewTilePacket from "../../../global/games/2048/packets/server/NewTilePacket";
import Timer from '../../Timer';
import { Direction } from "../../../global/games/2048/Direction";
import Logger from "../../Logger";

export default class Board {
  private player: Player;
  private numberOfRows: number;
  private numberOfColumns: number;
  private initialNumbers: number[];
  private firstNumbersCount: number;
  private fields: Field[][] = [];
  private timer: Timer = new Timer();

  public constructor(
    player: Player, 
    numberOfRows: number, 
    numberOfColumns: number, 
    initialNumbers: number[],
    firstNumbersCount: number,
  ) {
    this.player = player;
    this.numberOfRows = numberOfRows;
    this.numberOfColumns = numberOfColumns;
    this.initialNumbers = initialNumbers;
    this.firstNumbersCount = firstNumbersCount;

    this.init();
  }

  public startGame(): void {
    for (let i = 0; i < this.firstNumbersCount; i++)
      this.addNewTile();

    this.timer.start();
  }

  public handleMoveRequest(direction: Direction): void {
    const tilesWereMoved = this.moveTiles(direction);
    if (tilesWereMoved)
      this.addNewTile();
  }

  private init(): void {
    for (let i = 0; i < this.numberOfRows; i++) {
      this.fields.push([]);

      for (let j = 0; j < this.numberOfColumns; j++)
        this.fields[i][j] = new Field();
    }
  }

  private addNewTile(): void {
    let row, column;
    do {
      row = getRandomInt(0, this.numberOfRows);
      column = getRandomInt(0, this.numberOfColumns);
    } while (this.fields[row][column].number != 0);

    const index = getRandomInt(0, this.initialNumbers.length);
    const number = this.initialNumbers[index];

    this.fields[row][column].number = number;
    const newTilePacket: NewTilePacket = new NewTilePacket(row, column, number);
    this.player.packetHandler.sendPacket(newTilePacket);
  }

  private moveTiles(direction: Direction): boolean {
    switch (direction) {
      case Direction.Left:
        return this.moveTilesToLeft();
      case Direction.Right:
        return this.moveTilesToRight();
      case Direction.Up:
        return this.moveTilesUp();
      case Direction.Down:
        return this.moveTilesDown();
    }
  }

  private moveTilesToLeft(): boolean {
    let tilesWereMoved = false;

    for (let i = 0; i < this.numberOfRows; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        const field = this.fields[i][j];
        if (field.number === 0) continue;

        for (let k = 1; k <= j; k++) {
          const fieldToLeft = this.fields[i][j - k];
          const tile = this.fields[i][j - k + 1];

          if (fieldToLeft.number === 0) {
            fieldToLeft.number = tile.number;
            tile.number = 0;
            if (!tilesWereMoved)
              tilesWereMoved = true;
          }

          else if (fieldToLeft.number === tile.number) {
            fieldToLeft.number += fieldToLeft.number;
            tile.number = 0;
            if (!tilesWereMoved)
              tilesWereMoved = true;
            break;
          }

          else break;
        }
      }
    }

    return tilesWereMoved;
  }

  private moveTilesToRight(): boolean {
    let tilesWereMoved = false;

    for (let i = 0; i < this.numberOfRows; i++) {
      for (let j = this.numberOfColumns - 1; j >= 0; j--) {
        const field = this.fields[i][j];
        if (field.number === 0) continue;

        for (let k = 1; k <= this.numberOfColumns - j - 1; k++) {
          const fieldToRight = this.fields[i][j + k];
          const tile = this.fields[i][j + k - 1];

          if (fieldToRight.number === 0) {
            fieldToRight.number = tile.number;
            tile.number = 0;
            if (!tilesWereMoved)
              tilesWereMoved = true;
          }

          else if (fieldToRight.number === tile.number) {
            fieldToRight.number += fieldToRight.number;
            tile.number = 0;
            if (!tilesWereMoved)
              tilesWereMoved = true;
            break;
          }

          else break;
        }
      }
    }

    return tilesWereMoved;
  }

  private moveTilesUp(): boolean {
    let tilesWereMoved = false;

    for (let i = 0; i < this.numberOfColumns; i++) {
      for (let j = 0; j < this.numberOfRows; j++) {
        const field = this.fields[j][i];
        if (field.number === 0) continue;

        for (let k = 1; k <= j; k++) {
          const fieldAbove = this.fields[j - k][i];
          const tile = this.fields[j - k + 1][i];

          if (fieldAbove.number === 0) {
            fieldAbove.number = tile.number;
            tile.number = 0;
            if (!tilesWereMoved)
              tilesWereMoved = true;
          }

          else if (fieldAbove.number === tile.number) {
            fieldAbove.number += fieldAbove.number;
            tile.number = 0;
            if (!tilesWereMoved)
              tilesWereMoved = true;
            break;
          }

          else break;
        }
      }
    }

    return tilesWereMoved;
  }

  private moveTilesDown(): boolean {
    let tilesWereMoved = false;

    for (let i = 0; i < this.numberOfColumns; i++) {
      for (let j = this.numberOfRows - 1; j >= 0; j--) {
        const field = this.fields[j][i];
        if (field.number === 0) continue;

        for (let k = 1; k <= this.numberOfRows - 1 - j; k++) {
          const fieldBelow = this.fields[j + k][i];
          const tile = this.fields[j + k - 1][i];

          if (fieldBelow.number === 0) {
            fieldBelow.number = tile.number;
            if (!tilesWereMoved)
              tilesWereMoved = true;
          }

          else if (fieldBelow.number === tile.number) {
            fieldBelow.number += fieldBelow.number;
            tile.number = 0;
            if (!tilesWereMoved)
              tilesWereMoved = true;
            break;
          }

          else break;
        }
      }
    }

    return tilesWereMoved;
  }
}