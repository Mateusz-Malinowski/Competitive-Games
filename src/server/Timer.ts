import { padNumber } from "../global/utilities";

export default class Timer {
  private startTime: number;
  private interval: NodeJS.Timer;
  private miliseconds: number;
  private seconds: number;
  private minutes: number;
  private hours: number;

  public start(): void {
    this.startTime = Date.now();
    this.interval = setInterval(this.tick, 1);
  }

  public stop(): void {
    clearInterval(this.interval);
  }

  public reset(): void {
    this.miliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
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
  }
}