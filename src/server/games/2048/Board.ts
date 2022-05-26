import Player from "./Player";
import Field from './Field';
import { getRandomInt } from "../../../global/utilities";
import NewTilePacket from "../../../global/games/2048/packets/server/NewTilePacket";
import Timer from '../../Timer';
import { Direction } from "../../../global/games/2048/Direction";
import GameOverPacket from "../../../global/games/2048/packets/server/GameOverPacket";
import GameWonPacket from "../../../global/games/2048/packets/server/GameWonPacket";

interface MoveTileInfo {
  tileMoved: boolean;
  continueMovement: boolean;
}

export default class Board {
  private player: Player;
  private numberOfRows: number;
  private numberOfColumns: number;
  private initialNumbers: number[];
  private firstNumbersCount: number;
  private winThreshold: number;

  private fields: Field[][] = [];
  private timer: Timer = new Timer();

  public constructor(
    player: Player,
    numberOfRows: number,
    numberOfColumns: number,
    initialNumbers: number[],
    firstNumbersCount: number,
    winThreshold: number
  ) {
    this.player = player;
    this.numberOfRows = numberOfRows;
    this.numberOfColumns = numberOfColumns;
    this.initialNumbers = initialNumbers;
    this.firstNumbersCount = firstNumbersCount;
    this.winThreshold = winThreshold;

    this.init();
  }

  public startGame(): void {
    for (let i = 0; i < this.firstNumbersCount; i++) {
      this.addNewTile();
    }

    this.timer.start();
  }

  public handleMoveRequest(direction: Direction): void {
    const tilesWereMoved = this.moveTiles(direction);
    if (tilesWereMoved) {
      if (this.isThresholdReached())
        return this.gameWon();

      this.addNewTile();

      if (!this.isMovePossible())
        return this.gameOver();
    }
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
    } while (this.fields[row][column].number !== 0);

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
        if (this.fields[i][j].number === 0) continue;

        for (let k = 1; k <= j; k++) {
          const fieldToLeft = this.fields[i][j - k];
          const tile = this.fields[i][j - k + 1];

          const moveTileInfo = this.moveTile(tile, fieldToLeft);
          if (!tilesWereMoved && moveTileInfo.tileMoved) tilesWereMoved = true;
          if (!moveTileInfo.continueMovement) break;
        }
      }
    }

    return tilesWereMoved;
  }

  private moveTilesToRight(): boolean {
    let tilesWereMoved = false;

    for (let i = 0; i < this.numberOfRows; i++) {
      for (let j = this.numberOfColumns - 1; j >= 0; j--) {
        if (this.fields[i][j].number === 0) continue;

        for (let k = 1; k <= this.numberOfColumns - j - 1; k++) {
          const fieldToRight = this.fields[i][j + k];
          const tile = this.fields[i][j + k - 1];

          const moveTileInfo = this.moveTile(tile, fieldToRight);
          if (!tilesWereMoved && moveTileInfo.tileMoved) tilesWereMoved = true;
          if (!moveTileInfo.continueMovement) break;
        }
      }
    }

    return tilesWereMoved;
  }

  private moveTilesUp(): boolean {
    let tilesWereMoved = false;

    for (let i = 0; i < this.numberOfColumns; i++) {
      for (let j = 0; j < this.numberOfRows; j++) {
        if (this.fields[j][i].number === 0) continue;

        for (let k = 1; k <= j; k++) {
          const fieldAbove = this.fields[j - k][i];
          const tile = this.fields[j - k + 1][i];

          const moveTileInfo = this.moveTile(tile, fieldAbove);
          if (!tilesWereMoved && moveTileInfo.tileMoved) tilesWereMoved = true;
          if (!moveTileInfo.continueMovement) break;
        }
      }
    }

    return tilesWereMoved;
  }

  private moveTilesDown(): boolean {
    let tilesWereMoved = false;

    for (let i = 0; i < this.numberOfColumns; i++) {
      for (let j = this.numberOfRows - 1; j >= 0; j--) {
        if (this.fields[j][i].number === 0) continue;

        for (let k = 1; k <= this.numberOfRows - 1 - j; k++) {
          const fieldBelow = this.fields[j + k][i];
          const tile = this.fields[j + k - 1][i];

          const moveTileInfo = this.moveTile(tile, fieldBelow);
          if (!tilesWereMoved && moveTileInfo.tileMoved) tilesWereMoved = true;
          if (!moveTileInfo.continueMovement) break;
        }
      }
    }

    return tilesWereMoved;
  }

  private moveTile(tile: Field, nextField: Field): MoveTileInfo {
    if (nextField.number === 0) {
      nextField.number = tile.number;
      tile.number = 0;
      return { tileMoved: true, continueMovement: true };
    }

    if (nextField.number === tile.number) {
      nextField.number += nextField.number;
      tile.number = 0;
      return { tileMoved: true, continueMovement: false };
    }

    return { tileMoved: false, continueMovement: false };
  }

  private isMovePossible(): boolean {
    if (!this.isFull()) return true;

    for (let i = 0; i < this.numberOfRows; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        const field = this.fields[i][j];
        const fieldOnLeft = j === 0 ? new Field(-1) : this.fields[i][j - 1];
        const fieldOnRight = j === this.numberOfColumns - 1 ? new Field(-1) : this.fields[i][j + 1];
        const fieldAbove = i === 0 ? new Field(-1) : this.fields[i - 1][j];
        const fieldBelow = i === this.numberOfRows - 1 ? new Field(-1) : this.fields[i + 1][j];

        if (
          field.number === fieldOnLeft.number ||
          field.number === fieldOnRight.number ||
          field.number === fieldAbove.number ||
          field.number === fieldBelow.number
        )
          return true;
      }
    }

    return false;
  }

  private isFull(): boolean {
    for (let i = 0; i < this.numberOfRows; i++)
      for (let j = 0; j < this.numberOfColumns; j++)
        if (this.fields[i][j].number === 0) return false;

    return true;
  }

  private isThresholdReached(): boolean {
    for (let i = 0; i < this.numberOfRows; i++)
      for (let j = 0; j < this.numberOfColumns; j++)
        if (this.fields[i][j].number >= this.winThreshold) return true;

    return false;
  }

  private gameOver(): void {
    this.timer.stop();

    const time = this.timer.getTotalMiliseconds();
    const gameOverPacket = new GameOverPacket(time);
    this.player.packetHandler.sendPacket(gameOverPacket);
  }

  private gameWon(): void {
    this.timer.stop();

    const time = this.timer.getTotalMiliseconds();
    const gameWonPacket = new GameWonPacket(time);
    this.player.packetHandler.sendPacket(gameWonPacket);
  }
}