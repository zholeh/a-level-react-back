import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnprocessableEntityResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Product } from 'src/common/interfaces/product';
import { ProductService } from 'src/services/product.service';
import { ErrorType } from '../models/error.model';
import { ProductFilter } from './models/filter';
import { ProductModel } from './models/model';
import { PartialUpdateProduct } from './models/partial';
import { ProductSort } from './models/sort';
import { ProductWhere } from './models/where';

@Controller('product')
@ApiExtraModels(ProductWhere)
@ApiExtraModels(ProductSort)
@ApiTags('Product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get('/:id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ type: ProductModel })
  @ApiNotFoundResponse({
    description: 'Not found entity error',
    type: ErrorType,
  })
  findOne(@Param('id') id: string): Promise<Product | undefined> {
    return this.service.findOne(id);
  }

  @Get('')
  @ApiQuery({
    name: 'where',
    required: false,
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(ProductWhere) },
      },
    },
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(ProductSort) },
      },
    },
  })
  findAll(@Query() params: ProductFilter): Promise<Product[]> {
    const where = params.where ? JSON.parse(params.where) : undefined;
    const sort = params.sort ? JSON.parse(params.sort) : undefined;
    return this.service.findAll(where, sort);
  }

  @Post('')
  @ApiCreatedResponse({ type: ProductModel })
  @ApiUnprocessableEntityResponse({
    type: ErrorType,
  })
  async create(@Body() input: ProductModel): Promise<ProductModel> {
    return this.service.create(input);
  }

  @Put('')
  @ApiOkResponse({ type: ProductModel })
  @ApiUnprocessableEntityResponse({
    type: ErrorType,
  })
  async update(@Body() input: ProductModel): Promise<ProductModel> {
    return this.service.update({ ...input });
  }

  @Patch('')
  @ApiOkResponse({ type: ProductModel })
  @ApiUnprocessableEntityResponse({
    type: ErrorType,
  })
  async partialUpdate(
    @Body() input: PartialUpdateProduct,
  ): Promise<ProductModel> {
    return this.service.partialUpdate({ ...input });
  }

  @Delete(':id')
  @ApiOkResponse({ type: Boolean })
  @ApiUnprocessableEntityResponse({
    type: ErrorType,
  })
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.service.delete(id);
  }
}
