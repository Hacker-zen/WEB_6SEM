import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoryModule, UserModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [TypeOrmModule, ProductService],
})
export class ProductModule {}
