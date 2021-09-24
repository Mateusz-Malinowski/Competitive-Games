import express from 'express';
import path from 'path';
import { Express } from 'express-serve-static-core';

class App {
  public express: Express;
  private staticDir: string = path.join(__dirname, '../client');

  constructor() {
    this.express = express();

    this.express.use(express.static(this.staticDir));
    this.mountRoutes();
  }

  private mountRoutes(): void {
    const router = express.Router();

    router.get('/', (req, res) => {
      res.sendFile(path.join(this.staticDir, 'main/index.html'));
    });

    this.express.use('/', router);

    this.express.use((req, res) => {
      res.status(404);
      res.sendFile(path.join(this.staticDir, '404/index.html'));
    });
  }
}

export default new App().express;