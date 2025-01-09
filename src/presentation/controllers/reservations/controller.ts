import { Request, Response } from "express";
import { CreateReservationDto } from "../../../domain/dtos/reservations/create-reservation.dto";
import { ReservationsService } from "../../services";
import { CustomError } from "../../../domain";

export class ReservationsController {
  constructor(public readonly reservationsService: ReservationsService) {}

   private readonly handleError = (error: unknown, res: Response) => {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
  
      console.log(`${error}`);
      return res.status(500).json({ error: "Internal Server Error" });
    };
    
  findAll = (req: Request, res: Response) => {};

  create = (req: Request, res: Response) => {
    const [error, createReservationDto] = CreateReservationDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.reservationsService
      .create(createReservationDto!)
      .then((reservation) => res.status(201).json(reservation))
      .catch((error) => this.handleError(error, res));
  };
}
