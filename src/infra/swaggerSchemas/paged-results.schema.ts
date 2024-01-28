import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import PagedResults from 'src/application/responseObjects/paged.results';

export const ApiPagedResultsResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
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
};
