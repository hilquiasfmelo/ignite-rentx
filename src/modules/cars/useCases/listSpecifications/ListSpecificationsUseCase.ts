import { Specification } from '@modules/cars/entities/Specification';
import { ISpecificationsRepository } from '@modules/cars/repositories/interfaces/ISpecificationsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute(): Promise<Specification[]> {
    const specifications = await this.specificationsRepository.index();

    return specifications;
  }
}

export { ListSpecificationsUseCase };
