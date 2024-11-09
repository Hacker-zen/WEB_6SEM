import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
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

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({
    summary: 'Create a payment',
    description:
      'If you want to create a new payment, use this route. It takes a request body',
  })
  @ApiCreatedResponse({
    description: 'payment created',
    type: CreatePaymentDto,
  })
  @ApiNotFoundResponse({
    description: 'payments not found',
    type: ResponseError,
  })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to create payment',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to create payment',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
  @ApiBody({
    type: CreatePaymentDto,
    description: 'payment structure',
  })
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @ApiOperation({
    summary: 'Get all payments',
    description:
      'If you want to get all the payments, use this route. It takes no path or query params',
  })
  @ApiNoContentResponse({
    description: 'no content response',
    type: ResponseError,
  })
  @ApiNotFoundResponse({
    description: 'payments not found',
    type: ResponseError,
  })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to find all payments',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to find all payments',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @ApiOperation({
    summary: 'Find a payment by id',
    description:
      'If you want to find a payment by id, use this route. It takes query params payment id',
  })
  @ApiNoContentResponse({ description: 'no content', type: ResponseError })
  @ApiNotFoundResponse({
    description: 'payment not found',
    type: ResponseError,
  })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to find payment',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to find payment',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update a payment',
    description: 'If you want to update the payments, use this route',
  })
  @ApiOkResponse({ description: 'payment updated', type: UpdatePaymentDto })
  @ApiNotFoundResponse({
    description: 'payment not found',
    type: ResponseError,
  })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to update payment',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to update payment',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({
    type: UpdatePaymentDto,
    description: 'payment structure',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @ApiOperation({
    summary: 'Delete a payment',
    description:
      'If you want to delete the payment, use this route with param is payment id',
  })
  @ApiOkResponse({ description: 'payment deleted', type: SuccessResponse })
  @ApiNotFoundResponse({
    description: 'payment not found',
    type: ResponseError,
  })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to delete payment',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to delete payment',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.paymentService.remove(+id);
    return new SuccessResponse('ok');
  }
}
