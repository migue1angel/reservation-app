export class FindOptionsDto {
  private constructor(
    public readonly category?: string,
    public readonly name?: string
  ) {}

  static create(category?: string, name?: string): [string?, FindOptionsDto?] {
    return [undefined, new FindOptionsDto(category, name)];
  }
}
