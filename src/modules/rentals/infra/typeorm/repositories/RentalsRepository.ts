import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/interfaces/IRentalsRepository';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private rentalsRepository: Repository<Rental>;

  constructor() {
    this.rentalsRepository = getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = this.rentalsRepository.findOne({ car_id });

    return openByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = this.rentalsRepository.findOne({ user_id });

    return openByUser;
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    await this.rentalsRepository.save(rental);

    return rental;
  }
}

export { RentalsRepository };
