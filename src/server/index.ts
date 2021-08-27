import app from './App';
import GameServer from './GameServer';
import WebSocket from 'ws';

const PORT = process.env.PORT || 3000;

const httpServer = app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);

  const webSocketServer = new WebSocket.Server({ server: httpServer });
  new GameServer(webSocketServer);
});
