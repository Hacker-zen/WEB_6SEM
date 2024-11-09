import { Controller, Get, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiNotImplementedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateMessageDto } from './dto/create-message.dto';

@ApiTags('message')
@Controller('api/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiOperation({
    summary: 'Create a message',
    description:
      'If admin want to create a new message, use this route. It takes a request body',
  })
  @ApiCreatedResponse({ description: 'message created' })
  @ApiNotFoundResponse({ description: 'message not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({
    description: 'not authorized to create message',
  })
  @ApiForbiddenResponse({ description: 'forbidden to create message ' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @ApiBody({
    type: CreateMessageDto,
    description: 'message structure',
  })
  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
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
    return this.messageService.findAll();
  }
}
