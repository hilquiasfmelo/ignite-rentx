import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getRepository(User);
  }

  // Repository for create of users
  async create({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.usersRepository.create({
      name,
      password,
      email,
      driver_license,
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
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);

    return user;
  }
}

export { UsersRepository };
