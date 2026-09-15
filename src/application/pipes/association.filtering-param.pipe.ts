import { PipeTransform } from '@nestjs/common';
import EAssociationType from 'src/domain/aggregates/associationAggregate/enums/eassociation-type.enum';
import AssociationFilteringParam from 'src/shared/requestObjects/params/association.filtering-param';

class AssociationFilteringParamPipe implements PipeTransform {
  public transform(
    value: AssociationFilteringParam | unknown,
  ): AssociationFilteringParam | null | undefined {
    if (value && value instanceof AssociationFilteringParam) {
      return value;
    }

    const possibleValue = new AssociationFilteringParam();

    if (value && typeof value === 'object') {
      if ('searchParam' in value && typeof value.searchParam === 'string') {
        possibleValue.searchParam =
          String(value.searchParam) == '' ? null : String(value.searchParam);
      }

      if (
        'associationType' in value &&
        Object.values(EAssociationType).includes(
          value.associationType as EAssociationType,
        )
      ) {
        possibleValue.associationType =
          value.associationType as EAssociationType;
      }

      if ('district' in value && typeof value.district === 'string') {
        possibleValue.district =
          String(value.district) == '' ? null : String(value.district);
      }

      if ('city' in value && typeof value.city === 'string') {
        possibleValue.city =
          String(value.city) == '' ? null : String(value.city);
      }

      if ('state' in value && typeof value.state === 'string') {
        possibleValue.state =
          String(value.state) == '' ? null : String(value.state);
      }

      if ('minMemberAmount' in value) {
        possibleValue.minMemberAmount =
          isNaN(Number(value?.minMemberAmount)) ||
          Number(value?.minMemberAmount) < 1
            ? undefined
            : Number(value?.minMemberAmount);
      }

      if ('maxMemberAmount' in value) {
        possibleValue.maxMemberAmount =
          isNaN(Number(value?.maxMemberAmount)) ||
          Number(value?.maxMemberAmount) < 1
            ? undefined
            : Number(value?.maxMemberAmount);
      }

      return possibleValue;
    }

    return null;
  }
}

export default AssociationFilteringParamPipe;
