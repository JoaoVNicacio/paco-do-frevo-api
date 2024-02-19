import { Mapper as IMapper } from '@automapper/core';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ApiInternalServerErrorResponse } from '@nestjs/swagger';
import ValidationErrorCopy from 'src/application/dtos/validationErrorsDTOs/validation-error-signature.dto';
import ValidationErrorDTO from 'src/application/dtos/validationErrorsDTOs/validation-error.dto';
import PagedResults from 'src/application/responseObjects/paged.results';
import ValidationResponse from 'src/application/responseObjects/validation.response';

/** The `ControllerBase` is a base class for the project's NestJS controllers.
it provides methods for sending custom validation and response messages, as
well as handling errors. */
@ApiInternalServerErrorResponse({
  description: 'There was a internal server error on the operation',
  schema: {
    type: 'object',
    properties: {
      message: { type: 'string' },
      error: { type: 'string', nullable: true },
      statusCode: { type: 'number' },
    },
  },
})
class ControllerBase {
  @Inject('IMapper')
  protected readonly _mapper: IMapper;

  /**
   * The function sends a custom validation response and throws a BadRequestException if the validation
   * response is not valid.
   * @param validationResponse - The `validationResponse` parameter is an object of type
   * `ValidationResponse<T>`. It contains information about the validation result and the output value.
   * @returns the `output` property of the `validationResponse` object.
   */
  protected sendCustomValidationResponse<T>(
    validationResponse: ValidationResponse<T>,
  ): T {
    if (!validationResponse.isValid) {
      const formattedErrors = this._mapper.mapArray(
        validationResponse.validationResult as Array<ValidationErrorCopy>,
        ValidationErrorCopy,
        ValidationErrorDTO,
      );

      throw new BadRequestException({
        message: `A requisição com ${typeof validationResponse.output} é inválida.`,
        errors: formattedErrors,
      });
    }

    return validationResponse.output;
  }

  /**
   * The function sends a custom response and throws exceptions if the response is empty or not found.
   * @param {T} response - The `response` parameter is a generic type `T` which represents the response
   * object that will be sent back. It can be any type of object.
   * @returns The `sendCustomResponse` method returns the `response` parameter that is passed to it.
   */
  protected sendCustomResponse<T>(response: T): T {
    if (!response) {
      throw new NotFoundException('O item requisitado não foi encontrado.');
    }

    if (
      (response instanceof Array && response.length === 0) ||
      (response instanceof PagedResults && response.result.length === 0)
    ) {
      throw new HttpException(null, HttpStatus.NO_CONTENT);
    }

    return response;
  }

  /**
   * The function throws an InternalServerErrorException if the error is not an instance of
   * HttpException, otherwise it throws the error itself.
   * @param error - The `error` parameter is the error object that is being thrown. It is checked to see
   * if it is an instance of the `HttpException` class.
   * @param {string} message - The `message` parameter is a string that represents the error message to
   * be displayed. It is used to provide additional information about the error that occurred.
   */
  protected throwInternalError(error: Error, message: string): void {
    if (!(error instanceof HttpException)) {
      console.error(error);

      throw new InternalServerErrorException(
        `Oops, ${message.trim()}. Por favor, relate ao suporte.`,
      );
    }

    throw error;
  }
}

export default ControllerBase;
