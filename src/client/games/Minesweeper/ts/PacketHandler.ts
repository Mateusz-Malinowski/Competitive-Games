import Main from "./Main";
import ClientPacket from "../../../../global/games/Minesweeper/packets/client/ClientPacket";
import ServerPacket from "../../../../global/games/Minesweeper/packets/server/ServerPacket";
import FieldPacket from "../../../../global/games/Minesweeper/packets/server/FieldPacket";

export default class PacketHandler {
  private main: Main;
  private webSocket: WebSocket;

  constructor(main: Main, webSocket: WebSocket) {
    this.main = main;
    this.webSocket = webSocket;
  }

  public listenForMessages(): void {
    this.webSocket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data) as ServerPacket;

      this.main.map.handleFieldPacket(data as FieldPacket);
    });
  }

  public sendPacket(packet: ClientPacket): void {
    this.webSocket.send(JSON.stringify(packet));
  }
}