import { Request, Response } from "express";
import { CreateReservationDto } from "../../../domain/dtos/reservations/create-reservation.dto";
import { ReservationsService } from "../../services";

export class ReservationsController {
  constructor(public readonly reservationsService: ReservationsService) {}

  findAll = (req: Request, res: Response) => {};

  create = (req: Request, res: Response) => {
    const [error, createReservationDto] = CreateReservationDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.reservationsService
      .create(createReservationDto!)
      .then((reservation) => res.status(201).json(reservation))
      .catch((error) => res.status(500).json({ error }));
  };
}
