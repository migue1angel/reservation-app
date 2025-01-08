import { ReservationModel } from "../../database";
import { CreateReservationDto, CustomError, PaginationDto } from "../../domain";

export class ReservationsService {
  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const reservations = await ReservationModel.find()
      .skip((page - 1) * limit)
      .limit(limit);
    return reservations;
  }

  async create(createReservationDto: CreateReservationDto) {
    try {
      const reservation = new ReservationModel(createReservationDto);
      return await reservation.save();
    } catch (error) {
      console.log(`${error}`);

      throw CustomError.internalServer(`${error}`);
    }
  }
}
