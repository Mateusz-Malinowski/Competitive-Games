import WebSocket from "ws";
import GameServer from "./GameServer";
import Logger from "./Logger";

export default class Player {
  private gameServer: GameServer;
  public webSocket: WebSocket;
  private ip: string;
  public isAlive: Boolean = true;

  constructor(gameServer: GameServer, webSocket: WebSocket, ip: string) {
    this.gameServer = gameServer;
    this.webSocket = webSocket;
    this.ip = ip;

    this.create();
  }

  create(): void {
    Logger.info(`${this.ip} has connected`);
    this.gameServer.addPlayer(this);

    this.listenForPong();
    this.listenForClose();
    this.listenForMessage();
  }

  listenForPong(): void {
    this.webSocket.on('pong', () => {
      this.isAlive = true;
    });
  }

  listenForClose(): void {
    this.webSocket.on('close', (code, reason) => {
      Logger.info(`${this.ip} has disconnected - code: ${code} ${reason}`);
      this.gameServer.removePlayer(this);
    });
  }

  listenForMessage(): void {
    this.webSocket.on('message', (message) => {
        
    });
  }
}