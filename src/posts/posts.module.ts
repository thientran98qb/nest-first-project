import { Logger, Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { IPostRepository, PostRepository } from './posts.repository';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostRepository])],
  controllers: [PostsController],
  providers: [
    PostsService,
    Logger,
    {
      provide: IPostRepository,
      useClass: PostRepository,
    },
  ],
  exports: [PostsService],
})
export class PostsModule {}
