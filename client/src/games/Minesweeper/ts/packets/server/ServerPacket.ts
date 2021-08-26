import { ServerPacketType } from "./ServerPacketType";

export default abstract class ServerPacket {
  public abstract type: ServerPacketType;
}