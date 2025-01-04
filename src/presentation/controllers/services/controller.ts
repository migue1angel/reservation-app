import { Request, Response } from "express";
import { CreateServiceDto, CustomError } from "../../../domain";
import { ServicesService } from "../../services";

export class ServicesController {
  constructor(public readonly servicesService: ServicesService) {}

  private readonly handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  createService = (req: Request, res: Response) => {
    const [error, createServiceDto] = CreateServiceDto.create(req.body);
    if (error) return res.status(400).json({ error });
    this.servicesService
      .createService(createServiceDto!)
      .then((service) => res.status(201).json(service))
      .catch((error) => this.handleError(error, res));
  };

  getServices = (req: Request, res: Response) => {
    this.servicesService
      .getServices()
      .then((services) => res.json(services))
      .catch((error) => this.handleError(error, res));
  };

  getService = (req: Request, res: Response) => {
    const id = req.params.id;
    this.servicesService
      .getService(id)
      .then((services) => res.json(services))
      .catch((error) => this.handleError(error, res));
  };
}
