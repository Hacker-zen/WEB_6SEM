import { ApiProperty } from '@nestjs/swagger';

export class CreateCartItemDto {
  @ApiProperty()
  cartId: string;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  quantity: number;
}
