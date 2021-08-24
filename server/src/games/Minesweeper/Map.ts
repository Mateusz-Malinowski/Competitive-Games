import Field from "./Field";

export default class Map {
  private numberOfRows: number;
  private numberOfColumns: number;
  private numberOfMines: number;

  private fields: Array<Array<Field>> = [];

  constructor(numberOfRows: number, numberOfColumns: number, numberOfMines: number) {
    this.numberOfRows = numberOfRows;
    this.numberOfColumns = numberOfColumns;
    this.numberOfMines = numberOfMines;

    this.generate();
  }

  private generate(): void {
    for (let i = 0; i < this.numberOfRows; i++) {
      this.fields.push([]);
    }

    for (let i = 0; i < this.numberOfRows; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        this.fields[i][j] = new Field();
      }
    }
  }
}