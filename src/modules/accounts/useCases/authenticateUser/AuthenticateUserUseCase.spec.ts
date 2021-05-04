import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AuthenticateUserUseCase } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import { AppError } from '@shared/errors/AppError';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
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
  it('should not able to authenticate an noneexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: 'false',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  // Não deve ser possível autenticar com a senha incorreta
  it('should not able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'Hilquias Ferreira Melo',
        email: 'hilquiasfmelo@hotmail.com',
        password: '123456',
        driver_license: '000123',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrectPassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
