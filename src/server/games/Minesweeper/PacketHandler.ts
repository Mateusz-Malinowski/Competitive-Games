import Logger from "../../Logger";
import ServerPacketHandler from "../../ServerPacketHandler";
import ClientPacketController from "./ClientPacketController";
import { ClientPacketType } from "../../../global/games/Minesweeper/packets/client/ClientPacketType";
import FieldPacket from "../../../global/games/Minesweeper/packets/client/FieldPacket";
import ServerPacket from "../../../global/games/Minesweeper/packets/server/ServerPacket";
import Player from "./Player";
import { PlayerState } from "./PlayerState";
import Map from "./Map";

export default class PacketHandler extends ServerPacketHandler {
  private player: Player;

  constructor(player: Player) {
    super();

    this.player = player;
  }

  public sendPacket(packet: ServerPacket): void {
    this.player.webSocket.send(JSON.stringify(packet));
  }

  public handlePacket(packet: any): void {
    let object;

    try {
      object = ClientPacketController.cast(packet);
    } catch (e) {
      return Logger.error(`${e} from ${this.player.ip}`);
    }

    switch (object.type) {
      case ClientPacketType.Field:
        return this.handleFieldPacket(object as FieldPacket);
    }
  }

  private handleFieldPacket(packet: FieldPacket): void {
    if (this.player.state == PlayerState.Waiting) {
      this.player.state = PlayerState.Playing;
      this.player.map = new Map(this.player, 15, 15, 10);
      this.player.map.startGame(packet.row, packet.column);
      return;
    }

    this.player.map.handleInput(packet.row, packet.column);
  }
}