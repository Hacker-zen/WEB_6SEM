import { CreateOrderItemDto } from 'src/order-item/dto/create-order-item.dto';
import { OrderStatus } from '../orderStatus.enum';

export class CreateOrderDto {
  id: string;
  userId: string;
  orderStatus: OrderStatus;
  totalPrice: number;
  orderItems: CreateOrderItemDto[];
}
