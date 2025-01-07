import { Router } from "express";
import { ServicesController } from "./controller";
import { ServicesService } from "../../services";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

export class ServicesRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ServicesController(new ServicesService());

    router.get("/", controller.findAll);
    router.get("/:id", controller.findOne);
    // router.use(AuthMiddleware.validateJWT); todo: add auth when it's ready
    router.post("/", controller.create);
    router.patch("/:id", controller.update);
    router.patch("/status/:id", controller.changeStatus);
    router.delete("/:id", controller.delete);

    return router;
  }
}
