import { container } from 'tsyringe';

import { DayjsDateProvider } from '../DateProvider/implementations/DayjsDateProvider';
import { IDateProvider } from '../DateProvider/interfaces/IDateProvider';
import { EtherealMailProvider } from '../MailProvider/implementations/EtherealMailProvider';
import { IMailProvider } from '../MailProvider/interfaces/IMailProvider';

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
);

// Quando usamos o registerInstance devemos realizar a instância da class na Injeção
container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider(),
);
