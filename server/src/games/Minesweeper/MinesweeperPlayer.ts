import WebSocket from "ws";
import GameServer from "../../GameServer";
import Player from "../../Player";
import MinesweeperPacketHandler from "./MinesweeperPacketHandler";

export default class MinesweeperPlayer extends Player {
  public packetHandler: MinesweeperPacketHandler = new MinesweeperPacketHandler(this);

  constructor(gameServer: GameServer, webSocket: WebSocket, ip: string) {
    super(gameServer, webSocket, ip);
  }
}