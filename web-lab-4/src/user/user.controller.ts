import {
  Controller,
  Get,
  Param,
  Delete,
  Body,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Create user',
    description:
      'If you want to create a new user, use this route. It takes a request body',
  })
  @ApiCreatedResponse({ description: 'user created', type: CreateUserDto })
  @ApiNotFoundResponse({ description: 'users not found', type: ResponseError })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to create user',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to create user',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'user structure',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Get all users',
    description:
      'If you want to get all the users, use this route. It takes no path or query params',
  })
  @ApiNoContentResponse({
    description: 'no content response',
    type: ResponseError,
  })
  @ApiNotFoundResponse({ description: 'users not found', type: ResponseError })
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
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: 'Find one user by id',
    description:
      'If you want to find a user by id, use this route. It takes query params user id',
  })
  @ApiNoContentResponse({
    description: 'no content response',
    type: ResponseError,
  })
  @ApiNotFoundResponse({ description: 'user not found', type: ResponseError })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to find user',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to find user',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @ApiOperation({
    summary: 'Update user',
    description: 'If you want to update the users, use this route',
  })
  @ApiOkResponse({ description: 'user updated', type: UpdateUserDto })
  @ApiNotFoundResponse({ description: 'user not found', type: ResponseError })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to update user',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to update user',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({
    type: UpdateUserDto,
    description: 'user structure',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Delete user',
    description:
      'If you want to delete the user, use this route with param is user id',
  })
  @ApiOkResponse({ description: 'user deleted', type: SuccessResponse })
  @ApiNotFoundResponse({ description: 'user not found', type: ResponseError })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to delete user',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to delete user',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.userService.delete(id);
    return new SuccessResponse('ok');
  }
}
