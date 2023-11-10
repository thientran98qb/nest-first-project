import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { EnvModule } from '../config/env/env.module';

@Global()
@Module({
  imports: [EnvModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
