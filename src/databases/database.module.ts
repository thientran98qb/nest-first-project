import { Global, Module } from '@nestjs/common';
import { EnvModule } from '../config/env/env.module';
import { Post } from '../posts/entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvService } from '../config/env/env.service';
import { User } from '../users/entities/user.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (config: EnvService) => ({
        type: config.read().DB_TYPE,
        host: config.read().DB_HOST,
        port: config.read().DB_PORT,
        username: config.read().DB_USER,
        password: config.read().DB_PASSWORD,
        database: config.read().DB_NAME,
        autoLoadEntities:
          config.read().APP_ENV === 'local' || 'dev' ? true : false,
        entities: [User, Post],
        synchronize: config.read().APP_ENV === 'local' || 'dev' ? true : false,
        migrations: ['dist/db/migrations/*.js'],
        migrationsRun: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
