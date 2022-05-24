import Player from "./Player";
import Field from './Field';
import { getRandomInt } from "../../../global/utilities";
import NewTilePacket from "../../../global/games/2048/packets/server/NewTilePacket";
import Logger from "../../Logger";

export default class Board {
  private player: Player;
  private numberOfRows: number;
  private numberOfColumns: number;
  private initialNumbers: number[];
  private firstNumbersCount: number;
  private fields: Field[][] = [];

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
}