export default class ClientPacketController {
  public static cast(packet: any): ClientPacket {
    const object = JSON.parse(packet);
    const objectLength = Object.keys(object).length;

    const interfaceLength = 2;

    if (objectLength != interfaceLength) throw `Object length is ${objectLength}, should be ${interfaceLength}`;
    if (typeof (object.row) != 'number') throw `row property is not a number`;
    if (typeof (object.column) != 'number') throw `column property is not a number`;

    return object as ClientPacket;
  }
}

interface ClientPacket {
  row: number;
  column: number;
}