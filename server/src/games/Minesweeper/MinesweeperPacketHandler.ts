import PacketHandler from "../../PacketHandler";
import MinesweeperPacket from "../../../../global/games/Minesweeper/MinesweeperPacket";
import MinesweeperPlayer from "./MinesweeperPlayer";

export default class MinesweeperPacketHandler extends PacketHandler {
  private player: MinesweeperPlayer;

  constructor(player: MinesweeperPlayer) {
    super();

    this.player = player;
  }

  public handlePacket(message: MinesweeperPacket): void {

  }
}