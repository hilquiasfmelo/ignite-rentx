import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from '../../repositories/ISpecificationsRepository';

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specificationAlreadyExists = await this.specificationsRepository.findByName(
      name,
    );

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists.');
    }

    await this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
