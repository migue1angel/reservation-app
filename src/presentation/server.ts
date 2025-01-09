import express, { Router } from "express";
import fileUpload from "express-fileupload";
interface Options {
  port: number;
  routes: Router;
}
export class Server {
  private readonly app = express();
  private readonly routes: Router;
  private readonly port: number;

  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
      })
    );
    this.app.use(this.routes);
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
