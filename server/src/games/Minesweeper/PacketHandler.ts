import Logger from "../../Logger";
import ServerPacketHandler from "../../ServerPacketHandler";
import ClientPacketController from "./ClientPacketController";
import Player from "./Player";

export default class PacketHandler extends ServerPacketHandler {
  private player: Player;

  constructor(player: Player) {
    super();

    this.player = player;
  }

  public handlePacket(packet: any): void {
    try {
      const data = ClientPacketController.cast(packet);
    } catch (e) {
      Logger.error(`${e} from ${this.player}`);
    }
  }
}