import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/interfaces/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/interfaces/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/interfaces/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalRepository: IRentalsRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);

    const minimum_daily = 1;

    if (!rental) {
      throw new AppError('Rental does not exists');
    }

    /* Verificar o tempo de aluguel */

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

    if (daily <= 0) {
      daily = minimum_daily;
    }

    // Calcula os dias de atraso
    const delayDays = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date,
    );

    // Calcula o valor da multa
    let calculate_fine = 0;
    if (delayDays > 0) {
      calculate_fine = delayDays * car.fine_amount;
    }

    // Calcula o valor da multa + o valor da diária
    calculate_fine += daily * car.daily_rate;

    const total = calculate_fine;

    rental.end_date = dateNow;
    rental.total = total;

    await this.rentalRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
