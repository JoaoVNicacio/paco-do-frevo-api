import { Observable, tap } from 'rxjs';
import IRequestWithUser from '../requests/iwith-user.request';
import {
  CallHandler,
  ExecutionContext,
  LoggerService as ILogger,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'src/application/symbols/dependency-injection.symbols';

@Injectable()
class GlobalRouteAccessLoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(Logger)
    private readonly _logger: ILogger,
  ) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const httpContext = context.switchToHttp();

    const request = httpContext.getRequest<Request | IRequestWithUser>();
    const response = httpContext.getResponse<Response>();

    const { path, method } = request;
    const { statusCode } = response;
    const route = `${method} ${path}`;

    this._logger.log(
      `<📩🌐> ➤ Received request to: ${route} by ${
        'user' in request
          ? `the user with id: ${request.user.sub}`
          : 'a non authenticated user.'
      }`,
    );

    const preControllerInstant = Date.now();

    return next.handle().pipe(
      tap(() => {
        this._logger.log(
          `<📨⏳> ➤ Request to ${route} by ${
            'user' in request
              ? `the user with id: ${request.user.sub}`
              : 'a non authenticated user.'
          } returned the response: status ${statusCode} in ${
            Date.now() - preControllerInstant
          }ms`,
        );
      }),
    );
  }
}

export default GlobalRouteAccessLoggingInterceptor;
