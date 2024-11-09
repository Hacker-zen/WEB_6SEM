import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimingInterceptor } from './interceptors/timing.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { PaymentModule } from './payment/payment.module';
import { CartItemService } from './cart-item/cart-item.service';
import * as dotenv from 'dotenv';
import { UserService } from './user/user.service';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => databaseConfig,
    }),
    UserModule,
    ProductModule,
    CategoryModule,
    CartModule,
    CartItemModule,
    OrderModule,
    OrderItemModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // adding timing interceptor to get response time of server
      provide: APP_INTERCEPTOR,
      useClass: TimingInterceptor,
    },
    CartItemService,
    UserService,
  ],
})
export class AppModule {}
