import ClientPacket from "../../../global/games/2048/packets/client/ClientPacket";
import { ClientPacketType } from "../../../global/games/2048/packets/client/ClientPacketType";

export default class ClientPacketController {
  public static cast(packet: any): ClientPacket {
    const object = JSON.parse(packet);

    if (typeof(object.type) !== 'number') throw `Packet type is not a number`;

    const objectPropertiesCount = Object.keys(object).length;

    // do checking here
    switch (object.type) {

      case ClientPacketType.StartGame: {
        const correctPropertiesCount = 1;

        if (objectPropertiesCount !== correctPropertiesCount) {
          throw `Object has ${objectPropertiesCount} properties instead of ${correctPropertiesCount}`;
        }

        return object;
      }
    }

    throw `Packet type ${object.type} is not defined`;
  }
}