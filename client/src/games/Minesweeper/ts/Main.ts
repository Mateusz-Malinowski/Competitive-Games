import MapController from './MapController';

export default class Main {
  private appWrapper: HTMLDivElement;
  private mapWrapper: HTMLDivElement;
  private timerWrapper: HTMLDivElement;
  private errorWrapper: HTMLDivElement;
  private mapController: MapController;

  constructor() {
    this.appWrapper = document.querySelector('#app');
    this.mapWrapper = document.querySelector('#map');
    this.timerWrapper = document.querySelector('#timer');
    this.errorWrapper = document.querySelector('.connection-error');

    this.start();
  }

  private async start(): Promise<void> {
    try {
      await this.connect();
      this.init();
    }
    catch {
      this.appWrapper.style.display = 'none';
      this.errorWrapper.style.display = 'flex';
    }
  }

  private connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const webSocket = new WebSocket('ws://localhost:3000/Minesweeper');

      webSocket.addEventListener('error', () => {
        reject();
      });

      webSocket.addEventListener('open', () => {
        resolve();
      });
    });
  }

  private init(): void {
    this.mapController = new MapController(this.mapWrapper, this.timerWrapper);
    this.mapController.create();
    this.mapController.createMap();
  }
}