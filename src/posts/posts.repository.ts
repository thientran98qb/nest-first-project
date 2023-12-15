import { Injectable } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export interface IPostRepository {
  list(): Promise<any>;
  save(data: any): Promise<any>;
}

export const IPostRepository = Symbol('IPostRepository');

@Injectable()
export class PostRepository implements IPostRepository {
  constructor(
    @InjectRepository(Post)
    private readonly repository: Repository<Post>,
  ) {}

  async list() {
    return await this.repository.find({});
  }
  async save(data: any) {
    return await this.repository.save(data);
  }
}
