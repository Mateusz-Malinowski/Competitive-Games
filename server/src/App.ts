import express from 'express';
import path from 'path';
import { Express } from 'express-serve-static-core';

class App {
  public express: Express;
  private clientDistPath: string;

  constructor() {
    this.express = express();
    this.clientDistPath = path.join(__dirname, '../../client/dist');

    this.declareStaticDirs();
    this.mountRoutes();
  }

  private declareStaticDirs(): void {
    this.express.use(express.static(this.clientDistPath));
  }

  private mountRoutes(): void {
    const router = express.Router();

    router.get('/', (req, res) => {
      res.sendFile(path.join(this.clientDistPath, 'main/index.html'));
    });

    router.get('/Minesweeper', (req, res) => {
      res.sendFile(path.join(this.clientDistPath, 'games/Minesweeper/index.html'));
    });

    this.express.use('/', router);
  }
}

export default new App().express;