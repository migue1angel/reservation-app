import { CustomError } from "../errors/custom.error";

export class ServiceEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly category: string,
    public readonly availability: AvailabilityEntity[],
    public readonly status: string
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, name, category, availability, status } =
      object;
    if (!id) throw CustomError.badRequest("Missing id");
    if (!name) throw CustomError.badRequest("Missing name");
    if (!category) throw CustomError.badRequest("Missing category");
    if (!availability) throw CustomError.badRequest("Missing availability");
    if (!status) throw CustomError.badRequest("Missing status");
    return new ServiceEntity(
      id,
      name,
      category,
      availability,
      status
    );
  }
}

class AvailabilityEntity {
  constructor(
    public readonly day: string,
    public readonly startTime: string,
    public readonly endTime: string
  ) {}
}
