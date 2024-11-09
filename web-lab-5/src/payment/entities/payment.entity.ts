import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/order/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PaymentMethod } from 'src/payment/enum/paymentMethod.enum';
import { PaymentStatus } from 'src/payment/enum/paymentStatus.enum';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.cash,
  })
  paymentMethod: PaymentMethod;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.created,
  })
  paymentStatus: PaymentStatus;

  @ApiProperty()
  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  order: Order;

  @ApiProperty()
  @Column()
  amount: number;
}
