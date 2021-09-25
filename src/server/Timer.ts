import { getTimeString } from "../global/utilities";

export default class Timer {
  private startTime: number;
  private currentTime: number;
  private interval: NodeJS.Timer;

  public start(): void {
    this.startTime = Date.now();
    this.interval = setInterval(this.tick, 1);
  }

  public stop(): void {
    clearInterval(this.interval);
  }

  public reset(): void {
    this.startTime = this.currentTime;
  }

  public getString(): string {
    const totalMiliseconds = this.getTotalMiliseconds();
    return getTimeString(totalMiliseconds);
  }

  public getTotalMiliseconds(): number {
    return this.currentTime - this.startTime;
  }

  private tick = (): void => {
    this.currentTime = Date.now();
  }
}