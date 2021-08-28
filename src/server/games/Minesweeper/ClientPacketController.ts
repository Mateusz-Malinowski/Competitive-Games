import ClientPacket from "../../../global/games/Minesweeper/packets/client/ClientPacket";
import { ClientPacketType } from "../../../global/games/Minesweeper/packets/client/ClientPacketType";

export default class ClientPacketController {
  public static cast(packet: any): ClientPacket {
    const object = JSON.parse(packet);

    if (typeof (object.type) !== 'number') throw `Packet type is not a number`;

    const objectPropertiesCount = Object.keys(object).length;

    // do checking here
    switch (object.type) {

      case ClientPacketType.StartGame: {
        const correctPropertiesCount = 2;

        if (objectPropertiesCount !== correctPropertiesCount) {
          throw `Object has ${objectPropertiesCount} properties instead of ${correctPropertiesCount}`;
        }

        if (typeof (object.gameModeIndex) !== 'number') throw `gameModeIndex property is not a number`;

        return object;
      }

      case ClientPacketType.Field: {
        const correctPropertiesCount = 3;

        if (objectPropertiesCount !== correctPropertiesCount) {
          throw `Object has ${objectPropertiesCount} properties instead of ${correctPropertiesCount}`;
        }

        if (typeof (object.row) !== 'number') throw `row property is not a number`;
        if (typeof (object.column) !== 'number') throw `column property is not a number`;

        return object;
      }

    }

    throw `Packet type ${object.type} checking is not defined`;
  }
}