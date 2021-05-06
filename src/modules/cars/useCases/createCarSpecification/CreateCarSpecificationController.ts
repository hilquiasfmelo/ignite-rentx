import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { car_id } = request.params;
    const { specification_id } = request.body;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase,
    );

    const cars = await createCarSpecificationUseCase.execute({
      car_id,
      specification_id,
    });

    return response.status(200).json(cars);
  }
}

export { CreateCarSpecificationController };
