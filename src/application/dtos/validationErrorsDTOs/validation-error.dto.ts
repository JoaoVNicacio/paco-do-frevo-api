import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  KeyValueRepresentation,
  ValidationErrorRepresentation,
} from 'src/application/valueRepresentations/values.representations';

class ValidationErrorDTO {
  @AutoMap()
  @ApiProperty()
  public property: string;

  @AutoMap()
  @ApiProperty({ type: KeyValueRepresentation })
  public constraints: { [type: string]: string };

  @AutoMap()
  @ApiProperty({ type: [ValidationErrorRepresentation] })
  public children?: Array<ValidationErrorDTO>;

  @AutoMap()
  @ApiProperty({ type: KeyValueRepresentation })
  public contexts?: { [type: string]: any };
}

export default ValidationErrorDTO;
