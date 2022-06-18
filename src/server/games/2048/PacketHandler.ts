import ServerPacketHandler from '../../ServerPacketHandler';
import ServerPacket from '../../../global/games/2048/packets/server/ServerPacket';
import Player from './Player';
import PacketValidator from './PacketValidator';
import Logger from '../../Logger';
import { ClientPacketType } from '../../../global/games/2048/packets/client/ClientPacketType';
import StartGamePacket from '../../../global/games/2048/packets/client/StartGamePacket';
import MoveTilesPacket from '../../../global/games/2048/packets/client/MoveTilesPacket';
import { PlayerState } from './PlayerState';
import Board from './Board';
import gameSettings from '../../../global/games/2048/gameSettings.json';
import ClientPacket from '../../../global/games/2048/packets/client/ClientPacket';
import { Direction } from '../../../global/games/2048/Direction';

export default class PacketHandler extends ServerPacketHandler {
  private packetValidator: PacketValidator = new PacketValidator();
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
      object = this.packetValidator.validateClientPacket(packet) as ClientPacket;
    } catch (e) {
      return Logger.error(`${this.player.ip} ${e}`);
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
      gameSettings.firstNumbersCount,
      gameSettings.winThreshold
    );
    this.player.board.startGame();
  }

  private handleMoveTilesPacket(packet: MoveTilesPacket): void {
    if (this.player.state !== PlayerState.Playing) return;
    if (!(packet.direction in Direction)) return;

    this.player.board.handleMoveRequest(packet.direction);
  }
}