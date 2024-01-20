import User from '../entities/userAggregate/user.entity';

interface IUserRepository {
  createUser(user: User): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  updateUser(id: string, user: User): Promise<User | undefined>;
  deleteUser(id: string): Promise<void>;
}

export default IUserRepository;
