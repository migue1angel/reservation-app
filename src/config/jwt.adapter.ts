import jwt from "jsonwebtoken";
import { envs } from "./envs";

const jwtSeed = envs.JWT_SEED;

export class JwtAdapter {
  static async generateToken(payload: {}, duration: string = "1h") {
    return new Promise((resolve) => {
      jwt.sign(payload, jwtSeed, { expiresIn: duration }, (err, token) => {
        if (err) resolve(null);
        resolve(token);
      });
    });
  }

  static validateToken<T>(token:string):Promise<T| null> {
    return new Promise((resolve) => {
      jwt.verify(token, jwtSeed, (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded as T);
      });
    });
  }
}
