import { envs } from "../../config";
import { CategoryModel } from "../mongo/models/category.model";
import { UserModel } from "../mongo/models/user.model";
import { MongoDatabase } from "../mongo/mongo-connection";
import { seedData } from "./data";

(async () => {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  await main();

  await MongoDatabase.disconnect();
})();

async function main() {
  await Promise.all([UserModel.deleteMany(), CategoryModel.deleteMany()]);

  const users = await UserModel.insertMany(seedData.users);

  const categories = await CategoryModel.insertMany(seedData.categories);
}
