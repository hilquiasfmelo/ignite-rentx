import { UsersRepository } from '@modules/accounts/repositories/implementations/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository';
import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/repositories/implementations/SpecificationsRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/interfaces/ICategoriesRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/interfaces/ISpecificationsRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);
