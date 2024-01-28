import { AutoMap } from '@automapper/classes';

class ValidationErrorDTO {
  @AutoMap()
  public property: string;

  @AutoMap()
  public constraints: { [type: string]: string };

  @AutoMap()
  public children?: Array<ValidationErrorDTO>;

  @AutoMap()
  public contexts?: { [type: string]: any };
}

export default ValidationErrorDTO;
