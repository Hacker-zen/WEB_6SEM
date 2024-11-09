import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { OrderStatus } from 'src/order/orderStatus.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('decimal')
  totalPrice: number;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.created,
  })
  orderStatus: OrderStatus;

  @ApiProperty()
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @ApiProperty()
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    onDelete: 'CASCADE',
  })
  orderItems: OrderItem[];
}
