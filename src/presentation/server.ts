import express from "express";

export class Server {
  private readonly app = express();

  async start() {
    this.app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  }
}
