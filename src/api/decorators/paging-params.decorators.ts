import { ApiQuery } from '@nestjs/swagger';

/**
 * Decorator for the 'page' parameter as a Query Param
 * @returns PropertyDecorator & MethodDecorator & ParameterDecorator
 */
export function PageIndexQuery(): PropertyDecorator &
  MethodDecorator &
  ParameterDecorator {
  return ApiQuery({
    name: 'page',
    description: 'The page index of the request',
    required: false,
  });
}

/**
 * Decorator for the 'page' parameter as a Query Param
 * @returns PropertyDecorator & MethodDecorator & ParameterDecorator
 */
export function PageSizeQuery(): PropertyDecorator &
  MethodDecorator &
  ParameterDecorator {
  return ApiQuery({
    name: 'pageSize',
    description: 'The page size of the request',
    required: false,
  });
}
