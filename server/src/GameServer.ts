import WebSocket from 'ws';
import { Server as HttpServer } from 'http';

export default class GameServer {
  private httpServer: HttpServer;

  constructor(httpServer: HttpServer) {
    this.httpServer = httpServer;
  }
}