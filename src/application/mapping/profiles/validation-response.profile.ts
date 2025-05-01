import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import ValidationErrorDTO from 'src/application/dtos/validationErrorsDTOs/validation-error.dto';
import ValidationErrorSignature from '../../../shared/validation/responses/validation-error.signature';

function generateValidationResponseProfile(mapper: Mapper) {
  createMap(
    mapper,
    ValidationErrorSignature,
    ValidationErrorDTO,
    forMember(
      (dest) => dest.constraints,
      mapFrom((src) => src.constraints),
    ),
    forMember(
      (dest) => dest.children,
      mapFrom((src) =>
        mapper.mapArray(
          src.children,
          ValidationErrorSignature,
          ValidationErrorDTO,
        ),
      ),
    ),
    forMember(
      (dest) => dest.contexts,
      mapFrom((src) => src.contexts),
    ),
  );

  createMap(
    mapper,
    ValidationErrorDTO,
    ValidationErrorSignature,
    forMember(
      (dest) => dest.constraints,
      mapFrom((src) => src.constraints),
    ),
    forMember(
      (dest) => dest.contexts,
      mapFrom((src) => src.contexts),
    ),
  );
}

export default generateValidationResponseProfile;
