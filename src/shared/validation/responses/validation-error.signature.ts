import { AutoMap } from '@automapper/classes';

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
  public children?: ValidationErrorSignature[];

  @AutoMap()
  public contexts?: {
    [type: string]: any;
  };
}

export default ValidationErrorSignature;
