import EUserRoles from './enums/euser-roles';
import { AutoMap } from '@automapper/classes';
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  ValidationError,
  validate,
} from 'class-validator';
import IEntity from 'src/core/entities/ientity.base';
import CleanStringBuilder from 'src/shared/utils/clean-string.builder';

class User implements IEntity<string> {
  public id: string;

  @IsNotEmpty()
  @AutoMap()
  public firstName: string;

  @IsNotEmpty()
  @AutoMap()
  public lastName: string;

  @IsNotEmpty()
  @AutoMap()
  public role: EUserRoles;

  @IsEmail({}, { message: 'Invalid email format' })
  @AutoMap()
  public email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  private _password: string;

  public passwordHash: string;

  public createdAt: Date;

  public updatedAt: Date;

  /**
   * This setter sets the password hash value for the object.
   * @param {string} passwordHash - The parameter `passwordHash` is a string that represents the hashed
   * value of a password.
   */
  public set hashedPassword(passwordHash: string) {
    this.passwordHash = passwordHash;
  }

  public getPasswordHash(): string {
    return this.passwordHash;
  }

  /**
   * The setter sets the value of the password property.
   * Use this to set the password to be validated before hashing
   * @param {string} value - The value parameter is a string that represents the new password that will
   * be set.
   */
  public set password(value: string) {
    this._password = value;
  }

  public sanitizeEntityProperties(): void {
    this.firstName = this.firstName
      ? CleanStringBuilder.fromString(this.firstName)
          .withoutUnnecessarySpaces()
          .withoutSlashes()
          .toInitCap(true)
          .build()
      : this.firstName;

    this.lastName = this.lastName
      ? CleanStringBuilder.fromString(this.lastName)
          .withoutUnnecessarySpaces()
          .withoutSlashes()
          .toInitCap(true)
          .build()
      : this.lastName;
  }

  public async isValid(): Promise<boolean> {
    const errors = await this.validateCreation();

    return errors.length === 0;
  }

  public async validateCreation(): Promise<Array<ValidationError>> {
    return await validate(this);
  }
}

export default User;
