import { ReservationModel } from "../../database/mongo/models/reservation.model";

export class ReservationsService {
  constructor() {}

  async getReservations() {
    const reservations = await ReservationModel.find();
    return reservations;
  }
}
