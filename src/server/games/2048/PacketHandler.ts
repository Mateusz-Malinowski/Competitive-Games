import ServerPacketHandler from '../../ServerPacketHandler';
import ServerPacket from '../../../global/games/2048/packets/server/ServerPacket';
import Player from './Player';
import ClientPacketController from './ClientPacketController';
import Logger from '../../Logger';
import { ClientPacketType } from '../../../global/games/2048/packets/client/ClientPacketType';
import StartGamePacket from '../../../global/games/2048/packets/client/StartGamePacket';

export default class PacketHandler extends ServerPacketHandler {
  private player: Player;

  public constructor(player: Player) {
    super();

    this.player = player;
  }

  public sendPacket(packet: ServerPacket): void {
    this.player.webSocket.send(JSON.stringify(packet));
  }

  public handlePacket(packet: any): void {
    let object;

    try {
      object = ClientPacketController.cast(packet);
    } catch (e) {
      return Logger.error(`${e} from ${this.player.ip}`);
    }

    switch (object.type) {
      case ClientPacketType.StartGame:
        return this.handleStartGamePacket(object as StartGamePacket);
    }
  }

  private handleStartGamePacket(packet: StartGamePacket): void {
    
  }
}