import { CreateCartItemDto } from 'src/cart-item/dto/create-cart-item.dto';

export class CreateCartDto {
  userId: string;
  items: CreateCartItemDto[];
}
