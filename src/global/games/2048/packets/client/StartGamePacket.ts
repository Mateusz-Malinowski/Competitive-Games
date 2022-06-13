import PacketValidationSchema from "../../../../PacketValidationSchema";
import ClientPacket from "./ClientPacket";
import { ClientPacketType } from "./ClientPacketType";

export default class StartGamePacket extends ClientPacket {
  public type: ClientPacketType = ClientPacketType.StartGame;

  public static getValidationSchema(): PacketValidationSchema {
    return {
      type: { required: true, type: 'number' },
    }
  }
}