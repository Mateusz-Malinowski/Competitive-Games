export default abstract class ServerPacketHandler {
  public abstract handlePacket(packet: any): void;
}
