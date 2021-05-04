import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCategoriesUseCase } from '@modules/cars/useCases/listCategories/ListCategoriesUseCase';

class ListCategoriesController {
  // constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

    const categories = await listCategoriesUseCase.execute();

    return response.status(200).json(categories);
  }
}

export { ListCategoriesController };
