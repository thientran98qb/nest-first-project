import { Global, Module } from '@nestjs/common';
import { HelperService } from './helpers.service';

@Global()
@Module({
  providers: [HelperService],
  exports: [HelperService]
})
export class HelpersModule {}
