import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSpecificationUseCase } from '@modules/cars/useCases/createSpecification/CreateSpecificationUseCase';

class CreateSpecificationController {
  // constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCase,
    );

    await createSpecificationUseCase.execute({
      name,
      description,
    });

    return response.status(201).send();
  }
}

export { CreateSpecificationController };
