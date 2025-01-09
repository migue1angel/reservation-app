export class CreateServiceDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly duration: number,
    public readonly availability: CreateAvailabilityDto,
    public readonly pricePerPerson: number,
    public readonly maxCapacity: number,
    public readonly minCapacity: number,
    public readonly category: string,
    public readonly remainingReservations: number,
    public readonly requirements?: string[],
    public readonly unavailableDates?: Date[]
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateServiceDto?] {
    const {
      name,
      description,
      duration,
      availability,
      pricePerPerson,
      maxCapacity,
      minCapacity,
      category,
      remainingReservations,
      requirements,
      unavailableDates,
    } = object;

    if (!name) return ["Missing name"];
    if (!description) return ["Missing description"];
    if (!duration) return ["Missing duration"];
    if (!availability) return ["Missing availability"];
    if (availability.length === 0)
      return ["At least one availability is required"];
    if (!pricePerPerson) return ["Missing price per person"];
    if (!maxCapacity) return ["Missing max capacity"];
    if (!minCapacity) return ["Missing min capacity"];
    if (!category) return ["Missing category"];
    if (!remainingReservations) return ["Missing remaining reservations"];

    availability.forEach((availability: CreateAvailabilityDto) => {
      const [error, _] = CreateAvailabilityDto.create(availability);
      if (error) throw new Error(error);
    });

    return [
      undefined,
      new CreateServiceDto(
        name,
        description,
        duration,
        availability,
        pricePerPerson,
        maxCapacity,
        minCapacity,
        category,
        remainingReservations,
        requirements,
        unavailableDates
      ),
    ];
  }
}

class CreateAvailabilityDto {
  constructor(
    public readonly day: string,
    public readonly startTime: string,
    public readonly endTime: string
  ) {}
  static create(object: {
    [key: string]: any;
  }): [string?, CreateAvailabilityDto?] {
    const { day, startTime, endTime } = object;
    if (!day) return ["Missing day of availability"];
    if (!startTime) return ["Missing startTime of availability"];
    if (!endTime) return ["Missing endTime of availability"];

    return [undefined, new CreateAvailabilityDto(day, startTime, endTime)];
  }
}

export class UpdateServiceDto {
  constructor(
    public readonly name?: string,
    public readonly description?: string,
    public readonly duration?: number,
    public readonly availability?: CreateAvailabilityDto[],
    public readonly pricePerPerson?: number,
    public readonly maxCapacity?: number,
    public readonly minCapacity?: number,
    public readonly category?: string,
    public readonly unavailableDates?: Date[]
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateServiceDto?] {
    const {
      name,
      description,
      duration,
      availability,
      pricePerPerson,
      maxCapacity,
      minCapacity,
      category,
      unavailableDates,
    } = object;

    if (availability && availability.length > 0) {
      availability.forEach((availability: CreateAvailabilityDto) => {
        const [error, _] = CreateAvailabilityDto.create(availability);
        if (error) throw new Error(error);
      });
    }

    return [
      undefined,
      new UpdateServiceDto(
        name,
        description,
        duration,
        availability,
        pricePerPerson,
        maxCapacity,
        minCapacity,
        category,
        unavailableDates
      ),
    ];
  }
}
