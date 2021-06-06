import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  // Deve ser possível criar um novo carro
  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Fake',
      description: 'Description Fake',
      daily_rate: 0,
      license_plate: 'Plate Fake',
      fine_amount: 0,
      brand: 'Brand Fake',
      category_id: 'category_id_fake',
    });

    expect(car).toHaveProperty('id');
  });

  // Não deve ser possível cadastrar um carro com a placa já existente
  it('not should be able to register a car with the existing license plate', async () => {
    await createCarUseCase.execute({
      name: 'Car Fake 1',
      description: 'Description Fake',
      daily_rate: 0,
      license_plate: 'Plate Fake',
      fine_amount: 0,
      brand: 'Brand Fake',
      category_id: 'category_id_fake',
    });

    await expect(
      createCarUseCase.execute({
        name: 'Car Fake 2',
        description: 'Description Fake',
        daily_rate: 0,
        license_plate: 'Plate Fake',
        fine_amount: 0,
        brand: 'Brand Fake',
        category_id: 'category_id_fake',
      }),
    ).rejects.toEqual(new AppError('Car already exists.'));
  });

  // Deve ser possível criar um carro com disponibilidade por padrão
  it('should be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Available',
      description: 'Description Available',
      daily_rate: 0,
      license_plate: 'Plate Available',
      fine_amount: 0,
      brand: 'Brand Available',
      category_id: 'category_id_available',
    });

    expect(car.available).toBe(true);
  });
});
