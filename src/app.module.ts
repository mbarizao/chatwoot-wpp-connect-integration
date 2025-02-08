import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import configuration from './config';
import { WppConnectModule } from './integrations/wpp-connect/wpp-connect.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
    WppConnectModule,
  ],
  providers: [],
})
export class AppModule {}
