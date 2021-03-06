import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
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

  // Checks whether the token exists
  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  // Performs the separation of the token in two parts taking only the token itself
  const [, token] = authHeader.split(' ');

  try {
    // Checks whether the token matches the secret
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

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
