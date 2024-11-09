import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
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
import { SuccessResponse } from 'src/extra/success-response';
import { ResponseError } from 'src/extra/error-response';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({
    summary: 'Create a order',
    description:
      'If you want to create a new order, use this route. It takes a request body',
  })
  @ApiCreatedResponse({ description: 'order created', type: CreateOrderDto })
  @ApiNotFoundResponse({ description: 'order not found', type: ResponseError })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to create order',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to create order ',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
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
  @ApiNoContentResponse({
    description: 'no content response',
    type: ResponseError,
  })
  @ApiNotFoundResponse({ description: 'orders not found', type: ResponseError })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to find all orders',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to find all orders',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @ApiOperation({
    summary: 'Find one order by id',
    description:
      'If you want to find a order by id, use this route. It takes query params order id',
  })
  @ApiNoContentResponse({ description: 'no content', type: ResponseError })
  @ApiNotFoundResponse({ description: 'order not found', type: ResponseError })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to find order ',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to find order ',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update order',
    description: 'If you want to update the order, use this route',
  })
  @ApiOkResponse({ description: 'order updated', type: ResponseError })
  @ApiNotFoundResponse({ description: 'order not found', type: ResponseError })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to update order',
  })
  @ApiForbiddenResponse({
    description: 'forbidden to update order',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({
    type: UpdateOrderDto,
    description: 'order structure',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @ApiOperation({
    summary: 'Delete order',
    description:
      'If you want to delete the order, use this route with param is order id',
  })
  @ApiOkResponse({ description: 'order deleted', type: SuccessResponse })
  @ApiNotFoundResponse({ description: 'order not found', type: ResponseError })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to delete order ',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to delete order ',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.orderService.remove(+id);
    return new SuccessResponse('ok');
  }
}
