export class CreateReservationDto {
  constructor(
    public readonly service: string,
    public readonly date: Date,
    public readonly user: string,
    public readonly numberParticipants: number
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, CreateReservationDto?] {
    const { service, date, user, numberParticipants } = object;
    if (!service) return ["Missing service"];
    if (!date) return ["Missing date"];
    if (!user) return ["Missing user"];
    if (!numberParticipants) return ["Missing number of participants"];
    return [
      undefined,
      new CreateReservationDto(service, date, user, numberParticipants),
    ];
  }
}
