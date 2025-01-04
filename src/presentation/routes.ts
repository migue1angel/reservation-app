import { Router } from "express";
import { AuthRoutes } from "./controllers/auth/routes";
import { UploadFileRoutes } from "./controllers/file-upload/routes";
import { ServicesRoutes } from "./controllers/services/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use("/auth", AuthRoutes.routes);
    router.use("/upload", UploadFileRoutes.routes);
    router.use("/services", ServicesRoutes.routes);
    return router;
  }
}
