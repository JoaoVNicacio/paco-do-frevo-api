import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import IHashingHandler from 'src/application/contracts/handlers/ihashing.handler';
import { LoggerService as ILogger } from '@nestjs/common';
import { Logger } from 'src/application/symbols/dependency-injection.symbols';

@Injectable()
class HashingHandler implements IHashingHandler {
  constructor(
    @Inject(Logger)
    private readonly _logger: ILogger,
  ) {}

  public comparePlainTextToHash(plainText: string, hash: string): boolean {
    this._logger.log('<#️⃣🔍> ➤ Comparing plain text to hash.');
    const startTime = Date.now();

    const result = bcrypt.compareSync(plainText, hash);

    this._logger.log(`<⌛️> ➤ Comparison done in: ${Date.now() - startTime}ms.`);

    return result;
  }

  public hashValue(value: string): string {
    const saltRounds = 10;

    this._logger.log('<🔐#️⃣> ➤ hashing provided value.');

    const startTime = Date.now();

    const hashedValue = bcrypt.hashSync(value, saltRounds);

    this._logger.log(`<⌛️> ➤ hashing done in: ${Date.now() - startTime}ms.`);

    return hashedValue;
  }
}

export default HashingHandler;
