import WebSocket from "ws";
import GameServer from "../../GameServer";
import Logger from "../../Logger";
import ServerPlayer from "../../ServerPlayer";
import { PlayerState } from "./PlayerState";
import PacketHandler from "./PacketHandler";
import Board from './Board';

export default class Player extends ServerPlayer {
  public packetHandler: PacketHandler = new PacketHandler(this);
  public state: PlayerState;
  public board: Board;

  constructor(gameServer: GameServer, webSocket: WebSocket, ip: string) {
    super(gameServer, webSocket, ip);
  }
}