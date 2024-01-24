import { AutoMap } from '@automapper/classes';

class EventDTO {
  @AutoMap()
  public eventType: string;
  @AutoMap()
  public dateOfAccomplishment: Date;
  @AutoMap()
  public participantsAmount: number;
}

export default EventDTO;
