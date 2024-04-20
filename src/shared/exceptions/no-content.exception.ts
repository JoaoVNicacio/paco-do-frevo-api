import { HttpException, HttpStatus } from '@nestjs/common';

class NoContentException extends HttpException {
  constructor() {
    super(null, HttpStatus.NO_CONTENT);
  }
}

export default NoContentException;
