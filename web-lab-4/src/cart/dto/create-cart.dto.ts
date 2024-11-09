import { ApiProperty } from '@nestjs/swagger';
import { CreateCartItemDto } from 'src/cart-item/dto/create-cart-item.dto';

export class CreateCartDto {
  @ApiProperty()
  userId: string;

  @ApiProperty({ type: () => [CreateCartItemDto] })
  items: CreateCartItemDto[];
}
