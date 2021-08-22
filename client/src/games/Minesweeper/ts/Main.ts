import MapController from './MapController';

export default class Main {
  private mapWrapper: HTMLDivElement;
  private timerWrapper: HTMLDivElement;
  private mapController: MapController;

  constructor() {
    this.mapWrapper = document.querySelector('#map');
    this.timerWrapper = document.querySelector('#timer');

    this.connect();
    this.init();
  }

  private connect(): void {
    const webSocket = new WebSocket('ws://localhost:3000');

    webSocket.addEventListener('message', (event) => {
      console.log('Message from server', event.data);
    });
  }

  private init(): void {
    this.mapController = new MapController(this.mapWrapper, this.timerWrapper);
    this.mapController.create();
    this.mapController.createMap();
  }
}