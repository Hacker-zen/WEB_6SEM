import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { Role } from 'src/user/enum/role.enum';

@ApiBearerAuth()
@UseGuards(new AuthGuard(), RoleGuard)
@Roles(Role.user, Role.admin)
@ApiTags('cart')
@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({
    summary: 'Create cart',
    description:
      'If you want to create a new cart, use this route. It takes a request body',
  })
  @ApiCreatedResponse({ description: 'cart created' })
  @ApiNotFoundResponse({ description: 'carts not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'not authorized to create cart' })
  @ApiForbiddenResponse({ description: 'forbidden to create cart' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
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
  @ApiNoContentResponse({ description: 'no content response' })
  @ApiNotFoundResponse({ description: 'carts not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'not authorized to find' })
  @ApiForbiddenResponse({ description: 'forbidden to find' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @ApiOperation({
    summary: 'Find one cart by id',
    description:
      'If you want to find a cart by id, use this route. It takes query params cart id',
  })
  @ApiNoContentResponse({ description: 'no content response' })
  @ApiNotFoundResponse({ description: 'cart not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'not authorized to find cart' })
  @ApiForbiddenResponse({ description: 'forbidden to find cart' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update cart',
    description: 'If you want to update the carts, use this route',
  })
  @ApiOkResponse({ description: 'cart updated' })
  @ApiNotFoundResponse({ description: 'cart not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'not authorized to update cart' })
  @ApiForbiddenResponse({ description: 'forbidden to update cart' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({
    type: UpdateCartDto,
    description: 'cart structure',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(id, updateCartDto);
  }

  @ApiOperation({
    summary: 'Delete cart',
    description:
      'If you want to delete the cart, use this route with param is cart id',
  })
  @ApiOkResponse({ description: 'cart deleted' })
  @ApiNotFoundResponse({ description: 'cart not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'not authorized to delete cart' })
  @ApiForbiddenResponse({ description: 'forbidden to delete cart' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.delete(id);
  }
}
