import { Module, RequestMethod } from '@nestjs/common';
import { SupertokensService } from './supertokens/supertokens.service';
import { MiddlewareConsumer, NestModule, DynamicModule } from '@nestjs/common';
import { AuthMiddleware } from './auth.middleware';
import { ConfigInjectionToken, AuthModuleConfig } from './config.interface';
import { UserModule } from 'src/user/user.module';
import { SessionMiddleware } from './session.middleware';
import { OrderController } from 'src/order/order.controller';
import { CartController } from 'src/cart/cart.controller';
import { UserController } from 'src/user/user.controller';
import { ProductController } from 'src/product/product.controller';
import { CartItemController } from 'src/cart-item/cart-item.controller';
import { OrderItemController } from 'src/order-item/order-item.controller';
import { PaymentController } from 'src/payment/payment.controller';
import { CategoryController } from 'src/category/category.controller';

@Module({
  imports: [UserModule],
  providers: [SupertokensService],
  exports: [],
  controllers: [],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
    consumer
      .apply(SessionMiddleware)
      .exclude(
        { path: 'api/category', method: RequestMethod.GET },
        { path: 'api/product', method: RequestMethod.GET },
        { path: 'api/user', method: RequestMethod.POST },
      )
      .forRoutes(
        OrderController,
        CartController,
        UserController,
        ProductController,
        CartItemController,
        OrderItemController,
        PaymentController,
        CategoryController,
      );
  }

  static forRoot({
    connectionURI,
    apiKey,
    appInfo,
  }: AuthModuleConfig): DynamicModule {
    return {
      providers: [
        {
          useValue: {
            appInfo,
            connectionURI,
            apiKey,
          },
          provide: ConfigInjectionToken,
        },
        SupertokensService,
      ],
      exports: [],
      imports: [UserModule],
      module: AuthModule,
    };
  }
}
