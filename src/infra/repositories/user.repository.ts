import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import User from 'src/domain/entities/userAggregate/user.entity';
import IUserRepository from 'src/domain/repositories/iuser.repository';

@Injectable()
class UserRepository implements IUserRepository {
  constructor(@InjectModel('User') private readonly _userModel: Model<User>) {}

  public async createUser(user: User): Promise<User> {
    return await new this._userModel(user).save();
  }

  public async findById(id: string): Promise<User> {
    return await this._userModel.findOne({ id: id });
  }

  public async updateUser(id: string, user: User): Promise<User> {
    return await this._userModel.findOneAndUpdate({ id: id }, user);
  }

  public async deleteUser(id: string): Promise<void> {
    await this._userModel.findOneAndDelete({ id: id });
  }
}

export default UserRepository;
