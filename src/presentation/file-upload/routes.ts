import { Request, Router } from "express";
import { UploadFileController } from "./controller";
import { UploadFileService } from "../services";
import { FileUploadMiddleware } from "../middlewares/file-middleware";

export class UploadFileRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new UploadFileController(new UploadFileService());

    router.use(FileUploadMiddleware.containFiles);
    router.post("/single/:type", controller.uploadFile);
    // router.post("/register", controller.register);
    return router;
  }
}
