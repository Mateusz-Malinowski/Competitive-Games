export function connectToWebSocket(): Promise<WebSocket> {
  return new Promise((resolve, reject) => {
    const webSocket = new WebSocket('ws://localhost:3000/Minesweeper');

    webSocket.addEventListener('error', () => {
      reject();
    });

    webSocket.addEventListener('open', () => {
      resolve(webSocket);
    });
  });
}

export function sendPacket(): void {

}