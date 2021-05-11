import dayjs from 'dayjs';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
    );
  });

  // Deve ser possível criar um novo aluguel
  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '145236',
      user_id: '365214',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  // Não deve ser possível registrar um novo aluguel se já houver um aberto para o mesmo usuário
  it('should not be possible to register a new rental if there is already an open one for the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '12123',
        user_id: '52525',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        car_id: '12123',
        user_id: '52525',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  // Não deve ser possível registrar uma nova locação se já houver uma vaga para o mesmo carro
  it('should not be possible to register a new rental if there is already an open for the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'car_test',
        user_id: '123',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        car_id: 'car_test',
        user_id: '321',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  // Não deve ser possível registrar um novo aluguel com tempo de devolução inválido
  it('should not be possible to register a new rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'car_test',
        user_id: '123',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
