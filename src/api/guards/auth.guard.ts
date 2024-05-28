import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import IRequestWithUser from '../requests/iwith-user.request';
import GuardBase from '../../core/guards/base.guard';

@Injectable()
class AuthGuard extends GuardBase implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequestWithUser>();
    const token = this.getTokenFromHeader(request);

    request.user = await this.getJwtPayload(token);

    return true;
  }
}

export default AuthGuard;
