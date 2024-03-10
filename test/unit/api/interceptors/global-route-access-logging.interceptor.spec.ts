import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';
import GlobalRouteAccessLoggingInterceptor from 'src/api/interceptors/global-route-acess-logging.interceptor';
import { Logger } from 'src/application/symbols/dependency-injection.symbols';

describe('GlobalRouteAccessLoggingInterceptor', () => {
  let interceptor: GlobalRouteAccessLoggingInterceptor;
  let mockLoggerService: any;

  beforeEach(async () => {
    mockLoggerService = {
      log: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GlobalRouteAccessLoggingInterceptor,
        {
          provide: Logger,
          useValue: mockLoggerService,
        },
      ],
    }).compile();

    interceptor = module.get<GlobalRouteAccessLoggingInterceptor>(
      GlobalRouteAccessLoggingInterceptor,
    );
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  describe('intercept', () => {
    it('should log request and response with authenticated user', () => {
      const mockRequest: any = {
        method: 'GET',
        path: '/example',
        user: {
          sub: 'user123',
          userName: '',
          userRole: '',
        },
      };

      const mockResponse: any = {
        statusCode: 200,
      };

      const mockExecutionContext: Partial<ExecutionContext> = {
        switchToHttp: () => ({
          getRequest: () => mockRequest,
          getResponse: () => mockResponse,
          getNext: jest.fn(),
        }),
      };

      const mockCallHandler = {
        handle: () => of('response'),
      };

      jest.spyOn(Date, 'now').mockReturnValueOnce(0);

      interceptor.intercept(
        mockExecutionContext as ExecutionContext,
        mockCallHandler as any,
      );

      expect(mockLoggerService.log).toHaveBeenCalledWith(
        `<📩🌐> ➤ Received request to: GET /example by the user with id: user123`,
      );
    });

    it('should log request and response with non-authenticated user', () => {
      const mockRequest: any = {
        method: 'GET',
        path: '/example',
      };

      const mockResponse: any = {
        statusCode: 200,
      };

      const mockExecutionContext: Partial<ExecutionContext> = {
        switchToHttp: () => ({
          getRequest: () => mockRequest,
          getResponse: () => mockResponse,
          getNext: jest.fn(),
        }),
      };

      const mockCallHandler = {
        handle: () => of('response'),
      };

      jest.spyOn(Date, 'now').mockReturnValueOnce(0);

      interceptor.intercept(
        mockExecutionContext as ExecutionContext,
        mockCallHandler as any,
      );

      expect(mockLoggerService.log).toHaveBeenCalledWith(
        `<📩🌐> ➤ Received request to: GET /example by a non authenticated user.`,
      );
    });
  });
});
