import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
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

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    summary: 'Create a category',
    description:
      'If you want to create a new category, use this route. It takes a request body',
  })
  @ApiCreatedResponse({
    description: 'category created',
    type: CreateCategoryDto,
  })
  @ApiNotFoundResponse({
    description: 'category not found',
    type: ResponseError,
  })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to create category',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to create category',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
  @ApiBody({
    type: CreateCategoryDto,
    description: 'category structure',
  })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({
    summary: 'Get all categories',
    description:
      'If you want to get all the categories, use this route. It takes no path or query params',
  })
  @ApiNoContentResponse({
    description: 'no content response',
    type: ResponseError,
  })
  @ApiNotFoundResponse({
    description: 'categories not found',
    type: ResponseError,
  })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to find all categories',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to find all categories',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({
    summary: 'Find one category by id',
    description:
      'If you want to find a category by id, use this route. It takes query params category id',
  })
  @ApiNoContentResponse({ description: 'no content', type: ResponseError })
  @ApiNotFoundResponse({
    description: 'category not found',
    type: ResponseError,
  })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to find category',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to find category',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update category',
    description: 'If you want to update the categories, use this route',
  })
  @ApiOkResponse({ description: 'category updated', type: UpdateCategoryDto })
  @ApiNotFoundResponse({
    description: 'category not found',
    type: ResponseError,
  })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to update category',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to update category',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({
    type: UpdateCategoryDto,
    description: 'category structure',
  })
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
  @ApiOkResponse({ description: 'category deleted', type: ResponseError })
  @ApiNotFoundResponse({
    description: 'category not found',
    type: ResponseError,
  })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to delete category',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to delete category',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: SuccessResponse,
  })
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.categoryService.remove(id);
    return new SuccessResponse('ok');
  }
}
