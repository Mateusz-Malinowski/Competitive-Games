import express from 'express';
import path from 'path';
import { Express } from 'express-serve-static-core';

class App {
  public express: Express;

  constructor() {
    this.express = express();
    this.declareStaticDirs();
    this.mountRoutes();
  }

  private declareStaticDirs(): void {
    this.express.use(express.static(path.join(__dirname, '../../client/games/Minesweeper/dist')));
  }

  private mountRoutes(): void {
    const router = express.Router();

    router.get('/Minesweeper', (req, res) => {
      res.sendFile(path.join(__dirname, '../../client/games/Minesweeper/dist/index.html'));
    });

    this.express.use('/', router);
  }
}

export default new App().express;