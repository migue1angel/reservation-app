import { Router } from "express";
import { ServicesController } from "./controller";
import { ServicesService } from "../../services";

export class ServicesRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ServicesController(new ServicesService());

    router.post("/", controller.create);
    router.get("/", controller.findAll); //todo: add pagination and filters by query
    router.get("/:id", controller.findOne);
    router.patch("/:id", controller.update);

    return router;
  }
}
