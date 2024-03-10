import { applyDecorators } from '@nestjs/common';
import { ApiForbiddenResponse } from '@nestjs/swagger';

export function ApiForbiddenResponseWithSchema() {
  return applyDecorators(
    ApiForbiddenResponse({
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
