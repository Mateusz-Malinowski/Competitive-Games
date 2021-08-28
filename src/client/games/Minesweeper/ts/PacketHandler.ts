import Main from "./Main";
import Results from "./Results";
import ClientPacket from "../../../../global/games/Minesweeper/packets/client/ClientPacket";
import ServerPacket from "../../../../global/games/Minesweeper/packets/server/ServerPacket";
import FieldPacket from "../../../../global/games/Minesweeper/packets/server/FieldPacket";
import GameOverPacket from "../../../../global/games/Minesweeper/packets/server/GameOverPacket";
import GameWonPacket from "../../../../global/games/Minesweeper/packets/server/GameWonPacket";
import { ServerPacketType } from "../../../../global/games/Minesweeper/packets/server/ServerPacketType";

export default class PacketHandler {
  private main: Main;
  private webSocket: WebSocket;

  constructor(main: Main, webSocket: WebSocket) {
    this.main = main;
    this.webSocket = webSocket;
  }

  public listenForMessages(): void {
    this.webSocket.addEventListener('message', (event) => {
      this.handlePacket(event.data);
    });
  }

  public sendPacket(packet: ClientPacket): void {
    this.webSocket.send(JSON.stringify(packet));
  }

  private handlePacket(packet: any): void {
    const object = JSON.parse(packet) as ServerPacket;

    switch (object.type) {
      case ServerPacketType.Field:
        return this.handleFieldPacket(object as FieldPacket);
      case ServerPacketType.GameOver:
        return this.handleGameOverPacket(object as GameOverPacket);
      case ServerPacketType.GameWon:
        return this.handleGameWonPacket(object as GameWonPacket);
    }
  }

  private handleFieldPacket(packet: FieldPacket): void {
    if (!this.main.map.timer.isTicking) this.main.map.timer.start();

    this.main.map.revealFieldFromPacket(packet);
  }

  private handleGameOverPacket(packet: GameOverPacket): void {
    this.main.map.timer.stop();
    const displayDelay = 2500;
    const results = new Results(this.main.gameModes, packet.time);

    setTimeout(() => {
      results.display(false);
    }, displayDelay);
  }

  private handleGameWonPacket(packet: GameWonPacket): void {
    this.main.map.timer.stop();
    const displayDelay = 2500;
    const results = new Results(this.main.gameModes, packet.time);

    setTimeout(() => {
      results.display(true);
    }, displayDelay);
  }
}