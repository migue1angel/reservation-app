import { Router } from "express";
import { AuthRoutes } from "./controllers/auth/routes";
import { UploadFileRoutes } from "./controllers/file-upload/routes";
import { ReservationsRoutes } from "./controllers/reservations/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use("/auth", AuthRoutes.routes);
    router.use("/upload", UploadFileRoutes.routes);
    router.use("/reservations", ReservationsRoutes.routes);
    return router;
  }
}
