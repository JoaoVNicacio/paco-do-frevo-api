import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import EUserRoles from './enums/euser-roles';

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
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
  public firstName: string;

  @Prop({ required: true })
  public lastName: string;

  @Prop({ type: String, enum: EUserRoles, default: EUserRoles.DataVisualizer })
  public role: EUserRoles;

  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ required: true })
  public password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export default User;
