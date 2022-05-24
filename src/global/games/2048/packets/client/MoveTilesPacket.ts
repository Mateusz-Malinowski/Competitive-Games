import ClientPacket from './ClientPacket';
import { ClientPacketType } from './ClientPacketType';
import { Direction } from '../../Direction';

export default class MoveTilesPacket extends ClientPacket {
  public type: ClientPacketType = ClientPacketType.MoveTiles;
  public direction: Direction;

  public constructor(direction: Direction) {
    super();

    this.direction = direction;
  }
}