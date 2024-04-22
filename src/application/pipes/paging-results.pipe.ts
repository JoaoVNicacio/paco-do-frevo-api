import { Injectable, PipeTransform } from '@nestjs/common';
import PagingParams from 'src/shared/requestObjects/params/paging.params';

@Injectable()
class PagingParamsPipe implements PipeTransform {
  public transform(value: PagingParams | unknown): PagingParams {
    if (!value) {
      return new PagingParams();
    }

    if (value && value instanceof PagingParams) {
      if (!value?.page || isNaN(value?.page)) {
        value.page = 1;
      }

      if (!value?.pageSize || isNaN(value?.pageSize)) {
        value.pageSize = 10;
      }

      return value;
    }

    const possibleValue = new PagingParams();

    if (typeof value === 'object') {
      if ('page' in value) {
        possibleValue.page =
          isNaN(Number(value?.page)) || Number(value?.page) < 1
            ? 1
            : Number(value?.page);
      }

      if ('pageSize' in value) {
        possibleValue.pageSize =
          isNaN(Number(value?.pageSize)) || Number(value?.pageSize) < 1
            ? 10
            : Number(value?.pageSize);
      }
    }

    return possibleValue;
  }
}

export default PagingParamsPipe;
