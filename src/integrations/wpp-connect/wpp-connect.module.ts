import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { WppConnectService } from './wpp-connect.service';
import { WppConnectController } from './wpp-connect.controller';

@Module({
  imports: [HttpModule],
  controllers: [WppConnectController],
  providers: [WppConnectService],
  exports: [WppConnectService],
})
export class WppConnectModule {}
