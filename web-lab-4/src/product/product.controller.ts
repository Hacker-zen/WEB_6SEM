import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
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
import { ResponseError } from 'src/extra/error-response';
import { SuccessResponse } from 'src/extra/success-response';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({
    summary: 'Create product',
    description:
      'If you want to create a new product, use this route. It takes a request body',
  })
  @ApiCreatedResponse({
    description: 'product created',
    type: CreateProductDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'Not authorized to create product',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden to create product',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'Not implemented feature',
    type: ResponseError,
  })
  @ApiBody({
    type: CreateProductDto,
    description: 'product structure',
  })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({
    summary: 'Get all products',
    description:
      'If you want to get all the products, use this route. It takes no path or query params',
  })
  @ApiNoContentResponse({
    description: 'No content response',
    type: ResponseError,
  })
  @ApiNotFoundResponse({
    description: 'Products not found',
    type: ResponseError,
  })
  @ApiBadRequestResponse({ description: 'Bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'Not authorized to find all products',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden to find all products',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'Not implemented feature',
    type: ResponseError,
  })
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @ApiOperation({
    summary: 'Find one product by id',
    description:
      'If you want to find a product by id, use this route. It takes query params product id',
  })
  @ApiNoContentResponse({
    description: 'No content response',
    type: ResponseError,
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    type: ResponseError,
  })
  @ApiBadRequestResponse({ description: 'Bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'Not authorized to find product',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden to find product',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'Not implemented feature',
    type: ResponseError,
  })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update product',
    description:
      'If you want to update the product, use this route with product id',
  })
  @ApiOkResponse({ description: 'product updated', type: ResponseError })
  @ApiNotFoundResponse({
    description: 'product not found',
    type: ResponseError,
  })
  @ApiBadRequestResponse({ description: 'Bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'Not authorized to update product',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden to update product',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'Not implemented feature',
    type: ResponseError,
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({
    type: UpdateProductDto,
    description: 'product structure',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @ApiOperation({
    summary: 'Delete a product',
    description:
      'If you want to delete the product, use this route with product id',
  })
  @ApiOkResponse({ description: 'product deleted', type: SuccessResponse })
  @ApiNotFoundResponse({
    description: 'product not found',
    type: ResponseError,
  })
  @ApiBadRequestResponse({ description: 'bad request', type: ResponseError })
  @ApiUnauthorizedResponse({
    description: 'not authorized to delete product',
    type: ResponseError,
  })
  @ApiForbiddenResponse({
    description: 'forbidden to delete product',
    type: ResponseError,
  })
  @ApiNotImplementedResponse({
    description: 'not implemented feature',
    type: ResponseError,
  })
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.productService.remove(+id);
    return new SuccessResponse('ok');
  }
}
