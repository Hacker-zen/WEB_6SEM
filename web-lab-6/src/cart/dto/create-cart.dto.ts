import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { CreateCartItemDto } from 'src/cart-item/dto/create-cart-item.dto';

export class CreateCartDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty({ type: () => [CreateCartItemDto] })
  @IsArray()
  cartItems: CreateCartItemDto[];
}
