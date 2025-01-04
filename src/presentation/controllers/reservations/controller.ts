import { Request, Response } from "express";
import { CustomError } from "../../../domain";
import { ReservationsService } from "../../services";

export class ReservationsController {
  constructor(public readonly reservationsService: ReservationsService) {}

  private readonly handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  getReservations = (req: Request, res: Response) => {
    this.reservationsService
      .getReservations()
      .then((reservations) => res.json(reservations))
      .catch((error) => this.handleError(error, res));
  };
}
