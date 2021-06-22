import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { IUsersTokensRepository } from '@modules/accounts/repositories/interfaces/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/interfaces/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  refresh_token: string;
  token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const {
      expires_in_refresh_token,
      secret_refresh_token,
      expires_refresh_token_days,
    } = auth;

    const { email, sub } = verify(token, secret_refresh_token) as IPayload;

    const user_id = sub;

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token,
    );

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!');
    }

    // Remove o antigo refresh token que existia na base de dados
    await this.usersTokensRepository.deleteById(userToken.id);

    /** Recria novamente um novo refresh token */
    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days,
    );

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: sub,
      expiresIn: expires_in_refresh_token,
    });

    await this.usersTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id: sub,
    });

    // Cria um novo token
    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    return {
      refresh_token,
      token: newToken,
    };

    /** ----- */
  }
}

export { RefreshTokenUseCase };
