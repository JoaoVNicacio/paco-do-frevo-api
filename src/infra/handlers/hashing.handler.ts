import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import IHashingHandler from 'src/domain/handlers/ihashing.handler';

@Injectable()
class HashingHandler implements IHashingHandler {
  public hashValue(value: string): string {
    const saltRounds = 10;
    return hashSync(value, saltRounds);
  }
}

export default HashingHandler;
