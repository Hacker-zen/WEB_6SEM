import { CreateOrderItemDto } from 'src/order-item/dto/create-order-item.dto';
import { OrderStatus } from '../orderStatus.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  orderStatus: OrderStatus;

  @ApiProperty({ type: () => [CreateOrderItemDto] })
  @IsArray()
  orderItems: CreateOrderItemDto[];
}
