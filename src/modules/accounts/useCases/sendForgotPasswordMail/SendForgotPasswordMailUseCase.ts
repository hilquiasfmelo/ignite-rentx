import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/interfaces/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/interfaces/IDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/interfaces/IMailProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,

    @inject('EtherealMailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs',
    );

    if (!user) {
      throw new AppError('User does not exists');
    }

    const token = uuidV4();

    const expires_date = this.dateProvider.addHours(3);

    // Criação do refresh_token do usuário
    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token: token,
      expires_date,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    // Envio do email de teste
    await this.mailProvider.sendMail(
      email,
      'Recuperação de Senha',
      variables,
      templatePath,
    );
  }
}

export { SendForgotPasswordMailUseCase };
