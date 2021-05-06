import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory,
    );
  });

  // Não deve ser possível adicionar uma nova especificação para um carro já existente
  it('should not be able to add a new specification to a now-existent car', async () => {
    expect(async () => {
      const car_id = '12345';
      const specification_id = ['54321'];

      await createCarSpecificationUseCase.execute({
        car_id,
        specification_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  // Deve ser possível adicionar uma nova especificação para o carro
  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      id: '145236',
      name: 'Car Fake',
      description: 'Description Fake',
      daily_rate: 0,
      license_plate: 'Plate Fake',
      fine_amount: 0,
      brand: 'Brand Fake',
      category_id: 'category_id_fake',
    });

    const specification = await specificationRepositoryInMemory.create({
      name: 'Name Test',
      description: 'Description Test',
    });

    const specification_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_id,
    });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
