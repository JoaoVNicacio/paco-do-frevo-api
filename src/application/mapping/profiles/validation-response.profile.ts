import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import ValidationErrorCopy from 'src/application/dtos/validationErrorsDTOs/validation-error-signature.dto';
import ValidationErrorDTO from 'src/application/dtos/validationErrorsDTOs/validation-error.dto';

function generateValidationResponseProfile(mapper: Mapper) {
  createMap(
    mapper,
    ValidationErrorCopy,
    ValidationErrorDTO,
    forMember(
      (dest) => dest.constraints,
      mapFrom((src) => src.constraints),
    ),
    forMember(
      (dest) => dest.children,
      mapFrom((src) =>
        mapper.mapArray(src.children, ValidationErrorCopy, ValidationErrorDTO),
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
    ValidationErrorCopy,
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
