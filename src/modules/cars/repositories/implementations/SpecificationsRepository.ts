import { getRepository, Repository } from 'typeorm';

import { Specification } from '../../entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

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

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.specificationsRespository.create({
      name,
      description,
    });

    await this.specificationsRespository.save(specification);
  }
}

export { SpecificationsRepository };