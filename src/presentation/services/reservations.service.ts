import { ReseervationModel } from "../../database";
import { CreateReservationDto } from "../../domain";

export class ReservationsService {
  async findAll() {}

  async create(createReservationDto: CreateReservationDto) {
    const reservation = new ReseervationModel(createReservationDto);
    return await reservation.save();
  }
}
