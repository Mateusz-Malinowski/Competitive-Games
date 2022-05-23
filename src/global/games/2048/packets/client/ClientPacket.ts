import { ClientPacketType } from "./ClientPacketType";

export default abstract class ClientPacket {
  public abstract type: ClientPacketType;
}