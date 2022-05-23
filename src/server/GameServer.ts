import WebSocket from 'ws';
import { removeElementFromArray } from '../global/utilities';
import Logger from './Logger';
import ServerPlayer from './ServerPlayer';
import MinesweeperPlayer from './games/Minesweeper/Player';
import Player2048 from './games/2048/Player';

export default class GameServer {
  private webSocketServer: WebSocket.Server;
  private players: ServerPlayer[] = [];
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
      if (typeof(ip) !== 'string') return;

      const url = req.url;
      if (typeof(url) !== 'string') return;

      const player = this.createPlayer(url, webSocket, ip);
      if (!player) return;

      Logger.info(`${ip} has connected - ${url.substring(1)}`);

      player.create();
      this.addPlayer(player);
    });
  }

  private createPlayer(url: string, webSocket: WebSocket, ip: string): ServerPlayer | undefined {
    switch(url) {
      case '/Minesweeper': return new MinesweeperPlayer(this, webSocket, ip);
      case '/2048': return new Player2048(this, webSocket, ip);
      default: return;
    }
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

  public addPlayer(player: ServerPlayer): void {
    this.players.push(player);
  }

  public removePlayer(player: ServerPlayer): void {
    removeElementFromArray(this.players, player);
  }

  public removeAllPlayers(): void {
    this.players = [];
  }
}