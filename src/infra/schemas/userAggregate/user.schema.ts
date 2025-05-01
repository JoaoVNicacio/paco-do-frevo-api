import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as generateUUIDv4 } from 'uuid';
import User from '../../../domain/aggregates/userAggregate/user.entity';
import EUserRoles from '../../../domain/aggregates/userAggregate/enums/euser-roles';

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
class UserDBSchema extends User {
  @Prop({
    type: String,
    unique: true,
    default: () => generateUUIDv4(),
  })
  public override id: string;

  @Prop({ required: true })
  public override firstName: string;

  @Prop({ required: true })
  public override lastName: string;

  @Prop({ type: String, enum: EUserRoles, default: EUserRoles.DataVisualizer })
  public override role: EUserRoles;

  @Prop({ required: true, unique: true })
  public override email: string;

  @Prop({ required: true })
  public override passwordHash: string;

  @Prop({
    required: false,
    default: () => Date.now(),
  })
  public override createdAt: Date;

  @Prop({
    required: false,
    default: () => Date.now(),
  })
  public override updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserDBSchema);

export default UserDBSchema;
