import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';

interface IUsersRepository {
  create({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void>;

  index(): Promise<User[]>;

  findByEmail(email: string): Promise<User>;

  findById(id: string): Promise<User>;
}

export { IUsersRepository };
