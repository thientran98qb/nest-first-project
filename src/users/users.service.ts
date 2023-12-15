import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository, UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly usersRepository: IUserRepository,
  ) {}

  async findUserById(id: number) {
    return await this.usersRepository.findUser(id);
  }

  async uploadAvatar(avatar: string, id: number) {
    return await this.usersRepository.update(
      { id },
      {
        avatar: avatar,
      },
    );
  }
}
