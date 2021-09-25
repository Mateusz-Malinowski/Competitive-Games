import FieldPacket from "../../../../../global/games/Minesweeper/packets/server/FieldPacket";
import GameOverPacket from "../../../../../global/games/Minesweeper/packets/server/GameOverPacket";
import GameWonPacket from "../../../../../global/games/Minesweeper/packets/server/GameWonPacket";
import ServerPacket from "../../../../../global/games/Minesweeper/packets/server/ServerPacket";
import ClientPacket from "../../../../../global/games/Minesweeper/packets/client/ClientPacket";
import { ServerPacketType } from "../../../../../global/games/Minesweeper/packets/server/ServerPacketType";

export default class WebSocketController {
  public static webSocket: WebSocket;
  public static handleFieldPacket: (packet: FieldPacket) => void;
  public static handleGameOverPacket: (packet: GameOverPacket) => void;
  public static handleGameWonPacket: (packet: GameWonPacket) => void;

  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      WebSocketController.webSocket = new WebSocket(`ws://localhost:3000/Minesweeper`);

      WebSocketController.webSocket.addEventListener('error', () => {
        reject();
      });

      WebSocketController.webSocket.addEventListener('open', () => {
        resolve();
      });
    });
  }

  public listenForMessages(): void {
    WebSocketController.webSocket.addEventListener("message", this.handlePacket);
  }

  private handlePacket = (event: MessageEvent): void => {
    const packet = JSON.parse(event.data) as ServerPacket;

    switch (packet.type) {
      case ServerPacketType.Field:
        return WebSocketController.handleFieldPacket(packet as FieldPacket);
      case ServerPacketType.GameOver:
        return WebSocketController.handleGameOverPacket(packet as GameOverPacket);
      case ServerPacketType.GameWon:
        return WebSocketController.handleGameWonPacket(packet as GameWonPacket);
    }
  }

  public static sendPacket(packet: ClientPacket): void {
    WebSocketController.webSocket.send(JSON.stringify(packet));
  };
}