import { getTimeString } from "../global/utilities";

export default class Timer {
  private isTicking: boolean = false;
  private startTime: number;
  private totalMiliseconds: number = 0;
  private interval: NodeJS.Timer;

  public start(): void {
    if (this.isTicking) return;

    this.startTime = Date.now() - this.totalMiliseconds;
    this.interval = setInterval(this.tick, 1);
    this.isTicking = true;
  }

  public stop(): void {
    if (!this.isTicking) return;

    clearInterval(this.interval);
    this.isTicking = false;
  }

  public reset(): void {
    this.totalMiliseconds = 0;
    this.startTime = Date.now();
  }

  public getString(): string {
    return getTimeString(this.totalMiliseconds);
  }

  public getTotalMiliseconds(): number {
    return this.totalMiliseconds;
  }

  private tick = (): void => {
    this.totalMiliseconds = Date.now() - this.startTime;
  }
}