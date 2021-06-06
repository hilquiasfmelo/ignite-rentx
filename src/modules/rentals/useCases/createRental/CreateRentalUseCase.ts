import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/interfaces/ICarsRepository';
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/interfaces/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/interfaces/IDateProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    // Inicializando a hora mínima do aluguel
    const minimumHour = 24;

    // It should not be possible to register a new rental if there is already an open for the same car
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id,
    );

    if (carUnavailable) {
      throw new AppError('Car is unavailable');
    }

    // It should not be possible to register a new rental if there is already an open one for the same user
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id,
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!");
    }

    /** The rental must have a minimum duration of 24 hours */
    const dateNow = this.dateProvider.dateNow();

    // Compara as horas que foram geradas convertidas em UTC
    const compare = this.dateProvider.compareInHours(
      expected_return_date,
      dateNow,
    );

    // Compara se o aluguel feito já passou das 24 hrs
    if (compare < minimumHour) {
      throw new AppError('Invalid return time!');
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    // Add false for an disponibility of car
    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
