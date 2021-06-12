import { Router } from 'express';

import { ResetPasswordUserController } from '@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController';
import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

const passwordRoutes = Router();

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);
passwordRoutes.post('/reset', resetPasswordUserController.handle);

export { passwordRoutes };
