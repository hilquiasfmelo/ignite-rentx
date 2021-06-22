import { container } from 'tsyringe';

import { EtherealMailProvider } from '../implementations/EtherealMailProvider';
import { SESMailProvider } from '../implementations/SESMailProvider';
import { IMailProvider } from '../interfaces/IMailProvider';

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

// Quando usamos o registerInstance devemos realizar a instância da class na Injeção
container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.MAIL_PROVIDER],
);
