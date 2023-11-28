import { IsNotEmpty, IsUUID } from 'class-validator';

class UUIDParam {
  @IsNotEmpty()
  @IsUUID()
  public id: string;
}

export default UUIDParam;
