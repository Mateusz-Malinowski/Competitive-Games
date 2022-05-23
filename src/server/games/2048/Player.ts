import WebSocket from "ws";
import GameServer from "../../GameServer";
import Logger from "../../Logger";
import ServerPlayer from "../../ServerPlayer";
import PacketHandler from "./PacketHandler";

export default class Player extends ServerPlayer {
  public packetHandler: PacketHandler = new PacketHandler(this);

  constructor(gameServer: GameServer, webSocket: WebSocket, ip: string) {
    super(gameServer, webSocket, ip);
  }
}