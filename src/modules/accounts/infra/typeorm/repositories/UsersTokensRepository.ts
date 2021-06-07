import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/interfaces/IUsersTokensRepository';

import { UserTokens } from '../entities/UserTokens';

class UsersTokensRepository implements IUsersTokensRepository {
  private userTokensRepository: Repository<UserTokens>;

  constructor() {
    this.userTokensRepository = getRepository(UserTokens);
  }

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.userTokensRepository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    await this.userTokensRepository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens> {
    const usersToken = await this.userTokensRepository.findOne({
      user_id,
      refresh_token,
    });

    return usersToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.userTokensRepository.delete(id);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = await this.userTokensRepository.findOne({
      refresh_token,
    });
    return userToken;
  }
}

export { UsersTokensRepository };
