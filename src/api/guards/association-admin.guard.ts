import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import IJwtPayload from 'src/application/requestObjects/ijwt.payload';
import EUserRoles from 'src/domain/entities/userAggregate/enums/euser-roles';
import IRequestWithUser from '../requests/iwith-user.request';
import RoleGuardBase from './bases/base-role.guard';

@Injectable()
class AssociationAdminGuard extends RoleGuardBase implements CanActivate {
  private readonly _allowedRoles: Array<string> = [
    EUserRoles.ApplicationAdmin,
    EUserRoles.AssociationAdmin,
  ];

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequestWithUser>();
    const token = this.getTokenFromHeader(request);

    request.user = await this.getJwtPayload(token);

    this.matchesRoleRules(request.user);

    return true;
  }

  protected override matchesRoleRules(payload: IJwtPayload): void {
    if (!this._allowedRoles.includes(payload.userRole)) {
      throw new ForbiddenException(
        'Sua conta não possui permissão para realizar esta ação.',
      );
    }
  }
}

export default AssociationAdminGuard;
