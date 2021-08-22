import Field from "./Field.js";
import Results from "./Results.js";
import Settings from "./Settings.js";
import Timer from "./Timer.js";

export default class MapController {
  constructor(mapWrapper, timerWrapper) {
    this.mapWrapper = mapWrapper;
    this.timerWrapper = timerWrapper;

    this.init();
  }

  init() {
    this.timer = new Timer(this.timerWrapper);
    this.results = new Results(this, this.timer);
    this.fields = [];
    this.numberOfColumns = null;
    this.numberOfRows = null;
    this.numberOfBombs = null;
    this.gameIsStarted = false;
  }

  create() {
    window.addEventListener('resize', this.adjustFields);
  }

  destroy() {
    window.removeEventListener('resize', this.adjustFields);
  }

  createMap() {
    this.numberOfColumns = Settings.numberOfMapColumns;
    this.numberOfRows = Settings.numberOfMapRows;
    this.numberOfBombs = Settings.numberOfBombs;

    this.gameIsStarted = false;
    this.timer.reset();

    this.createFields();
  }

  createFields() {
    this.mapWrapper.innerHTML = '';
    this.fields = [];
    for (let i = 0; i < this.numberOfRows; i++) {
      this.fields.push([]);
    }

    for (let i = 0; i < this.numberOfRows; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        const field = new Field(this, i, j);
        this.fields[i][j] = field;
        this.mapWrapper.appendChild(field.element);
        field.create();
      }
    }

    this.adjustFields();
  }

  adjustFields = () => {
    const width = this.mapWrapper.clientWidth / this.numberOfColumns;
    const height = this.mapWrapper.clientHeight / this.numberOfRows;
    
    for (let i = 0; i < this.numberOfRows; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        const positionLeft = j * width;
        const positionTop = i * height;

        this.fields[i][j].setSize(width, height);
        this.fields[i][j].setPosition(positionLeft, positionTop);
        this.fields[i][j].setFontSize(height - 5);
      }
    }
  }

  setStates() {
    this.setBombs();
    this.placeNumbers();
  }

  setBombs() {
    for (let i = 0; i < this.numberOfBombs; i++) {
      let field;

      do {
        const row = Math.floor(Math.random() * this.numberOfRows);
        const column = Math.floor(Math.random() * this.numberOfColumns);
        field = this.fields[row][column];
      } while (field.isFirst || field.state == 'bomb')

      field.state = 'bomb';
    }
  }

  placeNumbers() {
    for (let i = 0; i < this.numberOfRows; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        const field = this.fields[i][j];

        if (field.state == 'bomb') {
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

  rowAndColumnExists(row, column) {
    if (row < 0 || column < 0 || row >= this.numberOfRows || column >= this.numberOfColumns) return false;

    return true;
  }

  incrementFieldNumber(row, column) {
    if (!this.rowAndColumnExists(row, column)) return;
    if (this.fields[row][column].state == 'bomb') return;

    this.fields[row][column].state = 'number';
    this.fields[row][column].number++;
  }

  revealAll() {
    for (let i = 0; i < this.numberOfRows; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        this.fields[i][j].reveal();
      }
    }
  }

  revealCloseEmptyFields(row, column) {
    if (!this.rowAndColumnExists(row, column)) return;

    const field = this.fields[row][column];

    if (field.isRevealed) return;

    if (field.state == 'empty') {
      field.reveal();
      this.revealCloseEmptyFields(row - 1, column);
      this.revealCloseEmptyFields(row, column - 1);
      this.revealCloseEmptyFields(row, column + 1);
      this.revealCloseEmptyFields(row + 1, column);

      return;
    }

    field.reveal(); // reveal numbers next to empty fields
  }

  gameIsFinished() {
    for (let i = 0; i < this.numberOfRows; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        const field = this.fields[i][j];

        if ((field.state == 'empty' || field.state == 'number') && !field.isRevealed) {
          return false;
        }
      }
    }

    return true;
  }

  startGame() {
    this.gameIsStarted = true;
    this.timer.start();
    this.setStates();
  }

  endGame(clickedBomb = null) {
    const displayResultsDelay = 2000;

    this.revealAll();
    this.timer.stop();
    this.results.create();

    if (clickedBomb) {
      clickedBomb.classList.add('clicked');
      this.results.display(false, displayResultsDelay);
    }
    else {
      this.results.display(true, displayResultsDelay);
    }
  }
}