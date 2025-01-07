import { UploadedFile } from "express-fileupload";
import path from "path";
import fs from "fs";
import { CustomError } from "../../domain";
import { UuidAdapter } from "../../config/uuid.adapter";

export class UploadFileService {
  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }

  async uploadSingle(
    file: UploadedFile,
    folder: string = "uploads",
    validExtensions: string[] = ["png", "jpg", "jpeg"]
  ) {
    try {
      const fileExtension = file.mimetype.split("/").at(1) ?? "";

      if (!validExtensions.includes(fileExtension)) {
        throw CustomError.badRequest("Invalid file extension");
      }
      const destination = path.resolve(__dirname, "../../../", folder);

      this.checkFolder(destination);
      const filename = `${UuidAdapter.generate()}.${fileExtension}`;

      file.mv(`${destination}/${filename}`);
      return { filename };
    } catch (error) {
      console.log(error);
    }
  }

  async uploadMultiple(
    files: UploadedFile[],
    folder: string = "uploads",
    validExtensions: string[] = ["png", "jpg", "jpeg", "pdf"]
  ) {
    const fileNames = await Promise.all(
      files.map((file) => {
        return this.uploadSingle(file, folder, validExtensions);
      })
    );

    return fileNames;
  }
}
