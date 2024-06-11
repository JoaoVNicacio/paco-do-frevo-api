import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import PagedResults from 'src/shared/responseObjects/paged.results';

export function ApiPagedResultsResponse<TModel extends Type<any>>(
  model: TModel,
) {
  return applyDecorators(
    ApiExtraModels(PagedResults, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PagedResults) },
          {
            properties: {
              result: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
}
