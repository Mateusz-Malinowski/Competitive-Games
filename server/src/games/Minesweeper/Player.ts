import WebSocket from "ws";
import GameServer from "../../GameServer";
import ServerPlayer from "../../ServerPlayer";
import Map from "./Map";
import PacketHandler from "./PacketHandler";

export default class Player extends ServerPlayer {
  public packetHandler: PacketHandler = new PacketHandler(this);
  public map: Map = new Map(15, 15, 30);

  constructor(gameServer: GameServer, webSocket: WebSocket, ip: string) {
    super(gameServer, webSocket, ip);
  }
}