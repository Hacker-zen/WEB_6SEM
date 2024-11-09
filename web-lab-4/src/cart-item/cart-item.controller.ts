import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
import { ResponseError } from 'src/extra/error-response';
import { SuccessResponse } from 'src/extra/success-response';

@ApiTags('cart-item')
@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @ApiOperation({
    summary: 'Create cart-item',
    description:
      'If you want to create a new cart-item, use this route. It takes a request body',
  })
  @ApiCreatedResponse({
    description: 'cart-item created',
    type: CreateCartItemDto,
  })
  @ApiNotFoundResponse({
    description: 'cart-items not found',
    type: ResponseError,
  })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to create cart-item',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to create cart-item',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
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
  @ApiNoContentResponse({
    description: 'no content response',
    type: ResponseError,
  })
  @ApiNotFoundResponse({
    description: 'cart-items not found',
    type: ResponseError,
  })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to find',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to find',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
  @Get()
  findAll() {
    return this.cartItemService.findAll();
  }

  @ApiOperation({
    summary: 'Find one cart-item by id',
    description:
      'If you want to find a cart-item by id, use this route. It takes query params cart-item id',
  })
  @ApiNoContentResponse({
    description: 'no content response',
    type: ResponseError,
  })
  @ApiNotFoundResponse({
    description: 'cart-item not found',
    type: ResponseError,
  })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to find cart-item',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to find cart-item',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartItemService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update cart-item',
    description: 'If you want to update the cart-items, use this route',
  })
  @ApiOkResponse({ description: 'cart-item updated', type: UpdateCartItemDto })
  @ApiNotFoundResponse({
    description: 'cart-item not found',
    type: ResponseError,
  })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to update cart-item',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to update cart-item',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
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
    return this.cartItemService.update(+id, updateCartItemDto);
  }

  @ApiOperation({
    summary: 'Delete cart-item',
    description:
      'If you want to delete the cart-item, use this route with param is cart-item id',
  })
  @ApiOkResponse({ description: 'cart-item deleted', type: SuccessResponse })
  @ApiNotFoundResponse({
    description: 'cart-item not found',
    type: ResponseError,
  })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to delete cart-item',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to delete cart-item',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.cartItemService.remove(+id);
    return new SuccessResponse('ok');
  }
}
