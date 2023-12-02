import { IsNotEmpty, IsUUID } from 'class-validator';

/** The UUIDParam class is a TypeScript class that represents a parameter with a non-empty and valid
UUID string. */
class UUIDParam {
  @IsNotEmpty()
  @IsUUID()
  public id: string;
}

export default UUIDParam;
