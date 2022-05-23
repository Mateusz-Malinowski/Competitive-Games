import ClientPacket from "./ClientPacket";
import { ClientPacketType } from "./ClientPacketType";

export default class StartGamePacket extends ClientPacket {
  public type: ClientPacketType = ClientPacketType.StartGame;
}