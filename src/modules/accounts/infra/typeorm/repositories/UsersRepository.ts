import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getRepository(User);
  }

  // Repository for create of users
  async create({
    id,
    name,
    password,
    email,
    driver_license,
    avatar,
  }: ICreateUserDTO): Promise<void> {
    const user = this.usersRepository.create({
      id,
      name,
      password,
      email,
      driver_license,
      avatar,
    });

    await this.usersRepository.save(user);
  }

  // Repository for listing  of users
  async index(): Promise<User[]> {
    const users = this.usersRepository.find();

    return users;
  }

  // Repository for verfication of email existing
  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);

    return user;
  }
}

export { UsersRepository };
