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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
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
@ApiBearerAuth()
@ApiTags('order')
@Controller('api/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({
    summary: 'Create a order',
    description:
      'If you want to create a new order, use this route. It takes a request body',
  })
  @ApiCreatedResponse({ description: 'order created' })
  @ApiNotFoundResponse({ description: 'order not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({
    description: 'not authorized to create order',
  })
  @ApiForbiddenResponse({ description: 'forbidden to create order ' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @ApiBody({
    type: CreateOrderDto,
    description: 'order structure',
  })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @ApiOperation({
    summary: 'Get all orders',
    description:
      'If you want to get all the orders, use this route. It takes no path or query params',
  })
  @ApiNoContentResponse({ description: 'no content response' })
  @ApiNotFoundResponse({ description: 'orders not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({
    description: 'not authorized to find all orders',
  })
  @ApiForbiddenResponse({ description: 'forbidden to find all orders' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @ApiOperation({
    summary: 'Find one order by id',
    description:
      'If you want to find a order by id, use this route. It takes query params order id',
  })
  @ApiNoContentResponse({ description: 'no content' })
  @ApiNotFoundResponse({ description: 'order not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'not authorized to find order ' })
  @ApiForbiddenResponse({ description: 'forbidden to find order ' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update order',
    description: 'If you want to update the order, use this route',
  })
  @ApiOkResponse({ description: 'order updated' })
  @ApiNotFoundResponse({ description: 'order not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({
    description: 'not authorized to update order',
  })
  @ApiForbiddenResponse({ description: 'forbidden to update order' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({
    type: UpdateOrderDto,
    description: 'order structure',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @ApiOperation({
    summary: 'Delete order',
    description:
      'If you want to delete the order, use this route with param is order id',
  })
  @ApiOkResponse({ description: 'order deleted' })
  @ApiNotFoundResponse({ description: 'order not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({
    description: 'not authorized to delete order ',
  })
  @ApiForbiddenResponse({ description: 'forbidden to delete order ' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.delete(id);
  }
}
