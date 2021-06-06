import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory,
    );
  });

  // Deve ser possível criar um novo aluguel
  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Test',
      description: 'Car Test',
      daily_rate: 100,
      license_plate: 'Test',
      fine_amount: 40,
      brand: 'Test',
      category_id: '1234',
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '365214',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  // Não deve ser possível registrar um novo aluguel se já houver um aberto para o mesmo usuário
  it('should not be possible to register a new rental if there is already an open one for the same user', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: 'test',
      expected_return_date: dayAdd24Hours,
      user_id: '123',
    });

    await expect(
      createRentalUseCase.execute({
        car_id: 'test',
        user_id: '52525',
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError('Car is unavailable'));
  });

  // Não deve ser possível registrar uma nova locação se já houver uma vaga para o mesmo carro
  it('should not be possible to register a new rental if there is already an open for the same car', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '1111',
      expected_return_date: dayAdd24Hours,
      user_id: '123',
    });

    await expect(
      createRentalUseCase.execute({
        car_id: '121212',
        user_id: '123',
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"));
  });

  // Não deve ser possível registrar um novo aluguel com tempo de devolução inválido
  it('should not be possible to register a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: 'car_test',
        user_id: '123',
        expected_return_date: dayjs().toDate(),
      }),
    ).rejects.toEqual(new AppError('Invalid return time!'));
  });
});
