import Logger from "../../Logger";
import ServerPacketHandler from "../../ServerPacketHandler";
import ClientPacketController from "./ClientPacketController";
import ClientPacket from "../../../global/games/Minesweeper/packets/client/ClientPacket";
import { ClientPacketType } from "../../../global/games/Minesweeper/packets/client/ClientPacketType";
import FieldPacket from "../../../global/games/Minesweeper/packets/client/FieldPacket";
import ServerPacket from "../../../global/games/Minesweeper/packets/server/ServerPacket";
import Player from "./Player";
import { PlayerState } from "./PlayerState";

export default class PacketHandler extends ServerPacketHandler {
  private player: Player;

  constructor(player: Player) {
    super();

    this.player = player;
  }

  public handlePacket(packet: ClientPacket): void {
    try {
      const object = ClientPacketController.cast(packet);

      switch (object.type) {
        case ClientPacketType.Field:
          return this.handleFieldPacket(object as FieldPacket);
      }
    } catch (e) {
      Logger.error(`${e} from ${this.player}`);
    }
  }

  public sendPacket(packet: ServerPacket): void {
    this.player.webSocket.send(JSON.stringify(packet));
  }

  private handleFieldPacket(packet: FieldPacket): void {
    if (this.player.state == PlayerState.Waiting) {
      this.player.state = PlayerState.Playing;
      this.player.map.startGame(packet.row, packet.column);
      return;
    }

    this.player.map.handleInput(packet.row, packet.column);
  }
}