import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      driver_license,
    });

    this.users.push(user);
  }
  async index(): Promise<User[]> {
    return this.users;
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }
  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }
}

export { UsersRepositoryInMemory };
