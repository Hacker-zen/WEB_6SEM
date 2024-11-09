import { ApiProperty } from '@nestjs/swagger';
import { CartItem } from 'src/cart-item/entities/cart-item.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Column,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @ApiProperty()
  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    onDelete: 'CASCADE',
  })
  cartItems: CartItem[];

  @ApiProperty()
  @Column('decimal')
  totalPrice: number;
}
