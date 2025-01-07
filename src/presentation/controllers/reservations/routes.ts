import { Router } from "express";
import { ReservationsService } from "../../services";
import { ReservationsController } from "./controller";

export class ReservationsRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ReservationsController(new ReservationsService());

    router.get("/", controller.findAll);
    router.post("/", controller.create);

    return router;
  }
}
