import { container } from 'tsyringe';

import { DayjsDateProvider } from '../implementations/DayjsDateProvider';
import { IDateProvider } from '../interfaces/IDateProvider';

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
);
