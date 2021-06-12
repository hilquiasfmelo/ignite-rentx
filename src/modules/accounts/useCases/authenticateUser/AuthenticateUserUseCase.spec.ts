import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { AuthenticateUserUseCase } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
    );
  });

  // Deve ser possível autenticar um usuário
  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: 'Hilquias Ferreira Melo',
      email: 'hilquiasfmelo@hotmail.com',
      password: '123456',
      driver_license: '000123',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    // Espera-se que 'result' tenha a propriedade 'token'
    expect(result).toHaveProperty('token');
  });

  // Não deve ser possível autenticar um usuário inexistente
  it('should not able to authenticate an noneexistent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: 'false',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });

  // Não deve ser possível autenticar com a senha incorreta
  it('should not able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      name: 'Hilquias Ferreira Melo',
      email: 'hilquiasfmelo@hotmail.com',
      password: '123456',
      driver_license: '000123',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrectPassword',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });
});
