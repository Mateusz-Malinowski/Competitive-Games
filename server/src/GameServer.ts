import WebSocket from 'ws';
import { removeElementFromArray } from './utilities';
import Logger from './Logger';
import Player from './Player';

export default class GameServer {
  private webSocketServer: WebSocket.Server;
  private players: Player[] = [];
  private pingInterval: NodeJS.Timer;
  private pingIntervalTime: number = 10000;

  constructor(webSocketServer: WebSocket.Server) {
    this.webSocketServer = webSocketServer;

    this.start();
  }

  private start(): void {
    this.listenForConnections();
    this.setPingInterval();
    this.listenForClose();
  }

  private listenForConnections(): void {
    this.webSocketServer.on('connection', (webSocket, req) => {
      const ip = req.socket.remoteAddress;

      new Player(this, webSocket, ip);
    });
  }

  private listenForClose(): void {
    this.webSocketServer.on('close', () => {
      this.clearPingInterval();
      this.removeAllPlayers();
    });
  }

  private setPingInterval(): void {
    this.pingInterval = setInterval(this.ping, this.pingIntervalTime);
  }

  private clearPingInterval(): void {
    clearInterval(this.pingInterval);
  }

  private ping = () => {
    for (const player of this.players) {
      if (player.isAlive == false) {
        player.webSocket.terminate();
        return;
      }
  
      player.isAlive = false;
      player.webSocket.ping();
    }
  }

  public addPlayer(player: Player): void {
    this.players.push(player);
  }

  public removePlayer(player: Player): void {
    removeElementFromArray(this.players, player);
  }

  public removeAllPlayers(): void {
    this.players = [];
  }
}