import {
  BadRequestException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import ValidationResponse from 'src/application/responseObjects/validation.response';

/* The `ControllerBase` is a base class for the project's NestJS controllers.
it provides methods for sending custom validation and response messages, as
well as handling errors. */
class ControllerBase {
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
      const formattedErrors = validationResponse.validationResult.map(
        (error) => ({
          property: error.property,
          constraints: error.constraints,
          children: error.children,
          contexts: error.contexts,
        }),
      );

      throw new BadRequestException({
        message: `The given ${typeof validationResponse.output} is invalid.`,
        errors: formattedErrors,
      });
    }

    return validationResponse.output;
    // eslint-disable-next-line prettier/prettier
  }

  /**
   * The function sends a custom response and throws exceptions if the response is empty or not found.
   * @param {T} response - The `response` parameter is a generic type `T` which represents the response
   * object that will be sent back. It can be any type of object.
   * @returns The `sendCustomResponse` method returns the `response` parameter that is passed to it.
   */
  protected sendCustomResponse<T>(response: T): T {
    if (!response) {
      throw new NotFoundException('The requested item was not found.');
    }

    if (response instanceof Array && response.length === 0) {
      throw new HttpException(null, HttpStatus.NO_CONTENT);
    }

    return response;
    // eslint-disable-next-line prettier/prettier
  }

  /**
   * The function throws an InternalServerErrorException if the error is not an instance of
   * HttpException, otherwise it throws the error itself.
   * @param error - The `error` parameter is the error object that is being thrown. It is checked to see
   * if it is an instance of the `HttpException` class.
   * @param {string} message - The `message` parameter is a string that represents the error message to
   * be displayed. It is used to provide additional information about the error that occurred.
   */
  protected throwInternalError(error, message: string): void {
    if (!(error instanceof HttpException)) {
      throw new InternalServerErrorException(
        `Oops, ${message.trim()}. Please contact our support`,
      );
    }

    throw error;
  }
}

export default ControllerBase;
