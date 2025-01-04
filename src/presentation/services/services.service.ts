import { ServiceModel } from "../../database";
import { CreateServiceDto, CustomError } from "../../domain";

export class ServicesService {
  constructor() {}

  async getServices() {
    const reservations = await ServiceModel.find();
    return reservations;
  }

  async getService(id: string) {
    console.log(id);

    const reservation = await ServiceModel.findOne({
      id,
    });
    return reservation;
  }

  async createService(createServiceDto: CreateServiceDto) {
    const serviceExists = await this.getService(createServiceDto.name);
    if (serviceExists) throw new Error("Service already exists");
    try {
      const service = new ServiceModel(createServiceDto);
      return await service.save();
    } catch (err) {
      throw CustomError.internalServer(`${err}`);
    }
  }
}
