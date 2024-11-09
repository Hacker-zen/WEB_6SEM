import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/order/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  paymentMethod: string;

  @ApiProperty()
  @Column()
  paymentStatus: string;

  @ApiProperty()
  @ManyToOne(() => Order)
  order: Order;

  @ApiProperty()
  @Column()
  amount: number;
}
