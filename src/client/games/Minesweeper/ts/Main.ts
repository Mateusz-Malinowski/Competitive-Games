import GameModes from "./GameModes";
import Map from "./Map";
import PacketHandler from "./PacketHandler";

export default class Main {
  private appWrapper: HTMLDivElement = document.querySelector('#app');
  private errorWrapper: HTMLDivElement = document.querySelector('.connection-error');
  private packetHandler: PacketHandler;
  public gameModes: GameModes;
  public map: Map;

  constructor() {
    this.start();
  }

  private async start(): Promise<void> {
    let webSocket;

    try {
      webSocket = await this.connect();
    }
    catch {
      this.appWrapper.style.display = 'none';
      this.errorWrapper.style.display = 'flex';
      return;
    }

    this.packetHandler = new PacketHandler(this, webSocket);
    this.packetHandler.listenForMessages();
    this.map = new Map(this.packetHandler);
    this.map.create();
    this.gameModes = new GameModes(this.map);
    this.gameModes.display();
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