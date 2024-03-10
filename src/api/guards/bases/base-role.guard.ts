import IJwtPayload from 'src/application/requestObjects/ijwt.payload';
import GuardBase from './base.guard';
import { Injectable } from '@nestjs/common';

@Injectable()
abstract class RoleGuardBase extends GuardBase {
  protected abstract matchesRoleRules(payload: IJwtPayload): void;
}

export default RoleGuardBase;
