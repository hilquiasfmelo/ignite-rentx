import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
}

async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  const userTokensRepository = new UsersTokensRepository();

  // Checks whether the token exists
  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  // Performs the separation of the token in two parts taking only the token itself
  const [, token] = authHeader.split(' ');

  try {
    // Checks whether the token matches the secret
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token,
    ) as IPayload;

    // Fetch the repository's user id and check if it exists
    // const usersRepository = new UsersRepository();

    const user = await userTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token,
    );

    if (!user) {
      throw new AppError('User does not exists', 401);
    }

    // Adding user_id to Express Request for global access
    request.user = {
      user_id,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid Token', 401);
  }
}

export { ensureAuthenticated };
