import { Test, TestingModule } from '@nestjs/testing';
import { ConsoleLogger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import IRequestWithUser from 'src/api/requests/iwith-user.request';
import AuthGuard from 'src/api/guards/auth.guard';
import { Logger } from 'src/application/symbols/dependency-injection.symbols';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
        // Loggers:
        {
          provide: Logger,
          useClass: ConsoleLogger,
        },
      ],
    }).compile();

    jwtService = module.get<JwtService>(JwtService);
    guard = module.get<AuthGuard>(AuthGuard);
  });

  it('should be defined', () => {
    // Assertions:
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    let mockRequest: IRequestWithUser;
    const mockToken = 'mockToken';

    beforeEach(() => {
      mockRequest = {
        headers: { authorization: `Bearer ${mockToken}` },
      } as IRequestWithUser;
    });

    it('should throw UnauthorizedException if no token is provided', async () => {
      // Arrange:
      mockRequest.headers.authorization = undefined;

      // Assertions:
      await expect(
        guard.canActivate({
          switchToHttp: () => ({ getRequest: () => mockRequest }),
        } as any),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should set user on request when valid token is provided', async () => {
      // Arrange:
      const mockPayload = { id: 'mockId' };
      (jwtService.verifyAsync as jest.Mock).mockResolvedValue(mockPayload);

      // Act:
      await guard.canActivate({
        switchToHttp: () => ({ getRequest: () => mockRequest }),
      } as any);

      // Assertions:
      expect(mockRequest.user).toEqual(mockPayload);
    });

    it('should throw UnauthorizedException if invalid token is provided', async () => {
      // Arrange:
      const mockError = new Error('Invalid token');
      (jwtService.verifyAsync as jest.Mock).mockRejectedValue(mockError);

      // Assertions:
      await expect(
        guard.canActivate({
          switchToHttp: () => ({ getRequest: () => mockRequest }),
        } as any),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('getTokenFromHeader', () => {
    it('should return token from authorization header', () => {
      // Arrange:
      const mockRequest: any = {
        headers: { authorization: 'Bearer mockToken' },
      };

      // Assertions:
      expect(guard['getTokenFromHeader'](mockRequest)).toEqual('mockToken');
    });

    it('should return undefined if no authorization header is provided', () => {
      // Arrange:
      const mockRequest: any = { headers: {} };

      // Assertions:
      expect(guard['getTokenFromHeader'](mockRequest)).toBeUndefined();
    });

    it('should return undefined if authorization header does not start with "Bearer"', () => {
      // Arrange:
      const mockRequest: any = {
        headers: { authorization: 'Basic mockToken' },
      };

      // Assertions:
      expect(guard['getTokenFromHeader'](mockRequest)).toBeUndefined();
    });
  });
});
