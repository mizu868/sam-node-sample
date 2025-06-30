type LogLevel = "INFO" | "WARN" | "ERROR";
type HttpStatusCode = 400 | 500 | 503;

export class CommonError extends Error {
  constructor(
    readonly errorCode: string,
    readonly logLevel: LogLevel,
    readonly httpStatusCode: HttpStatusCode,
    readonly message: string
  ) {
    super();
  }
}
