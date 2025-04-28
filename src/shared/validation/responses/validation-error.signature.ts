import { AutoMap } from '@automapper/classes';
import { ValidationError } from 'class-validator';

class ValidationErrorSignature {
  @AutoMap()
  public target?: object;

  @AutoMap()
  public property: string;

  @AutoMap()
  public value?: any;

  @AutoMap()
  public constraints?: { [type: string]: string };

  @AutoMap()
  public children?: ValidationError[];

  @AutoMap()
  public contexts?: {
    [type: string]: any;
  };
}

export default ValidationErrorSignature;
