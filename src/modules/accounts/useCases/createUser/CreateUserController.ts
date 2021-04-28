import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password, email, driver_license, avatar } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      password,
      email,
      driver_license,
      avatar,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
