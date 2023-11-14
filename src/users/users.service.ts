import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly usersRepository: Repository<User>, 
  ) {}

  async findUserById(id: number) {
    return await this.usersRepository.findOneBy({
      id: id
    })
  }

  async uploadAvatar(avatar: string, id: number)
  {
    return await this.usersRepository.update(id, {
      avatar: avatar
    })
  }
}
