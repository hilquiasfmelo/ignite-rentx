import { getRepository, Repository } from 'typeorm';

import { ICarImagesDTO } from '@modules/cars/dtos/ICarImagesDTO';
import { ICarImagesRepository } from '@modules/cars/repositories/interfaces/ICarImagesRepository';

import { CarImages } from '../entities/CarImages';

class CarImagesRepository implements ICarImagesRepository {
  private carImagesRepository: Repository<CarImages>;

  constructor() {
    this.carImagesRepository = getRepository(CarImages);
  }

  async create(car_id: string, image_name: string): Promise<CarImages> {
    const carImage = this.carImagesRepository.create({
      car_id,
      image_name,
    });

    await this.carImagesRepository.save(carImage);

    return carImage;
  }
}

export { CarImagesRepository };
