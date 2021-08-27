import { padNumber } from "../../../../global/utilities";

export default class Timer {
  private element: HTMLDivElement = document.querySelector('#timer');
  private startTime: number;
  private interval: NodeJS.Timer;
  private miliseconds: number = 0;
  private seconds: number = 0;
  private minutes: number = 0;
  private hours: number = 0;
  public isTicking: Boolean = false;

  public start(): void {
    this.startTime = Date.now();
    this.interval = setInterval(this.tick, 1);

    this.isTicking = true;
  }

  public stop(): void {
    clearInterval(this.interval);

    this.isTicking = false;
  }

  public reset(): void {
    this.miliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;

    this.updateElement();
  }

  public getString(): string {
    const milisecondsString = padNumber(this.miliseconds, 3);
    const secondsString = padNumber(this.seconds, 2);
    const minutesString = padNumber(this.minutes, 2);
    const hoursString = padNumber(this.hours, 2);

    return `${hoursString}:${minutesString}:${secondsString}.${milisecondsString}`
  }

  private tick = (): void => {
    const totalMiliseconds = Date.now() - this.startTime;
    const totalSeconds = Math.floor(totalMiliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    this.miliseconds = totalMiliseconds % 1000;
    this.seconds = totalSeconds % 60;
    this.minutes = totalMinutes % 60;
    this.hours = totalHours % 60;

    this.updateElement();
  }

  private updateElement(): void {
    this.element.innerText = this.getString();
  }
}