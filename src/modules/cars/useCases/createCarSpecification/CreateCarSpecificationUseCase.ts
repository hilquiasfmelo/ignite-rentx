import { inject, injectable } from 'tsyringe';

import { ICreateCarSpecification } from '@modules/cars/dtos/ICreateCarSpecification';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/interfaces/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/interfaces/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({
    car_id,
    specification_id,
  }: ICreateCarSpecification): Promise<Car> {
    const carsExists = await this.carsRepository.findById(car_id);

    if (!carsExists) {
      throw new AppError('Car not found');
    }

    const specifications = await this.specificationsRepository.findByIds(
      specification_id,
    );

    /**
     * Adiciona um Array de Specificações no atributo specifications que também
     * é um atributo do tipo Array na Entidade Car
     */
    carsExists.specifications = specifications;

    const car = await this.carsRepository.create(carsExists);

    return car;
  }
}

export { CreateCarSpecificationUseCase };
