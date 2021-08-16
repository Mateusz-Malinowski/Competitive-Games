import app from './App';
import GameServer from './GameServer';

const PORT = process.env.PORT || 3000;

const httpServer = app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});

const gameServer = new GameServer(httpServer);