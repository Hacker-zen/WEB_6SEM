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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
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

@ApiTags('product')
@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({
    summary: 'Create product',
    description:
      'If you want to create a new product, use this route. It takes a request body',
  })
  @ApiCreatedResponse({ description: 'product created' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to create product' })
  @ApiForbiddenResponse({ description: 'Forbidden to create product' })
  @ApiNotImplementedResponse({ description: 'Not implemented feature' })
  @ApiBody({
    type: CreateProductDto,
    description: 'product structure',
  })
  @ApiBearerAuth()
  @UseGuards(new AuthGuard(), RoleGuard)
  @Roles(Role.admin)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({
    summary: 'Get all products',
    description:
      'If you want to get all the products, use this route. It takes no path or query params',
  })
  @ApiNoContentResponse({ description: 'No content response' })
  @ApiNotFoundResponse({ description: 'Products not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({
    description: 'Not authorized to find all products',
  })
  @ApiForbiddenResponse({ description: 'Forbidden to find all products' })
  @ApiNotImplementedResponse({ description: 'Not implemented feature' })
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @ApiOperation({
    summary: 'Find one product by id',
    description:
      'If you want to find a product by id, use this route. It takes query params product id',
  })
  @ApiNoContentResponse({ description: 'No content response' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to find product' })
  @ApiForbiddenResponse({ description: 'Forbidden to find product' })
  @ApiNotImplementedResponse({ description: 'Not implemented feature' })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update product',
    description:
      'If you want to update the product, use this route with product id',
  })
  @ApiOkResponse({ description: 'product updated' })
  @ApiNotFoundResponse({ description: 'product not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to update product' })
  @ApiForbiddenResponse({ description: 'Forbidden to update product' })
  @ApiNotImplementedResponse({ description: 'Not implemented feature' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({
    type: UpdateProductDto,
    description: 'product structure',
  })
  @ApiBearerAuth()
  @UseGuards(new AuthGuard(), RoleGuard)
  @Roles(Role.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @ApiOperation({
    summary: 'Delete a product',
    description:
      'If you want to delete the product, use this route with product id',
  })
  @ApiOkResponse({ description: 'product deleted' })
  @ApiNotFoundResponse({ description: 'product not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'not authorized to delete product' })
  @ApiForbiddenResponse({ description: 'forbidden to delete product' })
  @ApiNotImplementedResponse({ description: 'not implemented feature' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBearerAuth()
  @UseGuards(new AuthGuard(), RoleGuard)
  @Roles(Role.admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
