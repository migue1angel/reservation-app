import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { UploadFileRoutes } from "./file-upload/routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        router.use("/auth", AuthRoutes.routes);
        router.use("/upload", UploadFileRoutes.routes);
        return router;
    }
}
