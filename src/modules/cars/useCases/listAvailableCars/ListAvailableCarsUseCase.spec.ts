import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  // Deve ser possível listar todos os carros disponíveis
  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Test 1',
      description: 'Descrição de Test 1',
      daily_rate: 250,
      license_plate: '5465465465',
      fine_amount: 100,
      brand: 'Car_Brand_Test',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  // Deve ser possível listar todos os carros pela nome
  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Test 3',
      description: 'Descrição de Test 3',
      daily_rate: 250,
      license_plate: '5465465465',
      fine_amount: 100,
      brand: 'Car_Brand_Test_3',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car Test 3',
    });

    expect(cars).toEqual([car]);
  });

  // Deve ser possível listar todos os carros pela marca
  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Test 2',
      description: 'Descrição de Test 2',
      daily_rate: 250,
      license_plate: '5465465465',
      fine_amount: 100,
      brand: 'Car_Brand_Test_2',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Car_Brand_Test_2',
    });

    expect(cars).toEqual([car]);
  });

  // Deve ser possível listar todos os carros pelo category_id
  it('should be able to list all available cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Test 4',
      description: 'Descrição de Test 4',
      daily_rate: 250,
      license_plate: '5465465465',
      fine_amount: 100,
      brand: 'Car_Brand_Test_4',
      category_id: 'category_id_4',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'category_id_4',
    });

    expect(cars).toEqual([car]);
  });
});
