import { Category } from '@modules/cars/entities/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '@modules/cars/repositories/interfaces/ICategoriesRepository';
import { getRepository, Repository } from 'typeorm';

class CategoriesRepository implements ICategoriesRepository {
  private categoriesRepository: Repository<Category>;

  constructor() {
    this.categoriesRepository = getRepository(Category);
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: { name },
    });

    return category;
  }

  async index(): Promise<Category[]> {
    const categories = await this.categoriesRepository.find();

    return categories;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.categoriesRepository.create({
      name,
      description,
    });

    await this.categoriesRepository.save(category);
  }
}

export { CategoriesRepository };
