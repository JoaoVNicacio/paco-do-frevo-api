import { Mapper as IMapper } from '@automapper/core';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import ValidationErrorCopy from 'src/application/dtos/validationErrorsDTOs/validation-error-signature.dto';
import ValidationErrorDTO from 'src/application/dtos/validationErrorsDTOs/validation-error.dto';
import PagedResults from 'src/shared/responseObjects/paged.results';
import ValidationResponse from 'src/shared/responseObjects/validation.response';
import { Mapper } from 'src/application/symbols/dependency-injection.symbols';
import NoContentException from 'src/shared/exceptions/no-content.exception';

/** The `ControllerBase` is a base class for the project's NestJS controllers.
it provides methods for sending custom validation and response messages, as
well as handling errors. */
@ApiInternalServerErrorResponse({
  description: 'There was an internal server error on the operation',
  schema: {
    type: 'object',
    properties: {
      message: { type: 'string' },
      error: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          message: { type: 'string' },
          stack: { type: 'string' },
        },
      },
    },
  },
})
@ApiBearerAuth()
class ControllerBase {
  @Inject(Mapper)
  protected readonly _mapper: IMapper;

  /**
   * This method sends a custom response and throws exceptions if the response is empty or not found
   * an no status code was given.
   * Or throws a BadRequestException if the validation response is not valid.
   * @param {T | ValidationResponse<T>} response - The `response` parameter is a generic type `T | ValidationResponse<T>`
   * which represents the response
   * object that will be sent back. It can be any type of object.
   * @param {T} responseStatus - The `responseStatus` parameter is a optional enum of HTTP statuses
   * if `response` is an instance of `ValidationResponse<T>` it will be ignored and will follow
   * the 200 if Ok.
   * @returns The `customHttpResponse` method returns the typeparam ´T´ value that is passed to it or throws the due http exceptions
   * .
   */
  protected customHttpResponse<T>(
    response: T | ValidationResponse<T>,
    responseStatus?: HttpStatus,
  ): T {
    if (response instanceof ValidationResponse) {
      if (!response.isValid) {
        const formattedErrors = this._mapper.mapArray(
          response.validationResult as Array<ValidationErrorCopy>,
          ValidationErrorCopy,
          ValidationErrorDTO,
        );

        throw new BadRequestException({
          message: `A requisição com ${typeof response.output} é inválida.`,
          errors: formattedErrors,
        });
      }

      return response.output;
    }
    if (responseStatus) {
      throw new HttpException(response, responseStatus);
    }

    if (!response) {
      throw new NotFoundException('O item requisitado não foi encontrado.');
    }

    if (
      (response instanceof Array && response.length === 0) ||
      (response instanceof PagedResults && response.result.length === 0)
    ) {
      throw new NoContentException();
    }

    return response;
  }
}

export default ControllerBase;
