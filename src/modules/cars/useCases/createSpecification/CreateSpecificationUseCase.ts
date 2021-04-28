import { AppError } from '@errors/AppError';
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from '@modules/cars/repositories/interfaces/ISpecificationsRepository';
import { inject, injectable } from 'tsyringe';

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
