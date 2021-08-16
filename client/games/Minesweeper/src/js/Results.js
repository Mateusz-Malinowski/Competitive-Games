export default class Results {
  constructor(mapController, timer) {
    this.mapController = mapController;
    this.timer = timer;
    this.wrapper = document.querySelector('.results-overlay');
    this.infoWrapper = this.wrapper.querySelector('.info-results');
    this.timerWrapper = this.wrapper.querySelector('.timer-results');
    this.playButton = this.wrapper.querySelector('.button-results.play');
  }

  init() {

  }

  create() {
    this.playButton.addEventListener('click', this.handlePlay);
  }

  destroy() {
    this.playButton.removeEventListener('click', this.handlePlay);
  }

  handlePlay = () => {
    this.mapController.createMap(this.numberOfMapColumns, this.numberOfMapRows, this.numberOfBombs);
    this.hide();
  }

  display(playerWon, delay) {
    setTimeout(() => {
      this.infoWrapper.innerText = playerWon ? 'Congratulations!' : 'Game over!';
      this.infoWrapper.classList.add(playerWon ? 'win' : 'fail');
      this.timerWrapper.innerText = this.timer.string;
      this.wrapper.style.visibility = 'visible';
    }, delay);
  }

  hide() {
    this.wrapper.style.visibility = 'hidden';
  }
}