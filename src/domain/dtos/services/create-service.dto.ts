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
    if (!availability) return ["Missing available timetable"];
    if (!pricePerPerson) return ["Missing price per person"];
    if (!maxCapacity) return ["Missing max capacity"];
    if (!minCapacity) return ["Missing min capacity"];
    if (!category) return ["Missing category"];

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

class CreateAvailabilityDto {
  constructor(
    public readonly monday?: CreateTimeSlotDto[],
    public readonly tuesday?: CreateTimeSlotDto[],
    public readonly wednesday?: CreateTimeSlotDto[],
    public readonly thursday?: CreateTimeSlotDto[],
    public readonly friday?: CreateTimeSlotDto[],
    public readonly saturday?: CreateTimeSlotDto[],
    public readonly sunday?: CreateTimeSlotDto[]
  ) {}
  static create(object: {
    [key: string]: any;
  }): [string?, CreateAvailabilityDto?] {
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } =
      object;
    return [
      undefined,
      new CreateAvailabilityDto(
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday
      ),
    ];
  }
}
