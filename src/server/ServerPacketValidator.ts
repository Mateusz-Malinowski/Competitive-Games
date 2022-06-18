import PacketValidationSchema from "../global/PacketValidationSchema";
import PacketValidationError from "./errors/PacketValidationError";

export default abstract class ServerPacketValidator {
  public validateClientPacket(packet: any): object {
    const object = JSON.parse(packet);
    if (typeof(object.type) !== 'number') throw new PacketValidationError('Packet field "type" is not of type "number"');

    const schema = this.getPacketValidationSchema(object, object.type);
    this.validateBasedOnSchema(object, schema);
    return object;
  }

  protected abstract getPacketValidationSchema(packet: object, type: number): PacketValidationSchema;

  private validateBasedOnSchema(packet: object, schema: PacketValidationSchema): void {
    const entries = Object.entries(schema);

    for (const [field, constraint] of entries) {
      if (constraint.required && !(field in packet))
        throw new PacketValidationError(`Packet is missing required field "${field}"`);

      const packetWithField = packet as { [key: string]: any };

      if (typeof(packetWithField[field]) !== constraint.type)
        throw new PacketValidationError(`Packet field "${field}" is not of type "${constraint.type}"`);
    }
  }
}