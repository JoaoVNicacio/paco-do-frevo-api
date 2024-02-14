import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import IHashingHandler from 'src/application/handlers/ihashing.handler';

@Injectable()
class HashingHandler implements IHashingHandler {
  public comparePlainTextToHash(plainText: string, hash: string): boolean {
    return bcrypt.compareSync(plainText, hash);
  }

  public hashValue(value: string): string {
    const saltRounds = 10;
    return bcrypt.hashSync(value, saltRounds);
  }
}

export default HashingHandler;
