import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>;
  index(): Promise<Specification[]>;
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
