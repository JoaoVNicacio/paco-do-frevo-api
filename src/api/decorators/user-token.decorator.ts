import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import IJwtPayload from 'src/shared/requestObjects/ijwt.payload';

export const User = createParamDecorator(
  (data: keyof IJwtPayload | undefined, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest().user as IJwtPayload;

    return data ? user?.[data] : user;
  },
);
