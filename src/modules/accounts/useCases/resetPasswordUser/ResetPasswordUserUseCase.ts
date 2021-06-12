import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/interfaces/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/interfaces/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token,
    );

    if (!userToken) {
      throw new AppError('Token invalid');
    }

    // Verifica se o refresh_token já esta expirado
    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow(),
      )
    ) {
      throw new AppError('Token expired');
    }

    const user = this.usersRepository.findById(userToken.user_id);

    // Realizando o hash da senha
    (await user).password = await hash(password, 8);

    // Atualiza o usuário com a nova senha criada
    await this.usersRepository.create(await user);

    // Remove o token antigo
    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUserUseCase };
