import { ReservationModel, ServiceModel, UserModel } from "../../database";
import {
  CreateReservationDto,
  CustomError,
  PaginationDto,
  ServiceEntity,
} from "../../domain";

export class ReservationsService {
  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const reservations = await ReservationModel.find()
      .skip((page - 1) * limit)
      .limit(limit);
    return reservations;
  }

  async create(createReservationDto: CreateReservationDto) {
    const { user, service, date, slot, numberParticipants } =
      createReservationDto;
    const userExists = await UserModel.findById(user);
    if (!userExists) throw CustomError.notFound("User not found");

    const serviceExists = await ServiceModel.findById(service);
    if (!serviceExists) throw CustomError.notFound("Service not found");
    if (serviceExists.remainingReservations === 0)
      throw CustomError.badRequest("No available reservations");

    const serviceEntity = ServiceEntity.fromObject(serviceExists);
    const { day, startTime, endTime } = slot;
    const availableSlot = serviceEntity.availability.find((slot) => {
      return (
        slot.day === day &&
        slot.startTime === startTime &&
        slot.endTime === endTime
      );
    });
    if (!availableSlot) throw CustomError.badRequest("Slot not available");

    try {
      serviceExists.remainingReservations--;
      await serviceExists.save();
      const reservation = new ReservationModel(createReservationDto);
      return await reservation.save();
    } catch (error) {
      console.log(`${error}`);

      throw CustomError.internalServer(`${error}`);
    }
  }
}
