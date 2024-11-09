import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimingInterceptor } from './interceptors/timing.interceptor';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // adding timing interceptor to get response time of server
      provide: APP_INTERCEPTOR,
      useClass: TimingInterceptor,
    },
  ],
})
export class AppModule {}
