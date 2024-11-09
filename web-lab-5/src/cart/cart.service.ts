import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItemService } from 'src/cart-item/cart-item.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { PageMetaDto } from 'src/pagnition/page-meta.dto';
import { PageOptionsDto } from 'src/pagnition/page-option.dto';
import { PageDto } from 'src/pagnition/page.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private userService: UserService,
    private cartItemService: CartItemService,
  ) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const user = await this.userService.findById(createCartDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const cart = this.cartRepository.create(createCartDto);
    cart.user = user;
    cart.totalPrice = 0; // Initialize totalPrice

    // Create cart items and update totalPrice
    const createdCartItems = await Promise.all(
      createCartDto.cartItems.map(async (cartItemDto) => {
        const cartItem = await this.cartItemService.create({
          ...cartItemDto,
          cartId: cart.id, // Assign cartId to each cart item
        });
        cart.totalPrice += cartItem.product.price * cartItem.quantity;
        return cartItem;
      }),
    );
    cart.cartItems = createdCartItems;

    await this.cartRepository.save(cart);
    return cart;
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Cart>> {
    const queryBuilder = await this.cartRepository
      .createQueryBuilder('cart')
      .skip((pageOptionsDto.page - 1) * pageOptionsDto.take || 0)
      .take(pageOptionsDto.take)
      .leftJoinAndSelect('cart.cartItems', 'cartItem')
      .leftJoinAndSelect('cartItem.product', 'product');

    const [res, total] = await queryBuilder.getManyAndCount();

    const itemCount = total;

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(res, pageMetaDto);
  }

  async findOne(id: string): Promise<Cart | undefined> {
    const queryBuilder = await this.cartRepository
      .createQueryBuilder('cart')
      .where('cart.id = :id', { id: id })
      .leftJoinAndSelect('cart.cartItems', 'cartItem')
      .leftJoinAndSelect('cartItem.product', 'product');

    return await queryBuilder.getOne();
  }

  async update(id: string, updateCartDto: UpdateCartDto): Promise<Cart> {
    const cart = await this.findOne(id);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    // Handle optional user update
    if (updateCartDto.userId) {
      const user = await this.userService.findById(updateCartDto.userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      cart.user = user;
    }

    // Handle cart items updates
    if (updateCartDto.cartItems) {
      await Promise.all(
        updateCartDto.cartItems.map(async (cartItemDto) => {
          const existingItemLine = cart.cartItems.find(
            (item) => item.product.id === cartItemDto.productId,
          );

          if (existingItemLine) {
            // Update existing cart item
            await this.cartItemService.update(existingItemLine.id, cartItemDto);
          } else {
            // Create new cart item
            const newCartItem = await this.cartItemService.create({
              ...cartItemDto,
              cartId: cart.id,
            });
            cart.cartItems.push(newCartItem);
          }
        }),
      );
    }

    cart.totalPrice = cart.cartItems.reduce(
      (acc, cartItem) => acc + cartItem.product.price * cartItem.quantity,
      0,
    );

    await this.cartRepository.save(cart);
    return cart;
  }

  async delete(id: string): Promise<void> {
    const cart = await this.cartRepository.findOneBy({ id });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    await this.cartRepository.delete(cart);
  }
}
