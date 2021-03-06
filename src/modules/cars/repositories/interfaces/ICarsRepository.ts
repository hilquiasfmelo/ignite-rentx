import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

interface ICarsRepository {
  create({
    id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car>;

  findById(car_id: string): Promise<Car>;

  findByLicensePlate(license_plate: string): Promise<Car>;

  findAvailable(
    name?: string,
    brand?: string,
    category_id?: string,
  ): Promise<Car[]>;

  updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
