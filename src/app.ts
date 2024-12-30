import { envs } from "./config";
import { MongoDatabase } from "./database/mongo/mongo-connection";
import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  const server = new Server();

  server.start();
}
