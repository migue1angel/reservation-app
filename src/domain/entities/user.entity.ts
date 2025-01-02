import { CustomError } from "../errors/custom.error";

export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public role: string[],
    public img?: string
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, _id, name, email, password, role, img } = object;
    
    if (!_id && id) throw CustomError.badRequest("Id required");
    if (!name) throw CustomError.badRequest("Name required");
    if (!email) throw CustomError.badRequest("Email required");
    if (!password) throw CustomError.badRequest("Password required");
    if (!role) throw CustomError.badRequest("Role required");

    return new UserEntity(_id || id, name,email,password,role,img)
  }


  
}
