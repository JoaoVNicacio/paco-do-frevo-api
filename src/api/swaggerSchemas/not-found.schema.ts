import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse } from '@nestjs/swagger';

export function ApiNotFoundResponseWithSchema() {
  return applyDecorators(
    ApiNotFoundResponse({
      description: 'The record was not found.',
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
