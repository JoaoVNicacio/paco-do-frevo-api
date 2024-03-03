import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  LoggerService as ILogger,
} from '@nestjs/common';

/**
 * The GeneralExceptionsFilter class in TypeScript is a NestJS ExceptionFilter that handles exceptions
by returning appropriate responses based on the type of exception. */
@Catch()
class GeneralExceptionsFilter implements ExceptionFilter {
  constructor(private readonly _logger: ILogger) {}

  /**
   * Handles exceptions by returning appropriate responses based on the type of exception.
   * @param {any} exception - The error or exception that occurred during request execution.
   * @param {ArgumentsHost} host - The execution context of the current request.
   * @returns If not an HttpException, returns a JSON response with an internal server error message and
   * the exception details including the stack trace. If an HttpException, sets the response status and
   * body based on the exception's status and response.
   */
  public catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    if (!(exception instanceof HttpException)) {
      this._logger.error(exception.message, exception.stack, exception.name);

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Oops, houve um erro na operação. Por favor, relate ao suporte.`,
        error: { ...exception, stack: exception.stack },
      });

      return;
    }

    response.status(exception.getStatus()).json(exception.getResponse());
  }
}

export default GeneralExceptionsFilter;
