import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import ValidationErrorDTO from '../dtos/validationErrorsDTOs/validation-error.dto';
import ValidationErrorSignatureDTO from '../dtos/validationErrorsDTOs/validation-error-signature.dto';

function generateValidationResponseProfile(mapper: Mapper) {
  createMap(
    mapper,
    ValidationErrorSignatureDTO,
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
          ValidationErrorSignatureDTO,
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
    ValidationErrorSignatureDTO,
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
