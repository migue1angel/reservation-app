import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserEntity } from "../../domain";
import { UserModel } from "../../database";

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");
    if (!authorization)
      return res.status(401).json({ error: "No token provided" });
    if (!authorization.startsWith("Bearer "))
      return res.status(401).json("Invalid Bearer token");

    const token = authorization.split(" ").at(1) ?? "";

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) return res.status(401).json({ error: "Invalid token" });
      const user = await UserModel.findById(payload.id);
      if (!user)
        return res.status(500).json({ error: "User does not exist anymore" });
      req.body.user = UserEntity.fromObject(user);
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json("Internal server error");
    }
  }
}
