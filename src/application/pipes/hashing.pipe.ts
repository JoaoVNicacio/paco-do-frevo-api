import { Inject, Injectable, PipeTransform } from '@nestjs/common';
import IHashingHandler from 'src/application/handlers/ihashing.handler';

/**
 * The HashingPipe class is a NestJS pipe that uses a
 * hashing handler to transform a string value into a hashed value. */
@Injectable()
class HashingPipe implements PipeTransform {
  constructor(
    @Inject(IHashingHandler)
    private readonly _hashingHandler: IHashingHandler,
  ) {}

  /**
   * The transform function takes a string value and returns the hashed value using the hashingHandler.
   * @param {string} value - The value parameter is a string that will be passed to the hashingHandler's
   * hashValue method.
   * @returns The transform method is returning the result of the hashValue method from the
   * _hashingHandler object.
   */
  public transform(value: string) {
    return this._hashingHandler.hashValue(value);
  }
}

export default HashingPipe;
