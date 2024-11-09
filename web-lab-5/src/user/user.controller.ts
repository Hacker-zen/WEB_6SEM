import {
  Controller,
  Get,
  Param,
  Delete,
  Body,
  Patch,
  Post,
  Query,
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
import { PageOptionsDto } from 'src/pagnition/page-option.dto';

@ApiTags('user')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Create user',
    description:
      'If you want to create a new user, use this route. It takes a request body',
  })
  @ApiCreatedResponse({ description: 'user created' })
  @ApiNotFoundResponse({ description: 'users not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'not authorized to create user' })
  @ApiForbiddenResponse({ description: 'forbidden to create user' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
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
  @ApiNoContentResponse({ description: 'no content response' })
  @ApiNotFoundResponse({ description: 'users not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'not authorized to find' })
  @ApiForbiddenResponse({ description: 'forbidden to find' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.userService.findAll(pageOptionsDto);
  }

  @ApiOperation({
    summary: 'Find one user by id',
    description:
      'If you want to find a user by id, use this route. It takes query params user id',
  })
  @ApiNoContentResponse({ description: 'no content response' })
  @ApiNotFoundResponse({ description: 'user not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'not authorized to find user' })
  @ApiForbiddenResponse({ description: 'forbidden to find user' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @ApiOperation({
    summary: 'Update user',
    description: 'If you want to update the users, use this route',
  })
  @ApiOkResponse({ description: 'user updated' })
  @ApiNotFoundResponse({ description: 'user not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'not authorized to update user' })
  @ApiForbiddenResponse({ description: 'forbidden to update user' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
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
  @ApiOkResponse({ description: 'user deleted' })
  @ApiNotFoundResponse({ description: 'user not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'not authorized to delete user' })
  @ApiForbiddenResponse({ description: 'forbidden to delete user' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
