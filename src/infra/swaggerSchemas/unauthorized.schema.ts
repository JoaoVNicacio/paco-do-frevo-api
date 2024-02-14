import { applyDecorators } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';

export function ApiUnauthorizedResponseWithSchema() {
  return applyDecorators(
    ApiUnauthorizedResponse({
      description: 'You are unauthorized',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          error: { type: 'string', nullable: true },
          statusCode: { type: 'number' },
        },
      },
    }),
  );
}
