/**
 * Clase que representa un error personalizado.
 * Permite crear errores con un mensaje y un código de estado HTTP.
 */
export class CustomError extends Error {
  /**
   * Constructor de la clase.
   * @param statusCode Código de estado HTTP.
   * @param message Mensaje del error.
   */
  constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message);
    // Llama al constructor de la clase padre (Error) y le pasa el mensaje.
    // De esta forma, el objeto CustomError tendrá una propiedad "message" con
    // el mensaje del error.
  }

  /**
   * Crea un error con un código de estado 400 (Bad Request).
   * @param message Mensaje del error.
   * @returns Un objeto CustomError con el código de estado 400.
   */
  static badRequest(message: string) {
    return new CustomError(400, message);
  }

  /**
   * Crea un error con un código de estado 401 (Unauthorized).
   * @param message Mensaje del error.
   * @returns Un objeto CustomError con el código de estado 401.
   */
  static unauthorized(message: string) {
    return new CustomError(401, message);
  }

  /**
   * Crea un error con un código de estado 403 (Forbidden).
   * @param message Mensaje del error.
   * @returns Un objeto CustomError con el código de estado 403.
   */
  static forbidden(message: string) {
    return new CustomError(403, message);
  }

  /**
   * Crea un error con un código de estado 404 (Not Found).
   * @param message Mensaje del error.
   * @returns Un objeto CustomError con el código de estado 404.
   */
  static notFound(message: string) {
    return new CustomError(404, message);
  }

  /**
   * Crea un error con un código de estado 500 (Internal Server Error).
   * @param message Mensaje del error. Por defecto es 'Internal Server Error'.
   * @returns Un objeto CustomError con el código de estado 500.
   */
  static internalServer(message: string = 'Internal Server Error') {
    return new CustomError(500, message);
  }
}

