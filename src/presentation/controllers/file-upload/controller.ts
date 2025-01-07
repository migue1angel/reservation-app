import { Request, Response } from "express";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../../domain";
import { UploadFileService } from "../../services";
import { UploadedFile } from "express-fileupload";

export class UploadFileController {
  constructor(public readonly uploadFileService: UploadFileService) {}

  private readonly handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  uploadFile = (req: Request, res: Response) => {
    const type = req.params.type;
    const files = req.body.files[0];

    this.uploadFileService
      .uploadSingle(files, `uploads/${type}`)
      .then((file) => res.status(201).json(file))
      .catch((error) => this.handleError(error, res));
  };

  uploadMultiple = (req: Request, res: Response) => {
    const type = req.params.type;
    const files = req.body.files;

    this.uploadFileService
      .uploadMultiple(files, `uploads/${type}`)
      .then((file) => res.status(201).json(file))
      .catch((error) => this.handleError(error, res));
  };
}
