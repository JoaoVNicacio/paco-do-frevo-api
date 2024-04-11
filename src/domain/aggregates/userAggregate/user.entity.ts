import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import EUserRoles from './enums/euser-roles';
import { AutoMap } from '@automapper/classes';
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  ValidationError,
  validate,
} from 'class-validator';

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._password;
      return ret;
    },
  },
  timestamps: true,
})
class User {
  @Prop({
    type: String,
    unique: true,
    default: function genUUID() {
      return uuid();
    },
  })
  public id: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @AutoMap()
  public firstName: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @AutoMap()
  public lastName: string;

  @Prop({ type: String, enum: EUserRoles, default: EUserRoles.DataVisualizer })
  @IsNotEmpty()
  @AutoMap()
  public role: EUserRoles;

  @Prop({ required: true, unique: true })
  @IsEmail({}, { message: 'Invalid email format' })
  @AutoMap()
  public email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  private _password: string;

  @Prop({ required: true })
  public passwordHash: string;

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

  public async isValid(): Promise<boolean> {
    const errors = await this.validateCreation();

    return errors.length === 0;
  }

  public async validateCreation(): Promise<Array<ValidationError>> {
    return await validate(this);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

export default User;
