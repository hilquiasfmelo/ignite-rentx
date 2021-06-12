import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });

  // Deve ser capaz de enviar um e-mail de 'esqueci minha senha' para o usuário
  it('should be able to send a forgot password mail to user', async () => {
    const sendEmail = spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      name: 'Dylan Rose',
      email: 'erusiit@mobmidaz.sv',
      password: '3240122025',
      driver_license: '3546318756',
    });

    await sendForgotPasswordMailUseCase.execute('erusiit@mobmidaz.sv');

    expect(sendEmail).toHaveBeenCalled();
  });

  // Não deve ser capaz de enviar um e-mail se o usuário não existir
  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('picugi@nu.no'),
    ).rejects.toEqual(new AppError('User does not exists'));
  });

  // deve ser capaz de criar um refresh token de usuário
  it('should be able to create an users refresh token', async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, 'create');

    await usersRepositoryInMemory.create({
      name: 'Henrietta Malone',
      email: 'pi@jurkepo.cy',
      password: '3715445747',
      driver_license: '3419898120',
    });

    await sendForgotPasswordMailUseCase.execute('pi@jurkepo.cy');

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
