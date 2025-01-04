import { Router } from "express";
import { ReservationsController } from "./controller";
import { ReservationsService } from "../../services";

export class ReservationsRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ReservationsController(new ReservationsService());

    router.get("/", controller.getReservations);//todo: add pagination and filters by query

    return router;
  }
}
