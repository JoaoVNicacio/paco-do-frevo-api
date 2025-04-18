import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import IJwtPayload from 'src/shared/requestObjects/ijwt.payload';
import { LoggerService as ILogger } from '@nestjs/common';
import { Logger } from 'src/application/symbols/dependency-injection.symbols';

@Injectable()
class GuardBase {
  constructor(
    private readonly _jwtService: JwtService,
    @Inject(Logger)
    private readonly _logger: ILogger,
  ) {}

  protected getTokenFromHeader(request: Request): string | null | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }

  protected async getJwtPayload(token: string): Promise<IJwtPayload> {
    try {
      if (!token)
        throw new UnauthorizedException(
          'Acesso não permitido para requisições sem autentição.',
        );

      const payload = await this._jwtService.verifyAsync(token);

      return payload;
    } catch (error) {
      this._logger.warn(
        'Request invalid JWT.',
        `➤ ${error.name}: ${error.message}`,
      );

      throw new UnauthorizedException('Token de acesso inválido.');
    }
  }
}

export default GuardBase;
