import mongoose from "mongoose";
import { ConnectionOptions } from "../../domain/interfaces";

export class MongoDatabase {
  static async connect(options: ConnectionOptions) {
    const { mongoUrl, dbName } = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      });
      return true;
    } catch (error) {
      console.log("Mongo connection failed");

      throw error;
    }
  }

  static async disconnect() {
    await mongoose.disconnect();
  }
}
