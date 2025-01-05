import { ServiceModel } from "../../database";
import { CreateServiceDto, CustomError, UpdateServiceDto } from "../../domain";
export class ServicesService {
  constructor() {}

  async findAll() {
    const reservations = await ServiceModel.find();
    return reservations;
  }

  async findOne(id: string) {
    const reservation = await ServiceModel.findOne({
      _id: id,
    }).populate("category");
    return reservation;
  }

  async findOneByName(name: string) {
    const reservation = await ServiceModel.findOne({
      name,
    });
    return reservation;
  }

  async create(createServiceDto: CreateServiceDto) {
    const serviceExists = await this.findOneByName(createServiceDto.name);
    if (serviceExists) throw new Error("Service already exists");

    try {
      const service = new ServiceModel(createServiceDto);

      return await service.save();
    } catch (err) {
      throw CustomError.internalServer(`${err}`);
    }
  }
// todo:update
  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const updatedService = await this.findOne(id);
    if (!updatedService) throw new Error("Service not found");
    if (updatedService.availability.length > 0 && updateServiceDto.availability) {
      // updatedService.availability = updateServiceDto.availability;
    }
    return updatedService;
  }
}
