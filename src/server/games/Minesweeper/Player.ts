import WebSocket from "ws";
import GameServer from "../../GameServer";
import ServerPlayer from "../../ServerPlayer";
import Map from "./Map";
import PacketHandler from "./PacketHandler";
import { PlayerState } from "./PlayerState";

export default class Player extends ServerPlayer {
  public packetHandler: PacketHandler = new PacketHandler(this);
  public map: Map;
  public state: PlayerState = PlayerState.Waiting;

  constructor(gameServer: GameServer, webSocket: WebSocket, ip: string) {
    super(gameServer, webSocket, ip);
  }
}