import EUserRoles from './enums/euser-roles';
import { AutoMap } from '@automapper/classes';
import IEntity from 'src/core/entities/ientity.base';
import CleanStringBuilder from 'src/shared/utils/clean-string.builder';
import { ValidationDelegate } from '../../../shared/validation/validators/validation.types';
import ValidationErrorSignature from '../../../shared/validation/responses/validation-error.signature';

class User implements IEntity<string> {
  public id: string;

  @AutoMap()
  public firstName: string;

  @AutoMap()
  public lastName: string;

  @AutoMap()
  public role: EUserRoles;

  @AutoMap()
  public email: string;

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

  public get password() {
    return this._password;
  }

  public validationDelegate: ValidationDelegate<User> | null | undefined = null;

  public async isValid(): Promise<boolean> {
    return (
      (await this.validateEntity()).length === 0 &&
      this.validationDelegate !== null &&
      this.validationDelegate !== undefined
    );
  }

  public async validateEntity(): Promise<Array<ValidationErrorSignature>> {
    if (this.validationDelegate) return this.validationDelegate(this);

    return [];
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
}

export default User;
