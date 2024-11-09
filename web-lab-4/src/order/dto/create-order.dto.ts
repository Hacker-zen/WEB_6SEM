import { CreateOrderItemDto } from 'src/order-item/dto/create-order-item.dto';
import { OrderStatus } from '../orderStatus.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  orderStatus: OrderStatus;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty({ type: () => [CreateOrderItemDto] })
  orderItems: CreateOrderItemDto[];
}
