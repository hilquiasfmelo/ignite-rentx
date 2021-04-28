import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/entities/User';

interface IUsersRepository {
  create({
    id,
    name,
    password,
    email,
    driver_license,
    avatar,
  }: ICreateUserDTO): Promise<void>;

  index(): Promise<User[]>;

  findByEmail(email: string): Promise<User>;

  findById(id: string): Promise<User>;
}

export { IUsersRepository };
