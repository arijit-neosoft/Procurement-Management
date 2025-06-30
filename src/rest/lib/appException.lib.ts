export class AppException extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public data: object
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  public name = 'AppException';

  public static exceptionHandler(error: unknown, message: string, status_code: number, data: object) {
    if (error instanceof AppException && error.name === 'AppException') {
      throw new AppException(error.message, error.statusCode, error.data);
    }

    throw new AppException(message, status_code, data);
  }
}
