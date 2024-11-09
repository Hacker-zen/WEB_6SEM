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
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
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

@ApiTags('order-item')
@Controller('api/order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @ApiOperation({
    summary: 'Create a order item',
    description:
      'If you want to create a new order item, use this route. It takes a request body',
  })
  @ApiCreatedResponse({ description: 'order item created' })
  @ApiNotFoundResponse({ description: 'order item not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({
    description: 'not authorized to create order item',
  })
  @ApiForbiddenResponse({ description: 'forbidden to create order item' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @ApiBody({
    type: CreateOrderItemDto,
    description: 'order item structure',
  })
  @Post()
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemService.create(createOrderItemDto);
  }

  @ApiOperation({
    summary: 'Get all order-items',
    description:
      'If you want to get all the order items, use this route. It takes no path or query params',
  })
  @ApiNoContentResponse({ description: 'no content' })
  @ApiNotFoundResponse({ description: 'order-items not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({
    description: 'not authorized to find all order items',
  })
  @ApiForbiddenResponse({ description: 'forbidden to find all order items' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.orderItemService.findAll(pageOptionsDto);
  }

  @ApiOperation({
    summary: 'Find one order-item by id',
    description:
      'If you want to find a order item by id, use this route. It takes query params order item id',
  })
  @ApiNoContentResponse({ description: 'no content' })
  @ApiNotFoundResponse({ description: 'order-item not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'not authorized to find order item' })
  @ApiForbiddenResponse({ description: 'forbidden to find order item' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderItemService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update order-item',
    description: 'If you want to update the order item, use this route',
  })
  @ApiOkResponse({ description: 'order-item updated' })
  @ApiNotFoundResponse({ description: 'order-item not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({
    description: 'not authorized to update order item',
  })
  @ApiForbiddenResponse({ description: 'forbidden to update order item' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({
    type: UpdateOrderItemDto,
    description: 'order item structure',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemService.update(id, updateOrderItemDto);
  }

  @ApiOperation({
    summary: 'Delete order-item',
    description:
      'If you want to delete the order item, use this route with param is order item id',
  })
  @ApiOkResponse({ description: 'order-item deleted' })
  @ApiNotFoundResponse({ description: 'order-item not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({
    description: 'not authorized to delete order item',
  })
  @ApiForbiddenResponse({ description: 'forbidden to delete order item' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItemService.delete(id);
  }
}
