import {
  Args,
  Field,
  ID,
  Mutation,
  ObjectType,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CategoryService } from 'src/services/category.service';
import { CategoryInput } from './models/category.input';
import { CategoryModel } from './models/category.model';
import { PartialUpdateCategoryInput } from './models/partialUpdate-category.input';
import { CategorySort } from './models/sort';
import { CategoryWhere } from './models/where';

@ObjectType()
export class CategoryQuery {
  @Field(() => [CategoryModel], { nullable: true })
  readonly findAll!: CategoryModel[];
  @Field(() => CategoryModel, { nullable: true })
  readonly findOne!: CategoryModel;
}

@Resolver(CategoryQuery)
export class CategoryQueryResolver {
  constructor(private readonly service: CategoryService) {}

  @Query(() => CategoryQuery)
  category(): boolean {
    return true;
  }

  @ResolveField(() => [CategoryModel])
  async findAll(
    @Args('where', { nullable: true }) where?: CategoryWhere,
    @Args('sort', { nullable: true }) sort?: CategorySort,
  ): Promise<CategoryModel[]> {
    return this.service.findAll(where, sort);
  }

  @ResolveField(() => CategoryModel)
  async findOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<CategoryModel> {
    return this.service.findOne(id);
  }
}

@ObjectType()
export class CategoryMutation {
  @Field(() => CategoryModel, { nullable: true })
  readonly create!: CategoryModel;

  @Field({ nullable: true })
  readonly update!: CategoryModel;

  @Field({ nullable: true })
  readonly delete!: boolean;
}

@Resolver(CategoryMutation)
export class CategoryMutationResolver {
  constructor(private readonly service: CategoryService) {}

  @Mutation(() => CategoryMutation)
  category(): boolean {
    return true;
  }

  @ResolveField(() => CategoryModel)
  async create(@Args('input') input: CategoryInput): Promise<CategoryModel> {
    return this.service.create(input);
  }

  @ResolveField(() => CategoryModel)
  async update(@Args('input') input: CategoryInput): Promise<CategoryModel> {
    return this.service.update(input);
  }

  @ResolveField(() => CategoryModel)
  async partialUpdate(
    @Args('input') input: PartialUpdateCategoryInput,
  ): Promise<CategoryModel> {
    return this.service.partialUpdate(input);
  }

  @ResolveField(() => Boolean)
  async delete(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.service.delete(id);
  }
}
