import { ClientPacketType } from "../../../global/games/Minesweeper/packets/client/ClientPacketType";
import StartGamePacket from "../../../global/games/Minesweeper/packets/client/StartGamePacket";
import FieldPacket from "../../../global/games/Minesweeper/packets/client/FieldPacket";
import PacketValidationSchema from "../../../global/PacketValidationSchema";
import ServerPacketValidator from "../../ServerPacketValidator";
import PacketValidationError from "../../errors/PacketValidationError";

export default class PacketValidator extends ServerPacketValidator {
  protected getPacketValidationSchema(packet: object, type: number): PacketValidationSchema {
    switch (type) {
      case ClientPacketType.StartGame:
        return StartGamePacket.getValidationSchema();
      case ClientPacketType.Field:
        return FieldPacket.getValidationSchema();
      default:
        throw new PacketValidationError('Unknown packet type');
    }
  }
}