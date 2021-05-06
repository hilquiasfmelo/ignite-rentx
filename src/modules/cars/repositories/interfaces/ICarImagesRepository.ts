import { ICarImagesDTO } from '@modules/cars/dtos/ICarImagesDTO';
import { CarImages } from '@modules/cars/infra/typeorm/entities/CarImages';

interface ICarImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImages>;
}
export { ICarImagesRepository };
