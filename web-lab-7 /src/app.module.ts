import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
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
import { AllExceptionsFilter } from './exceptionFilter/exceptionFilter.filter';
import { AuthModule } from './auth/auth.module';
import { AppGateway } from './app/gateway/app.gateway';
import { MessageModule } from './chat/message.module';

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
    AuthModule.forRoot({
      // These are the connection details of the app you created on supertokens.com
      connectionURI: process.env.CONNECTION_URI,
      apiKey: process.env.API_KEY,
      appInfo: {
        // Learn more about this on https://supertokens.com/docs/emailpassword/appinfo
        appName: 'web-shop',
        apiDomain: process.env.BASE_URL,
        websiteDomain: process.env.BASE_URL,
        apiBasePath: process.env.API_BASE_PATH,
        websiteBasePath: process.env.WEBSITE_BASE_PATH,
      },
    }),
    MessageModule,
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
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    AppGateway,
  ],
})
export class AppModule {}
