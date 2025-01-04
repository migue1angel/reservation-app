import { regularExps } from "../../../config";

export class RegisterUserDto {
  constructor(
    public readonly name: string,
    public readonly password: string,
    public readonly email: string,
    public readonly role?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { password, email, name, role } = object;
    if (!name) return ["Missing name"];
    if (!email) return ["Missing email"];
    if (!regularExps.email.test(email)) return ["Email not valid"];
    if (!password) return ["Missing password"];
    if (password.length < 4) return ["Password too weak"];

    return [undefined, new RegisterUserDto(name, password, email, role)];
  }
}
