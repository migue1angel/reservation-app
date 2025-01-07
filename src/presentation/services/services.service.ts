import { ServiceModel } from "../../database";
import {
  CreateServiceDto,
  CustomError,
  PaginationDto,
  UpdateServiceDto,
} from "../../domain";
export class ServicesService {
  async findAll(
    paginationDto: PaginationDto,
    category?: string,
    name?: string
  ) {
    const { page, limit } = paginationDto;


    if (category) {
      const services = await ServiceModel.find({ category: category })
        .skip((page - 1) * limit)
        .limit(limit)

        .populate("category");
      return services;
    }

    if (name) {
      const services = await ServiceModel.find({
        name: { $regex: new RegExp(name, "i") },
      });
      return services;
    }

    const [total, services] = await Promise.all([
      ServiceModel.countDocuments(),
      ServiceModel.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("category"),
    ]);
    const totalPages = Math.ceil(total / limit);
    return {
      page,
      limit,
      total,
      totalPages,
      services,
    };
  }

  async findOne(id: string) {
    const service = await ServiceModel.findOne({
      _id: id,
    }).populate("category");
    return service;
  }

  async findOneByName(name: string) {
    const service = await ServiceModel.findOne({
      name,
    });
    return service;
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
  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const updatedService = await ServiceModel.findByIdAndUpdate(
      id,
      updateServiceDto,
      { new: true }
    );
    return updatedService;
  }

  async changeStatus(id: string) {
    let updatedService = await ServiceModel.findById(id);

    if (!updatedService) throw CustomError.notFound("Service not found");

    if (updatedService.status === "active") updatedService.status = "inactive";
    else updatedService.status = "active";

    await updatedService.save();
    return updatedService;
  }

  async delete(id: string) {
    const deletedService = await ServiceModel.findByIdAndDelete(id);
    return deletedService;
  }
}
