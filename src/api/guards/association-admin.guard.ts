import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import EUserRoles from 'src/domain/entities/userAggregate/enums/euser-roles';
import IRequestWithUser from '../requests/iwith-user.request';
import RoleGuardBase from './bases/base-role.guard';

@Injectable()
class AssociationAdminGuard extends RoleGuardBase implements CanActivate {
  protected override readonly _allowedRoles: Array<string> = [
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
}

export default AssociationAdminGuard;