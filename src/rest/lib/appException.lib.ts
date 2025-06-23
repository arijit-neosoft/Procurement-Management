export class AppException extends Error {
  constructor(
    public message: string,
    public status_code: number,
    public data: object
  ) {
    super(message);
    this.status_code = status_code;
    this.message = message;
    this.data = data;
  }

  public name = 'AppException';

  public static exceptionHandler(error: unknown, message: string, status_code: number, data: object) {
    console.log('\n[Error]:', error, '\n');

    if (error instanceof AppException && error.name === 'AppException') {
      throw new AppException(error.message, error.status_code, error.data);
    }

    throw new AppException(message, status_code, data);
  }
}
