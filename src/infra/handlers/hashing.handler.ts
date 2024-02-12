import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import IHashingHandler from 'src/domain/handlers/ihashing.handler';

@Injectable()
class HashingHandler implements IHashingHandler {
  public compareHashes(firstValue: string, secondValue: string): boolean {
    return bcrypt.compareSync(firstValue, secondValue);
  }

  public hashValue(value: string): string {
    const saltRounds = 10;
    return bcrypt.hashSync(value, saltRounds);
  }
}

export default HashingHandler;
