import { Request, Response } from 'express';

import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

class ListSpecificationsController {
  constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) {}

  handle(request: Request, response: Response): Response {
    const specifications = this.listSpecificationsUseCase.execute();

    return response.status(200).json(specifications);
  }
}

export { ListSpecificationsController };
