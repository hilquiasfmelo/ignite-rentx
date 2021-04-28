import { AppError } from '@errors/AppError';
import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // Checks whether the user exists
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect!');
    }

    // Checks whether the password is correct
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!');
    }

    // Generate the jsonwebtoken
    const token = sign({}, '6345f2dfd0cfb631d63d292fe7eab787', {
      subject: (await user).id,
      expiresIn: '1d',
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
