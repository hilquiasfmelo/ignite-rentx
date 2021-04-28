import { ListSpecificationsUseCase } from '@modules/cars/useCases/listSpecifications/ListSpecificationsUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSpecificationsUseCase = container.resolve(
      ListSpecificationsUseCase,
    );

    const specifications = await listSpecificationsUseCase.execute();

    return response.status(200).json(specifications);
  }
}

export { ListSpecificationsController };
