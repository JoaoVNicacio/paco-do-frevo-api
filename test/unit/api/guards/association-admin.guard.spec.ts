import { Test, TestingModule } from '@nestjs/testing';
import { ConsoleLogger, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import IRequestWithUser from 'src/api/requests/iwith-user.request';
import AssociationAdminGuard from 'src/api/guards/association-admin.guard';
import EUserRoles from 'src/domain/aggregates/userAggregate/enums/euser-roles';
import IJwtPayload from 'src/shared/requestObjects/ijwt.payload';
import { Logger } from 'src/application/symbols/dependency-injection.symbols';

describe('AssociationAdminGuard', () => {
  let guard: AssociationAdminGuard;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssociationAdminGuard,
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

    guard = module.get<AssociationAdminGuard>(AssociationAdminGuard);
    jwtService = module.get<JwtService>(JwtService);
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

    it('should set user on request and return true if user is an admin', async () => {
      // Arrange:
      const mockPayload: IJwtPayload = {
        userRole: EUserRoles.ApplicationAdmin,
        sub: '',
        userName: '',
      };

      // Act:
      const getJwtPayloadSpy = jest
        .spyOn(jwtService, 'verifyAsync')
        .mockResolvedValue(mockPayload);

      const result = await guard.canActivate({
        switchToHttp: () => ({ getRequest: () => mockRequest }),
      } as any);

      // Assertions:
      expect(result).toBe(true);
      expect(mockRequest.user).toEqual(mockPayload);
      expect(getJwtPayloadSpy).toHaveBeenCalled();
    });

    it('should throw ForbiddenException if user is not an app or association admin', async () => {
      // Arrange:
      const mockPayload: IJwtPayload = {
        userRole: EUserRoles.DataVisualizer,
        sub: '',
        userName: '',
      };

      // Act:
      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(mockPayload);

      // Assertions:
      await expect(
        guard.canActivate({
          switchToHttp: () => ({ getRequest: () => mockRequest }),
        } as any),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('matchesRoleRules', () => {
    it('should throw ForbiddenException if user role is not ApplicationAdmin', () => {
      // Arrange:
      const guard = new AssociationAdminGuard(jwtService, new ConsoleLogger());
      const mockPayload: IJwtPayload = {
        userRole: EUserRoles.DataVisualizer,
        sub: '',
        userName: '',
      };

      // Assertions:
      expect(() => guard['matchesRoleRules'](mockPayload)).toThrow(
        ForbiddenException,
      );
    });

    it('should not throw error if user role is ApplicationAdmin', () => {
      const guard = new AssociationAdminGuard(jwtService, new ConsoleLogger());
      const mockPayload: IJwtPayload = {
        userRole: EUserRoles.ApplicationAdmin,
        sub: '',
        userName: '',
      };

      // Assertions:
      expect(() => guard['matchesRoleRules'](mockPayload)).not.toThrow();
    });

    it('should throw ForbiddenException if user role is not AssociationAdmin', () => {
      // Arrange:
      const guard = new AssociationAdminGuard(jwtService, new ConsoleLogger());
      const mockPayload: IJwtPayload = {
        userRole: EUserRoles.DataVisualizer,
        sub: '',
        userName: '',
      };

      // Assertions:
      expect(() => guard['matchesRoleRules'](mockPayload)).toThrow(
        ForbiddenException,
      );
    });

    it('should not throw error if user role is AssociationAdmin', () => {
      const guard = new AssociationAdminGuard(jwtService, new ConsoleLogger());
      const mockPayload: IJwtPayload = {
        userRole: EUserRoles.AssociationAdmin,
        sub: '',
        userName: '',
      };

      // Assertions:
      expect(() => guard['matchesRoleRules'](mockPayload)).not.toThrow();
    });
  });
});
