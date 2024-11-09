import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiNotImplementedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PageOptionsDto } from 'src/pagnition/page-option.dto';

@ApiTags('cart-item')
@Controller('api/cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @ApiOperation({
    summary: 'Create cart-item',
    description:
      'If you want to create a new cart-item, use this route. It takes a request body',
  })
  @ApiCreatedResponse({ description: 'cart-item created' })
  @ApiNotFoundResponse({ description: 'cart-items not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({
    description: 'not authorized to create cart-item',
  })
  @ApiForbiddenResponse({ description: 'forbidden to create cart-item' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @ApiBody({
    type: CreateCartItemDto,
    description: 'cart-item structure',
  })
  @Post()
  create(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemService.create(createCartItemDto);
  }

  @ApiOperation({
    summary: 'Get all cart-items',
    description:
      'If you want to get all the cart-items, use this route. It takes no path or query params',
  })
  @ApiNoContentResponse({ description: 'no content response' })
  @ApiNotFoundResponse({ description: 'cart-items not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'not authorized to find' })
  @ApiForbiddenResponse({ description: 'forbidden to find' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.cartItemService.findAll(pageOptionsDto);
  }

  @ApiOperation({
    summary: 'Find one cart-item by id',
    description:
      'If you want to find a cart-item by id, use this route. It takes query params cart-item id',
  })
  @ApiNoContentResponse({ description: 'no content response' })
  @ApiNotFoundResponse({ description: 'cart-item not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'not authorized to find cart-item' })
  @ApiForbiddenResponse({ description: 'forbidden to find cart-item' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartItemService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update cart-item',
    description: 'If you want to update the cart-items, use this route',
  })
  @ApiOkResponse({ description: 'cart-item updated' })
  @ApiNotFoundResponse({ description: 'cart-item not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({
    description: 'not authorized to update cart-item',
  })
  @ApiForbiddenResponse({ description: 'forbidden to update cart-item' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({
    type: UpdateCartItemDto,
    description: 'cart-item structure',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartItemService.update(id, updateCartItemDto);
  }

  @ApiOperation({
    summary: 'Delete cart-item',
    description:
      'If you want to delete the cart-item, use this route with param is cart-item id',
  })
  @ApiOkResponse({ description: 'cart-item deleted' })
  @ApiNotFoundResponse({ description: 'cart-item not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({
    description: 'not authorized to delete cart-item',
  })
  @ApiForbiddenResponse({ description: 'forbidden to delete cart-item' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartItemService.delete(id);
  }
}
