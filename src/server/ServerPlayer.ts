import WebSocket from "ws";
import GameServer from "./GameServer";
import Logger from "./Logger";
import ServerPacketHandler from "./ServerPacketHandler";

export default abstract class ServerPlayer {
  private gameServer: GameServer;
  public webSocket: WebSocket;
  public ip: string;
  public isAlive: Boolean = true;
  public abstract packetHandler: ServerPacketHandler;

  constructor(gameServer: GameServer, webSocket: WebSocket, ip: string) {
    this.gameServer = gameServer;
    this.webSocket = webSocket;
    this.ip = ip;
  }

  create(): void {
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
      this.packetHandler.handlePacket(message);
    });
  }
}