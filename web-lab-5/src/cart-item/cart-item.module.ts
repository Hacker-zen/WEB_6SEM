import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { CartItem } from './entities/cart-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem]), ProductModule],
  controllers: [CartItemController],
  providers: [CartItemService],
  exports: [TypeOrmModule, CartItemService],
})
export class CartItemModule {}