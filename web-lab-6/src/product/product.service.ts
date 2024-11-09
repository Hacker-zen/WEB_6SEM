import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoryService: CategoryService,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const category = await this.categoryService.findOne(
      createProductDto.categoryId,
    );
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const product = this.productRepository.create(createProductDto);
    product.category = category;
    await this.productRepository.save(product);
    return product;
  }

  async findAll(): Promise<Product[]> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category');

    const products = queryBuilder.getMany();
    return products;
  }

  async findOne(id: string): Promise<Product | undefined> {
    const queryBuilder = await this.productRepository
      .createQueryBuilder('product')
      .where('product.id = :id', { id: id })
      .leftJoinAndSelect('product.category', 'category');

    const products = queryBuilder.getOne();
    return products;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (updateProductDto.categoryId) {
      const category = await this.categoryService.findOne(
        updateProductDto.categoryId,
      );
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      product.category = category;
    }

    if (updateProductDto.description) {
      product.description = updateProductDto.description;
    }

    if (updateProductDto.imageUrl) {
      product.imageUrl = updateProductDto.imageUrl;
    }

    if (updateProductDto.name) {
      product.name = updateProductDto.name;
    }

    if (updateProductDto.price) {
      product.price = updateProductDto.price;
    }

    await this.productRepository.save(product);
    return product;
  }

  async delete(id: string): Promise<void> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.delete(product);
  }
}
