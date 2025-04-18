import { ApiQuery } from '@nestjs/swagger';
import EAssociationType from 'src/domain/aggregates/associationAggregate/enums/eassociation-type.enum';

/**
 * Decorator for the 'searchParam' parameter as a Query Param
 * @returns PropertyDecorator & MethodDecorator & ParameterDecorator
 */
export function SearchParamQuery(): PropertyDecorator &
  MethodDecorator &
  ParameterDecorator {
  return ApiQuery({
    name: 'searchParam',
    required: false,
    description: 'Search parameter',
  });
}

/**
 * Decorator for the 'associationType' parameter as a Query Param
 * @returns PropertyDecorator & MethodDecorator & ParameterDecorator
 */
export function AssociationTypeQuery(): PropertyDecorator &
  MethodDecorator &
  ParameterDecorator {
  return ApiQuery({
    name: 'associationType',
    required: false,
    description: 'Association type',
    enum: EAssociationType,
  });
}

/**
 * Decorator for the 'district' parameter as a Query Param
 * @returns PropertyDecorator & MethodDecorator & ParameterDecorator
 */
export function DistrictQuery(): PropertyDecorator &
  MethodDecorator &
  ParameterDecorator {
  return ApiQuery({
    name: 'district',
    required: false,
    description: 'District',
  });
}

/**
 * Decorator for the 'city' parameter as a Query Param
 * @returns PropertyDecorator & MethodDecorator & ParameterDecorator
 */
export function CityQuery(): PropertyDecorator &
  MethodDecorator &
  ParameterDecorator {
  return ApiQuery({ name: 'city', required: false, description: 'City' });
}

/**
 * Decorator for the 'state' parameter as a Query Param
 * @returns PropertyDecorator & MethodDecorator & ParameterDecorator
 */
export function StateQuery(): PropertyDecorator &
  MethodDecorator &
  ParameterDecorator {
  return ApiQuery({ name: 'state', required: false, description: 'State' });
}

/**
 * Decorator for the 'minMemberAmmount' parameter as a Query Param
 * @returns PropertyDecorator & MethodDecorator & ParameterDecorator
 */
export function MinMemberAmmountQuery(): PropertyDecorator &
  MethodDecorator &
  ParameterDecorator {
  return ApiQuery({
    name: 'minMemberAmmount',
    required: false,
    description: 'Minimum member amount',
  });
}

/**
 * Decorator for the 'maxMemberAmmount' parameter as a Query Param
 * @returns PropertyDecorator & MethodDecorator & ParameterDecorator
 */
export function MaxMemberAmmountQuery(): PropertyDecorator &
  MethodDecorator &
  ParameterDecorator {
  return ApiQuery({
    name: 'maxMemberAmmount',
    required: false,
    description: 'Maximum member amount',
  });
}
