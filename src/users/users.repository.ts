import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export interface IUserRepository {
  findUser(option?: any): Promise<any>;
  save(data: any): Promise<any>;
  update(
    where: Record<string, number>,
    data: Record<string, string>,
  ): Promise<any>;
}

export const IUserRepository = Symbol('IUserRepository');

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findUser(option?: any): Promise<any> {
    return this.repository.findOneBy(option);
  }

  async save(data: any): Promise<any> {
    return this.repository.save(data);
  }

  async update(
    where: Record<string, string | number>,
    data: Record<string, string>,
  ): Promise<any> {
    return this.repository.update(where, data);
  }
}
