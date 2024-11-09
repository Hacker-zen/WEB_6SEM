import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItem } from './entities/cart-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    private productService: ProductService,
  ) {}

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    const product = await this.productService.findOne(
      createCartItemDto.productId,
    );
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const cartItem = this.cartItemRepository.create(createCartItemDto);
    cartItem.product = product;

    await this.cartItemRepository.save(cartItem);
    return cartItem;
  }

  async findAll(): Promise<CartItem[]> {
    return this.cartItemRepository.find();
  }

  async findOne(id: string): Promise<CartItem | undefined> {
    return await this.cartItemRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOneBy({ id });
    if (!cartItem) {
      throw new NotFoundException('Order item not found');
    }

    // Handle optional product update
    if (updateCartItemDto.productId) {
      const product = await this.productService.findOne(
        updateCartItemDto.productId,
      );
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      cartItem.product = product;
    }

    if (updateCartItemDto.quantity) {
      cartItem.quantity = updateCartItemDto.quantity;
    }

    await this.cartItemRepository.save(cartItem);
    return cartItem;
  }

  async delete(id: string): Promise<void> {
    const cartItem = await this.cartItemRepository.findOneBy({ id });
    if (!cartItem) {
      throw new NotFoundException('Order item not found');
    }

    await this.cartItemRepository.delete(cartItem);
  }
}
