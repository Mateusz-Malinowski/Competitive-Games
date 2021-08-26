import Map from "./Map";
import PacketHandler from "./PacketHandler";

export default class Main {
  private appWrapper: HTMLDivElement;
  private errorWrapper: HTMLDivElement;
  private packetHandler: PacketHandler;
  public map: Map;

  constructor() {
    this.appWrapper = document.querySelector('#app');
    this.errorWrapper = document.querySelector('.connection-error');

    this.start();
  }

  private async start(): Promise<void> {
    try {
      const webSocket = await this.connect();
      this.packetHandler = new PacketHandler(this, webSocket);
      this.map = new Map(this.packetHandler, 15, 15);
      this.packetHandler.listenForMessages();
      this.map.render();
      this.map.create();
    }
    catch {
      this.appWrapper.style.display = 'none';
      this.errorWrapper.style.display = 'flex';
    }
  }

  private connect(): Promise<WebSocket> {
    return new Promise((resolve, reject) => {
      const webSocket = new WebSocket('ws://localhost:3000/Minesweeper');
      
      webSocket.addEventListener('error', () => {
        reject();
      });
      
      webSocket.addEventListener('open', () => {
        resolve(webSocket);
      });
    });
  }
}