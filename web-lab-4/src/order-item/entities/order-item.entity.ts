import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  quantity: number;

  @ApiProperty()
  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @ApiProperty()
  @ManyToOne(() => Product)
  product: Product;
}
