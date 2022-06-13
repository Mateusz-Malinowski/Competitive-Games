import { ClientPacketType } from "../../../global/games/2048/packets/client/ClientPacketType";
import MoveTilesPacket from "../../../global/games/2048/packets/client/MoveTilesPacket";
import StartGamePacket from "../../../global/games/2048/packets/client/StartGamePacket";
import PacketValidationSchema from "../../../global/PacketValidationSchema";
import ServerPacketValidator from "../../ServerPacketValidator";

export default class PacketValidator extends ServerPacketValidator {
  protected getPacketValidationSchema(packet: object, type: number): PacketValidationSchema {
    switch (type) {
      case ClientPacketType.StartGame:
        return StartGamePacket.getValidationSchema();
      case ClientPacketType.MoveTiles:
        return MoveTilesPacket.getValidationSchema();
      default:
        throw "Unknown packet type";
    }
  }
}