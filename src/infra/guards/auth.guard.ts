import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import IJwtPayload from 'src/application/requestObjects/ijwt.payload';
import IRequestWithUser from '../requests/iwith-user.request';

@Injectable()
class AuthGuard implements CanActivate {
  constructor(private readonly _jwtService: JwtService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequestWithUser>();
    const token = this.getTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(
        'Acesso não permitido para requisições sem autentição.',
      );
    }

    try {
      const jwtPayload: IJwtPayload = await this._jwtService.verifyAsync(token);
      request.user = jwtPayload;
    } catch (error) {
      console.warn('Request invalid JWT.', `➤ ${error.name}: ${error.message}`);

      throw new UnauthorizedException('Token de acesso inválido.');
    }

    return true;
  }

  private getTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}

export default AuthGuard;
