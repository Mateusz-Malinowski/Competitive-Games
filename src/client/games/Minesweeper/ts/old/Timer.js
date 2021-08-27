import { padNumber } from "./utilities";

export default class Timer {
  constructor(timerWrapper) {
    this.timerWrapper = timerWrapper;
    this.string = '';

    this.init();
  }

  init() {
    this.isRunning = false;
    this.interval = null;
    this.miliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.startTime = null;

    this.updateWrapper();
  }

  start() {
    this.isRunning = true;
    this.startTime = Date.now();

    this.interval = setInterval(this.tick, 1);
  }

  tick = () => {
    const time = Date.now() - this.startTime;

    const totalSeconds = parseInt(time / 1000);
    const totalMinutes = parseInt(totalSeconds / 60);
    const totalHours = parseInt(totalMinutes / 60);
    
    this.miliseconds = time % 1000;
    this.seconds = totalSeconds % 60;
    this.minutes = totalMinutes % 60;
    this.hours = totalHours % 60;

    this.updateWrapper();
  }
  
  stop() {
    this.isRunning = false;
    clearInterval(this.interval);
  }

  reset() {
    this.miliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;

    this.updateWrapper();
  }

  updateString() {
    const milisecondsString = padNumber(this.miliseconds, 3);
    const secondsString = padNumber(this.seconds, 2);
    const minutesString = padNumber(this.minutes, 2);
    const hoursString = padNumber(this.hours, 2);

    this.string = `${hoursString}:${minutesString}:${secondsString}.${milisecondsString}`;
  }

  updateWrapper() {
    this.updateString();
    this.timerWrapper.innerText = this.string;
  }
}