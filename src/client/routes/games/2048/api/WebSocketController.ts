import NewTilePacket from '../../../../../global/games/2048/packets/server/NewTilePacket';
import ClientPacket from '../../../../../global/games/2048/packets/client/ClientPacket';
import ServerPacket from '../../../../../global/games/2048/packets/server/ServerPacket';
import { ServerPacketType } from '../../../../../global/games/2048/packets/server/ServerPacketType';

export default class WebSocketController {
  private static webSocket: WebSocket;
  public static handleNewTilePacket: (packet: NewTilePacket) => void;

  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      WebSocketController.webSocket = new WebSocket(`ws://localhost:3000/2048`);

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

  public static sendPacket(packet: ClientPacket): void {
    WebSocketController.webSocket.send(JSON.stringify(packet));
  };

  private handlePacket = (event: MessageEvent): void => {
    const packet = JSON.parse(event.data) as ServerPacket;

    switch (packet.type) {
      case ServerPacketType.NewTile:
        return WebSocketController.handleNewTilePacket(packet as NewTilePacket);
    }
  }
}