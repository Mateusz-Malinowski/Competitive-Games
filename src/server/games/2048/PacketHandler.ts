import ServerPacketHandler from '../../ServerPacketHandler';
import ServerPacket from '../../../global/games/2048/packets/server/ServerPacket';
import Player from './Player';
import ClientPacketController from './ClientPacketController';
import Logger from '../../Logger';
import { ClientPacketType } from '../../../global/games/2048/packets/client/ClientPacketType';
import StartGamePacket from '../../../global/games/2048/packets/client/StartGamePacket';
import MoveTilesPacket from '../../../global/games/2048/packets/client/MoveTilesPacket';
import { PlayerState } from './PlayerState';
import Board from './Board';
import gameSettings from '../../../global/games/2048/gameSettings.json';

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
      case ClientPacketType.MoveTiles:
        return this.handleMoveTilesPacket(object as MoveTilesPacket);
    }
  }

  private handleStartGamePacket(packet: StartGamePacket): void {
    this.player.state = PlayerState.Playing;
    this.player.board = new Board(
      this.player, 
      gameSettings.numberOfRows, 
      gameSettings.numberOfColumns, 
      gameSettings.initialNumbers,
      gameSettings.firstNumbersCount
    );
    this.player.board.startGame();
  }

  private handleMoveTilesPacket(packet: MoveTilesPacket): void {

  }
}