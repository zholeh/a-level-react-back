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
import { Category } from 'src/common/interfaces/category';
import { CategoryService } from '../../services/category.service';
import { ErrorType } from '../models/error.model';
import { CategoryFilter } from './models/filter';
import { CategoryModel } from './models/model';
import { PartialUpdateCategory } from './models/partial';
import { CategorySort } from './models/sort';
import { CategoryWhere } from './models/where';

@Controller('category')
@ApiExtraModels(CategoryWhere)
@ApiExtraModels(CategorySort)
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get('/:id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ type: CategoryModel })
  @ApiNotFoundResponse({
    description: 'Not found entity error',
    type: ErrorType,
  })
  findOne(@Param('id') id: string): Promise<Category | undefined> {
    return this.service.findOne(id);
  }

  @Get('')
  @ApiQuery({
    name: 'where',
    required: false,
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(CategoryWhere) },
      },
    },
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(CategorySort) },
      },
    },
  })
  findAll(@Query() params: CategoryFilter): Promise<Category[]> {
    const where = params.where ? JSON.parse(params.where) : undefined;
    const sort = params.sort ? JSON.parse(params.sort) : undefined;
    return this.service.findAll(where, sort);
  }

  @Post('')
  @ApiCreatedResponse({ type: CategoryModel })
  @ApiUnprocessableEntityResponse({
    type: ErrorType,
  })
  async create(@Body() input: CategoryModel): Promise<CategoryModel> {
    return this.service.create(input);
  }

  @Put('')
  @ApiOkResponse({ type: CategoryModel })
  @ApiUnprocessableEntityResponse({
    type: ErrorType,
  })
  async update(@Body() input: CategoryModel): Promise<CategoryModel> {
    return this.service.update({ ...input });
  }

  @Patch('')
  @ApiOkResponse({ type: CategoryModel })
  @ApiUnprocessableEntityResponse({
    type: ErrorType,
  })
  async partialUpdate(
    @Body() input: PartialUpdateCategory,
  ): Promise<CategoryModel> {
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
