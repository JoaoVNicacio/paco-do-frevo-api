import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

class EventDTO {
  @AutoMap()
  @ApiProperty()
  public eventType: string;

  @AutoMap()
  @ApiProperty()
  public dateOfAccomplishment: Date;

  @AutoMap()
  @ApiProperty()
  public participantsAmount: number;
}

export default EventDTO;
