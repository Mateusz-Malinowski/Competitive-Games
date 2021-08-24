export default abstract class PacketHandler {
  public abstract handlePacket(message: any): void;
}