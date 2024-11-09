import { Order } from 'src/order/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  paymentMethod: string;

  @Column()
  paymentStatus: string;

  @ManyToOne(() => Order)
  order: Order;

  @Column()
  amount: number;
}
