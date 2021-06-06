import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';

class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.user;
    const { id } = request.params;

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

    const devolution_rental = await devolutionRentalUseCase.execute({
      id,
      user_id,
    });

    return response.status(200).json(devolution_rental);
  }
}

export { DevolutionRentalController };
