import { Router } from "express";
import { ServicesController } from "./controller";
import { ServicesService } from "../../services";

export class ServicesRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ServicesController(new ServicesService());

    router.post("/", controller.createService); 
    router.get("/", controller.getServices); //todo: add pagination and filters by query
    router.get("/:id", controller.getService); 

    return router;
  }
}
