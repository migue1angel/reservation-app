export class CreateServiceDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly duration: number,
    public readonly available_timetable: Date[],
    public readonly price: number,
    public readonly capacity: number,
    public readonly category: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateServiceDto?] {
    const {
      name,
      description,
      duration,
      available_timetable,
      price,
      capacity,
      category,
    } = object;

    if (!name) return ["Missing name"];
    if (!description) return ["Missing description"];
    if (!duration) return ["Missing duration"];
    if (!available_timetable) return ["Missing available timetable"];
    if (!price) return ["Missing price"];
    if (!capacity) return ["Missing capacity"];
    if (!category) return ["Missing category"];

    return [
      undefined,
      new CreateServiceDto(
        name,
        description,
        duration,
        available_timetable,
        price,
        capacity,
        category
      ),
    ];
  }
}
