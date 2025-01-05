export class CreateServiceDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly duration: number,
    public readonly availability: CreateAvailabilityDto,
    public readonly pricePerPerson: number,
    public readonly maxCapacity: number,
    public readonly minCapacity: number,
    public readonly category: string
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
    } = object;

    if (!name) return ["Missing name"];
    if (!description) return ["Missing description"];
    if (!duration) return ["Missing duration"];
    if (!availability) return ["Missing availability"];
    if (availability.length === 0) return ["At least one availability is required"];
    if (!pricePerPerson) return ["Missing price per person"];
    if (!maxCapacity) return ["Missing max capacity"];
    if (!minCapacity) return ["Missing min capacity"];
    if (!category) return ["Missing category"];

    availability.forEach((availability: CreateAvailabilityDto) => {
      const [error, _] = CreateAvailabilityDto.create(availability);
      if (error) throw new Error (error);
    })

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
        category
      ),
    ];
  }
}

class CreateAvailabilityDto {
  constructor(
    public readonly day: string,
    public readonly slots: CreateTimeSlotDto[]
  ) {}
  static create(object: { 
    [key: string]: any;
  }): [string?, CreateAvailabilityDto?] {
    console.log(object);
    
    const { day, slots } = object;
    if (!day) return ["Missing day of availability"];
    if (!slots) return ["Missing slots of availability"];
    slots.forEach((slot:CreateTimeSlotDto) => {
      const [error, _] = CreateTimeSlotDto.create(slot);
      if (error) throw new Error(error); 
    })
    return [undefined, new CreateAvailabilityDto(day, slots)];
  }
}

class CreateTimeSlotDto {
  constructor(
    public readonly start_time: Date,
    public readonly end_time: Date
  ) {}
  static create(object: { [key: string]: any }): [string?, CreateTimeSlotDto?] {
    const { startTime, endTime } = object;
    if (!startTime) return ["Missing start time"];
    if (!endTime) return ["Missing end time"];
    return [undefined, new CreateTimeSlotDto(startTime, endTime)];
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
    public readonly category?: string
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
        category
      ),
    ];
  }
}

