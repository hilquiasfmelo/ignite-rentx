import { UpdateUserAvatarUseCase } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UpdateUserAvatarController {
  async hanlde(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.user;
    const avatar_file = request.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({
      user_id,
      avatar_file,
    });

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };
