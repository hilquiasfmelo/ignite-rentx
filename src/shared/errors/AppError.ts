class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  // Status Code 400 => Bad Request
  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export { AppError };
