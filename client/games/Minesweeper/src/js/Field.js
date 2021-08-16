export default class Field {
  constructor(mapController, row, column) {
    this.mapController = mapController
    this.row = row;
    this.column = column;

    this.init();
  }

  init() {
    this.state = 'empty';
    this.number = 0;
    this.isRevealed = false;
    this.isFirst = false;
    this.flagIsPlaced = false;
    this.width = null;
    this.height = null;
    this.left = null;
    this.top = null;
    this.element = document.createElement('div');

    this.element.classList.add('field');
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.adjustSize();
  }

  setPosition(left, top) {
    this.left = left;
    this.top = top;
    this.adjustPosition();
  }

  setFontSize(value) {
    this.element.style.fontSize = value + 'px';
  }

  adjustSize() {
    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';
  }

  adjustPosition() {
    this.element.style.left = this.left + 'px';
    this.element.style.top = this.top + 'px';
  }

  create() {
    this.element.addEventListener('click', this.handleClick);
    this.element.addEventListener('contextmenu', this.handleContextMenu);
    this.element.classList.add('active');
  }

  destroy() {
    this.element.removeEventListener('click', this.handleClick);
    this.element.removeEventListener('contextmenu', this.handleContextMenu);
    this.element.classList.remove('active');
  }

  handleClick = () => {
    if (!this.mapController.gameIsStarted) {
      this.isFirst = true;
      this.mapController.startGame();
    }

    switch (this.state) {
      case 'bomb':
        this.mapController.endGame(this.element);
        return;
      case 'empty':
        this.mapController.revealCloseEmptyFields(this.row, this.column);
        if (this.mapController.gameIsFinished()) {
          this.mapController.endGame();
        }
        return;
      case 'number':
        this.reveal();
        if (this.mapController.gameIsFinished()) {
          this.mapController.endGame();
        }
        return;
    }
  }

  handleContextMenu = (event) => {
    event.preventDefault();

    if (this.flagIsPlaced)
      this.removeFlag();
    else
      this.placeFlag();
  }

  placeFlag() {
    this.element.classList.add('flag');
    this.flagIsPlaced = true;
  }

  removeFlag() {
    this.element.classList.remove('flag');
    this.flagIsPlaced = false;
  }

  reveal() {
    this.destroy();
    if (this.flagIsPlaced) {
      this.removeFlag();
    }

    switch (this.state) {
      case 'empty':
        this.element.classList.add('empty');
        break;
      case 'bomb':
        this.element.classList.add('bomb');
        break;
      case 'number':
        this.element.classList.add(`number-${this.number}`);

        this.element.innerHTML = '';
        const span = document.createElement('span');
        span.innerText = this.number;
        this.element.appendChild(span);
        break;
    }

    this.isRevealed = true;
  }
}