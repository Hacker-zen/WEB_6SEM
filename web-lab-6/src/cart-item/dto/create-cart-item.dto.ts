import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateCartItemDto {
  @ApiProperty()
  @IsString()
  cartId: string;

  @ApiProperty()
  @IsString()
  productId: string;

  @ApiProperty()
  @IsInt()
  quantity: number;
}
