import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import User from 'src/domain/aggregates/userAggregate/user.entity';
import IUserRepository from 'src/domain/repositories/iuser.repository';
import UserDBSchema from '../schemas/userAggregate/user.schema';

@Injectable()
class UserRepository implements IUserRepository {
  constructor(
    @InjectModel('User')
    private readonly _userModel: Model<UserDBSchema>,
  ) {}

  public async createUser(user: User): Promise<User> {
    return await new this._userModel(user).save();
  }

  public async findById(id: string): Promise<User> {
    return await this._userModel.findOne({ id: id });
  }

  public async findByEmail(email: string): Promise<User> {
    return await this._userModel.findOne({ email: email });
  }

  public async updateUser(id: string, user: User): Promise<User> {
    return await this._userModel.findOneAndUpdate({ id: id }, user);
  }

  public async deleteUser(id: string): Promise<void> {
    await this._userModel.findOneAndDelete({ id: id });
  }
}

export default UserRepository;
