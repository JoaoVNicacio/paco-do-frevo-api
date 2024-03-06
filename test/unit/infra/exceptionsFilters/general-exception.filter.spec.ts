import {
  ArgumentsHost,
  ContextType,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { RpcArgumentsHost, WsArgumentsHost } from '@nestjs/common/interfaces';
import GeneralExceptionsFilter from 'src/infra/exceptionsFilters/general-exception.filter';

describe('GeneralExceptionsFilter', () => {
  let filter: GeneralExceptionsFilter;
  const logger = new Logger();

  beforeEach(() => {
    filter = new GeneralExceptionsFilter(logger);
  });

  it('should catch non-HttpException and return internal server error', () => {
    // Arrange:
    const responseMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const hostMock: ArgumentsHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: () => responseMock,
      }),
      getArgs: jest.fn(),
      getArgByIndex: jest.fn(),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn(),
      getType: jest.fn(),
    };

    const exceptionMock = new Error();
    exceptionMock.message = 'Mock message';
    exceptionMock.stack = 'Mock stacktrace';
    exceptionMock.name = 'Mock name';

    // Act:
    filter.catch(exceptionMock, hostMock);

    // Assertions:
    expect(responseMock.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    expect(responseMock.json).toHaveBeenCalledWith({
      message: 'Oops, houve um erro na operação. Por favor, relate ao suporte.',
      error: {
        name: 'Mock name',
        message: 'Mock message',
        stack: 'Mock stacktrace',
      },
    });
  });

  it('should catch HttpException and return response from exception', () => {
    // Arrange:
    const responseMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const hostMock: ArgumentsHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: () => responseMock,
      }),
      getArgs: function <T extends any[] = any[]>(): T {
        throw new Error('Function not implemented.');
      },
      getArgByIndex: function <T = any>(): T {
        throw new Error('Function not implemented.');
      },
      switchToRpc: function (): RpcArgumentsHost {
        throw new Error('Function not implemented.');
      },
      switchToWs: function (): WsArgumentsHost {
        throw new Error('Function not implemented.');
      },
      getType: function <TContext extends string = ContextType>(): TContext {
        throw new Error('Function not implemented.');
      },
    };

    const exceptionMock = new HttpException(
      'Mocked Response',
      HttpStatus.BAD_REQUEST,
    );

    // Act:
    filter.catch(exceptionMock, hostMock);

    // Assertions:
    expect(responseMock.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(responseMock.json).toHaveBeenCalledWith('Mocked Response');
  });
});
