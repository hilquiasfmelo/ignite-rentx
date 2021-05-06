import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/interfaces/ICarsRepository';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private carsRepositories: Repository<Car>;

  constructor() {
    this.carsRepositories = getRepository(Car);
  }

  async create({
    id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.carsRepositories.create({
      id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
    });

    await this.carsRepositories.save(car);

    return car;
  }

  async findById(car_id: string): Promise<Car> {
    const car = await this.carsRepositories.findOne(car_id);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.carsRepositories.findOne({
      where: { license_plate },
    });

    return car;
  }

  async findAvailable(
    name?: string,
    brand?: string,
    category_id?: string,
  ): Promise<Car[]> {
    const carsQuery = this.carsRepositories
      .createQueryBuilder('car')
      .where('available = :available', { available: true });

    if (name) {
      carsQuery.andWhere('car.name = :name', { name });
    }

    if (brand) {
      carsQuery.andWhere('car.brand = :brand', { brand });
    }

    if (category_id) {
      carsQuery.andWhere('car.category_id = :category_id', { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }
}

export { CarsRepository };
