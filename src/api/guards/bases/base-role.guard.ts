import IJwtPayload from 'src/application/requestObjects/ijwt.payload';
import GuardBase from './base.guard';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
abstract class RoleGuardBase extends GuardBase {
  protected abstract readonly _allowedRoles: Array<string>;

  protected matchesRoleRules(payload: IJwtPayload): void {
    if (!this._allowedRoles.includes(payload.userRole)) {
      throw new ForbiddenException(
        'Sua conta não possui permissão para realizar esta ação.',
      );
    }
  }
}

export default RoleGuardBase;
