import { Module } from '@nestjs/common';
import { DatabaseModule } from './databases/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EnvModule } from './config/env/env.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HelpersModule } from './utils/helpers.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    DatabaseModule,
    AuthModule,
    EnvModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads'
    }),
    HelpersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
