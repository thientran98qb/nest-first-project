import { Module } from '@nestjs/common';
import { DatabaseModule } from './databases/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EnvModule } from './config/env/env.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    DatabaseModule,
    AuthModule,
    EnvModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
