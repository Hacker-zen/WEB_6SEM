import { ApiProperty } from '@nestjs/swagger';
import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  quantity: number;

  @ApiProperty()
  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  cart: Cart;

  @ApiProperty()
  @ManyToOne(() => Product)
  product: Product;
}
