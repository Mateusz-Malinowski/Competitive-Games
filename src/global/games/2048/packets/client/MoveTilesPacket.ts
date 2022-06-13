import ClientPacket from './ClientPacket';
import { ClientPacketType } from './ClientPacketType';
import { Direction } from '../../Direction';
import PacketValidationSchema from '../../../../PacketValidationSchema';

export default class MoveTilesPacket extends ClientPacket {
  public type: ClientPacketType = ClientPacketType.MoveTiles;
  public direction: Direction;

  public constructor(direction: Direction) {
    super();

    this.direction = direction;
  }

  public static getValidationSchema(): PacketValidationSchema {
    return {
      type: { required: true, type: 'number' },
      direction: { required: true, type: 'number' }
    }
  }
}