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
    const openByCar = this.rentalsRepository.findOne({
      where: {
        car_id,
        end_date: null,
      },
    });

    return openByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = this.rentalsRepository.findOne({
      where: {
        user_id,
        end_date: null,
      },
    });

    return openByUser;
  }

  async create({
    id,
    car_id,
    user_id,
    expected_return_date,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.rentalsRepository.create({
      id,
      car_id,
      user_id,
      expected_return_date,
      end_date,
      total,
    });

    await this.rentalsRepository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.rentalsRepository.findOne(id);

    return rental;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rental = await this.rentalsRepository.find({
      where: { user_id },
      relations: ['car'],
    });

    return rental;
  }
}

export { RentalsRepository };
