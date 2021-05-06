import { getRepository, Repository } from 'typeorm';

import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '@modules/cars/repositories/interfaces/ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specificationsRespository: Repository<Specification>;

  constructor() {
    this.specificationsRespository = getRepository(Specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.specificationsRespository.findOne({
      where: { name },
    });

    return specification;
  }

  async index(): Promise<Specification[]> {
    const specifications = await this.specificationsRespository.find();

    return specifications;
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.specificationsRespository.create({
      name,
      description,
    });

    await this.specificationsRespository.save(specification);

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.specificationsRespository.findByIds(ids);

    return specifications;
  }
}

export { SpecificationsRepository };
