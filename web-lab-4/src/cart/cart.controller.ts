import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
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

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({
    summary: 'Create cart',
    description:
      'If you want to create a new cart, use this route. It takes a request body',
  })
  @ApiCreatedResponse({ description: 'cart created', type: CreateCartDto })
  @ApiNotFoundResponse({ description: 'carts not found', type: ResponseError })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to create cart',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to create cart',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
  @ApiBody({
    type: CreateCartDto,
    description: 'cart structure',
  })
  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @ApiOperation({
    summary: 'Get all carts',
    description:
      'If you want to get all the carts, use this route. It takes no path or query params',
  })
  @ApiNoContentResponse({
    description: 'no content response',
    type: ResponseError,
  })
  @ApiNotFoundResponse({ description: 'carts not found', type: ResponseError })
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
    return this.cartService.findAll();
  }

  @ApiOperation({
    summary: 'Find one cart by id',
    description:
      'If you want to find a cart by id, use this route. It takes query params cart id',
  })
  @ApiNoContentResponse({
    description: 'no content response',
    type: ResponseError,
  })
  @ApiNotFoundResponse({ description: 'cart not found', type: ResponseError })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to find cart',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to find cart',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update cart',
    description: 'If you want to update the carts, use this route',
  })
  @ApiOkResponse({ description: 'cart updated', type: UpdateCartDto })
  @ApiNotFoundResponse({ description: 'cart not found', type: ResponseError })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to update cart',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to update cart',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({
    type: UpdateCartDto,
    description: 'cart structure',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @ApiOperation({
    summary: 'Delete cart',
    description:
      'If you want to delete the cart, use this route with param is cart id',
  })
  @ApiOkResponse({ description: 'cart deleted', type: SuccessResponse })
  @ApiNotFoundResponse({ description: 'cart not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'not authorized to delete cart' })
  @ApiForbiddenResponse({ description: 'forbidden to delete cart' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.cartService.remove(+id);
    return new SuccessResponse('ok');
  }
}
