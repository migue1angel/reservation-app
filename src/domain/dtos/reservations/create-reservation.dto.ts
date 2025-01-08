interface SlotDto {
  day: string;
  startTime: string;
  endTime: string;
}
export class CreateReservationDto {
  constructor(
    public readonly service: string,
    public readonly date: Date,
    public readonly slot: SlotDto,
    public readonly user: string,
    public readonly numberParticipants: number
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, CreateReservationDto?] {
    const { service, date, slot, user, numberParticipants } = object;
    if (!service) return ["Missing service"];
    if (!date) return ["Missing date"];
    if (!slot) return ["Missing slot"];
    if (!user) return ["Missing user"];
    if (!numberParticipants) return ["Missing number of participants"];
    const [error, slotDto] = CreateSlotDto.create(slot);
    if (error) return [error];

    return [
      undefined,
      new CreateReservationDto(service, date, slot, user, numberParticipants),
    ];
  }
}

class CreateSlotDto {
  constructor(
    public day: string,
    public startTime: string,
    public endTime: string
  ) {}
  static create(object: { [key: string]: any }): [string?, CreateSlotDto?] {
    const { day, startTime, endTime } = object;
    if (!day) return ["Missing day for slot"];
    if (!startTime) return ["Missing start time for slot"];
    if (!endTime) return ["Missing end time for slot"];
    return [undefined, new CreateSlotDto(day, startTime, endTime)];
  }
}
