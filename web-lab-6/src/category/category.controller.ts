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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
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
@ApiTags('category')
@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    summary: 'Create a category',
    description:
      'If you want to create a new category, use this route. It takes a request body',
  })
  @ApiCreatedResponse({ description: 'category created' })
  @ApiNotFoundResponse({ description: 'category not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({
    description: 'not authorized to create category',
  })
  @ApiForbiddenResponse({ description: 'forbidden to create category' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @ApiBody({
    type: CreateCategoryDto,
    description: 'category structure',
  })
  @ApiBearerAuth()
  @UseGuards(new AuthGuard(), RoleGuard)
  @Roles(Role.admin)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({
    summary: 'Get all categories',
    description:
      'If you want to get all the categories, use this route. It takes no path or query params',
  })
  @ApiNoContentResponse({ description: 'no content response' })
  @ApiNotFoundResponse({ description: 'categories not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({
    description: 'not authorized to find all categories',
  })
  @ApiForbiddenResponse({ description: 'forbidden to find all categories' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({
    summary: 'Find one category by id',
    description:
      'If you want to find a category by id, use this route. It takes query params category id',
  })
  @ApiNoContentResponse({ description: 'no content' })
  @ApiNotFoundResponse({ description: 'category not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'not authorized to find category' })
  @ApiForbiddenResponse({ description: 'forbidden to find category' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update category',
    description: 'If you want to update the categories, use this route',
  })
  @ApiOkResponse({ description: 'category updated' })
  @ApiNotFoundResponse({ description: 'category not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({
    description: 'not authorized to update category',
  })
  @ApiForbiddenResponse({ description: 'forbidden to update category' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({
    type: UpdateCategoryDto,
    description: 'category structure',
  })
  @ApiBearerAuth()
  @UseGuards(new AuthGuard(), RoleGuard)
  @Roles(Role.admin)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @ApiOperation({
    summary: 'Delete category',
    description:
      'If you want to delete the category, use this route with param is category id',
  })
  @ApiOkResponse({ description: 'category deleted' })
  @ApiNotFoundResponse({ description: 'category not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({
    description: 'not authorized to delete category',
  })
  @ApiForbiddenResponse({ description: 'forbidden to delete category' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBearerAuth()
  @UseGuards(new AuthGuard(), RoleGuard)
  @Roles(Role.admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
