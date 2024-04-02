import { ApiProperty } from '@nestjs/swagger';

// * This file stores value representations for the Swagger documentation of the project.

/** The class KeyValueRepresentation represents a key-value pair
with a default value for the key. */
export class KeyValueRepresentation {
  @ApiProperty({ default: 'value' })
  public key: string;
}

/** The `ValidationErrorRepresentation` class represents a validation error with properties,
constraints, and optional contexts. */
export class ValidationErrorRepresentation {
  @ApiProperty()
  public property: string;

  @ApiProperty({ type: KeyValueRepresentation })
  public constraints: { [type: string]: string };

  @ApiProperty({ type: KeyValueRepresentation })
  public contexts?: { [type: string]: any };
}

/** The ValidationPipeResponseRepresentation class represents the response structure for validation
errors in the Nest Validation Pipes including a message, error description, and status code. */
export class ValidationPipeResponseRepresentation {
  @ApiProperty({ type: [String] })
  public message: Array<string>;

  @ApiProperty()
  public error: string;

  @ApiProperty()
  public statusCode: number;
}
