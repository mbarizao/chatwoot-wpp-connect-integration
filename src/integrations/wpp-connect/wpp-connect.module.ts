import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { WppConnectService } from './wpp-connect.service';
import { WppConnectController } from './wpp-connect.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Integration } from 'src/entities';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Integration])],
  controllers: [WppConnectController],
  providers: [WppConnectService],
  exports: [WppConnectService],
})
export class WppConnectModule {}
